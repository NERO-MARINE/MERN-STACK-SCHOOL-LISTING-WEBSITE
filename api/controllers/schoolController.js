const School = require("../models/School");
const User = require("../models/User");
const mongoose = require("mongoose");
const createError = require("../utilitis/error");
const multer = require("multer");
const nodemailer = require("nodemailer");
const axios = require("axios");

// for recaptcha verification
const recaptchaVerification = async (recaptchaValue) => {
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
  const recaptchaVerificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaValue}`;

  try {
    const recaptchaResponse = await axios.post(recaptchaVerificationURL);
    return recaptchaResponse.data.success;
  } catch (error) {
    console.error("reCAPTCHA verification failed:", error.message);
    return false;
  }
};

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set your upload folder
  },
  // filename: function (req, file, cb) {
  //   cb(null, file.originalname);
  // },

  // I want unique names for my files to aviod conflict
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// get all  schools
const schools = async (req, res, next) => {
  try {
    const allSchools = await School.find({});
    res.status(200).json(allSchools);
  } catch (err) {
    next(err);
  }
};

// get all featured schools
const getAllSchools = async (req, res, next) => {
  const { featured } = req.query;
  try {
    const allSchools = await School.find({
      featured: featured,
    });

    if (!allSchools) {
      return res.status(404).json("No featured schools");
    }
    res.status(200).json(allSchools);
  } catch (err) {
    next(err);
  }
};

// get all approved schools
const getApprovedSchools = async (req, res, next) => {
  const { approved } = req.query;
  try {
    const allSchools = await School.find({
      approved: approved,
    });
    res.status(200).json(allSchools);
  } catch (err) {
    next(err);
  }
};

// search all schools
const searchAllSchools = async (req, res, next) => {
  const { featured, state, lga, category, approved } = req.query;
  try {
    const allSchools = await School.find({
      featured: featured,
      state: state,
      lga: lga,
      category: category,
      approved: approved,
    });

    if (allSchools.length == "") {
      return next(
        createError(404, "No school has been listed yet under these filters!")
      );
    }

    res.status(200).json(allSchools);
  } catch (err) {
    next(err);
  }
};

// create a school
// const createSchool = async (req, res, next) => {
//   const userId = req.params.userId;

//   try {
//     if (!req.files || req.files.length === 0) {
//       return next(createError(404, "No files Selected."));
//     }

//     if (req.files.length < 6 || req.files.length > 6) {
//       return next(createError(404, "Select 6 quality images of your school "));
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json("User not found");
//     }
//     const school = new School(req.body);
//     const savedSchool = await school.save();

//     // Upload and associate multiple images with the school
//     const fileNames = [];

//     if (req.files && req.files.length > 0) {
//       // Handle multiple uploaded images
//       for (const file of req.files) {
//         // Save the file name to the array
//         fileNames.push(file.originalname);
//       }
//     }

//     // Add the file names to the school document
//     savedSchool.images = fileNames;

//     // Save the updated school document with file names
//     await savedSchool.save();

//     try {
//       // push school id into schools array of the user
//       await User.findByIdAndUpdate(userId, {
//         $push: { schools: savedSchool._id },
//       });
//     } catch (err) {
//       next(err);
//     }

//     res.status(200).json(savedSchool);
//     //  sending email after school listing application

//     const transporter = nodemailer.createTransport({
//       host: "mail.codebadgertech.com",
//       port: 465, // use out going server smtp port
//       auth: {
//         user: "info@codebadgertech.com",
//         pass: "codebadger@590",
//       },
//     });

//     const mailOptions = {
//       from: "info@codebadgertech.com",
//       to: user.email,
//       subject: `School listing application`,
//       text: `Hello ${user.username}`,
//       html: `<div style="background-color: rgb(238, 237, 237); padding: 20px; border-radius: 15px; text-align: center;">

//       <p style="color: black; background: white; padding: 15px; line-height: 1.8; border-radius: 10px; font-family: 'Arial', sans-serif;">
//           Your application to list ${savedSchool.name} has been received and is under review.
//           We will send you feedback shortly.
//       </p>

//       <a href="#" style="color: black; text-decoration: none; font-weight: bold; display: block; margin-top: 15px;">
//           Check your dashboard to see the status of your school listing.
//       </a>

//       <p style="color: white; background: limegreen; padding: 12px; line-height: 1.5; border-radius: 10px; margin-top: 20px; font-family: 'Arial', sans-serif;">
//           Best, <br>
//           Naija School Search
//       </p>
//   </div>`,
//     };

//     transporter.sendMail(mailOptions, (err, info) => {
//       if (err) {
//         console.log(err);
//         // res.send("error");
//       } else {
//         console.log(info.response);
//       }
//     });
//   } catch (err) {
//     next(err);
//   }
// };
// create a school
const createSchool = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    if (!req.files || req.files.length === 0) {
      return next(createError(404, "No files Selected."));
    }

    if (req.files.length !== 6) {
      return next(
        createError(404, "Select exactly 6 quality images of your school.")
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("User not found");
    }

    const school = new School(req.body);
    const savedSchool = await school.save();

    // Upload and associate multiple images with the school
    const fileNames = req.files.map((file) => file.filename);

    // Add the file names to the school document
    savedSchool.images = fileNames;

    // Save the updated school document with file names
    await savedSchool.save();

    try {
      // push school id into schools array of the user
      await User.findByIdAndUpdate(userId, {
        $push: { schools: savedSchool._id },
      });
    } catch (err) {
      next(err);
    }

    res.status(200).json(savedSchool);

    // Sending email after school listing application
    const transporter = nodemailer.createTransport({
      host: "mail.codebadgertech.com",
      port: 465, // use outgoing server smtp port
      auth: {
        user: "info@codebadgertech.com",
        pass: "codebadger@590",
      },
    });

    const mailOptions = {
      from: "info@codebadgertech.com",
      to: user.email,
      subject: `School listing application`,
      text: `Hello ${user.username}`,
      html: `<div style="background-color: rgb(238, 237, 237); padding: 20px; border-radius: 15px; text-align: center;">
      <p style="color: black; background: white; padding: 15px; line-height: 1.8; border-radius: 10px; font-family: 'Arial', sans-serif;">
          Your application to list ${savedSchool.name} has been received and is under review.
          We will send you feedback shortly.
      </p>
  
      <a href="#" style="color: black; text-decoration: none; font-weight: bold; display: block; margin-top: 15px;">
          Check your dashboard to see the status of your school listing.
      </a>
  
      <p style="color: white; background: limegreen; padding: 12px; line-height: 1.5; border-radius: 10px; margin-top: 20px; font-family: 'Arial', sans-serif;">
          Best, <br>
          Naija School Search
      </p>
  </div>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        // res.send("error");
      } else {
        console.log(info.response);
      }
    });
  } catch (err) {
    next(err);
  }
};

// get schools listed under users
const UserSchools = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const listOfUsersSchool = await Promise.all(
      user.schools.map((school) => {
        return School.findById(school);
      })
    );

    if (listOfUsersSchool.length == "") {
      return next(
        createError(
          404,
          "Your listed schools will appear here. You have not listed any school! If for example you have a Nusersy, primary and a secondary school, please list them seperately under the correct category."
        )
      );
    }

    res.status(200).json(listOfUsersSchool);
  } catch (err) {
    next(err);
  }
};

// get single school
const getSingleSchool = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json("school does not exist");
    }

    const school = await School.findById(id);

    if (!school) {
      return res.status(404).json("school not found");
    }
    res.status(200).json(school);
  } catch (err) {
    next(err);
  }
};

// update a school
const updateSchool = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json("school does not exist");
    }
    const updatedSchool = await School.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedSchool) {
      return res.status(404).json("school does not exist");
    }

    res.status(200).json(updatedSchool);
  } catch (err) {
    next(err);
  }
};

// delete a school
const deleteSchool = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json("school does not exist");
    }

    const deletedSchool = await School.findByIdAndDelete(id);
    if (!deletedSchool) {
      return res.status(404).json("school not found");
    }
    try {
      // pull school id from schoools array of the user when school is deleted
      await User.findByIdAndUpdate(userId, {
        $pull: { schools: id },
      });
    } catch (err) {
      next(err);
    }

    res.status(200).json(deletedSchool);
  } catch (err) {
    next(err);
  }
};

const countByState = async (req, res, next) => {
  const states = req.query.states.split(",");
  try {
    const list = await Promise.all(
      states.map((state) => {
        return School.countDocuments({ state: state });
      })
    );

    // console.log(list) -- returns an arrray of the count
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// get all schools
const countTotalSchools = async (req, res, next) => {
  try {
    const allSchools = await School.find();

    if (allSchools.length == "") {
      return next(createError(404, "No school Found!"));
    }

    res.status(200).json(allSchools);
    // console.log(allSchools.length);
  } catch (err) {
    next(err);
  }
};

// Add a new favorite school
const addNewFavoriteSchool = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const schoolId = req.params.schoolId;
    // console.log(userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the schoolId already exists in the user's favoriteSchools array
    if (user.favoriteSchools.includes(schoolId)) {
      return next(createError(409, "School already exists in favorites!"));
    }

    user.favoriteSchools.push(schoolId);
    await user.save();

    res.status(201).json(user); // Use 201 for resource creation
    //  res.status(201).json('School added to favorites')
  } catch (err) {
    next(err);
  }
};

// Remove a favorite school
const removeFavoriteSchool = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const schoolId = req.params.schoolId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the schoolId exists in the user's favoriteSchools array
    if (!user.favoriteSchools.includes(schoolId)) {
      return next(createError(404, "School not found in favorites!"));
    }

    // Remove the schoolId from the user's favoriteSchools array. Return only the ids that do not match the toBeDeleted schoolId
    user.favoriteSchools = user.favoriteSchools.filter(
      (id) => id.toString() !== schoolId
    );

    await user.save();

    res.status(200).json(user.favoriteSchools);
  } catch (err) {
    next(err);
  }
};

// Get user's favorite school ids
const getUsersFavoriteSchools = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.favoriteSchools);
  } catch (err) {
    next(err);
  }
};

// Get user's actual favorite schools
const getFavoriteSchools = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const listOfFavSchools = await Promise.all(
      user.favoriteSchools.map(async (schoolId) => {
        try {
          const school = await School.findById(schoolId);

          // incase a favorited school was delete by the owner
          if (!school) {
            throw new Error(`School not found for ID: ${schoolId}`);
          }

          return school;
        } catch (error) {
          // console.error('Error:', error.message); // error is caught here
          return null;
        }
      })
    );

    // Filter out null values (schools not found) from the array
    const validListOfFavSchools = listOfFavSchools.filter(
      (school) => school !== null
    );

    if (validListOfFavSchools.length < 1) {
      return next(
        createError(409, "You have not added any school to your favorite list!")
      );
    }

    res.status(200).json(validListOfFavSchools);
  } catch (err) {
    next(err);
  }
};

// send message to a school from details page
const sendMsgToSchool = async (req, res, next) => {
  const schoolEmail = req.params.schoolEmail;
  const schoolName = req.params.schoolName;

  const { name, phone, message, recaptchaValue } = req.body;
  // console.log(schoolEmail, schoolName, name, phone, message);
  // Verify reCAPTCHA
  const isRecaptchaValid = await recaptchaVerification(recaptchaValue);
  if (!isRecaptchaValid) {
    return next(createError(503, "reCAPTCHA verification failed"));
  }

  const transporter = nodemailer.createTransport({
    host: "mail.codebadgertech.com",
    port: 465, // use out going server smtp port
    auth: {
      user: "info@codebadgertech.com",
      pass: "codebadger@590",
    },
  });

  const mailOptions = {
    from: "info@codebadgertech.com",
    to: schoolEmail,
    subject: `School listing application`,
    text: `Hello ${schoolName}, ${name} wants to make an enquiry!`,
    html: `<div style="background-color: rgb(238, 237, 237); padding: 20px;">
    <h2 style="color: black; background:white; padding: 15px; line-height: 2.0; border-radius: 10px;">Hello ${schoolName}, ${name} wants to make an enquiry!</h2>

    <p style="color: black; background:white; padding: 15px; line-height: 2.0; border-radius: 10px; margin-top: 15px;"><b>This is a message from ${name}:</b> ${message}. Please reach out to me on this number ${phone}</p>

    <p style="color: white; background:limegreen; padding: 10px; line-height: 1.5; border-radius: 10px; margin-top: 10px;">Reach out to ${name} with <b>${phone}</b>
    <br> Best, <br> Naija School Search.
    </p>
  </div>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      // res.send("error");
    } else {
      console.log(info.response);
    }
  });

  res.status(200).json("Message sent");
  try {
  } catch (err) {
    next(err);
  }
};

// random search with mongodb search function
const randomSearch = async (req, res, next) => {
  try {
    // let search = req.body.search;
    const searchParams = req.params.searchParams;
    // console.log(searchParams)
    let searchResults = await School.find({
      $text: {
        $search: searchParams,
        $diacriticSensitive: true,
      },
      approved: true,
    });

    if (searchResults.length === 0) {
      return next(
        createError(
          409,
          "Sorry! No matching results. Try using the filters on the search page."
        )
      );
    }

    res.status(200).json(searchResults);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllSchools,
  createSchool,
  getSingleSchool,
  deleteSchool,
  updateSchool,
  searchAllSchools,
  countByState,
  UserSchools,
  countTotalSchools,
  schools,
  getApprovedSchools,
  upload,
  addNewFavoriteSchool,
  getUsersFavoriteSchools,
  removeFavoriteSchool,
  getFavoriteSchools,
  sendMsgToSchool,
  randomSearch,
};

// illustration on how to use error handler middleware
// get all schools

// const getAllSchools = async (req, res, next) => {
//     try {

//       const blah = false
//       if(blah){
//           return res.status(200).json(hello + "all listed schools");
//       }

//       else{
//           return next(createError(400, 'Not gonna work'))
//       }

//     } catch (err) {
//       next(err)
//     }
//   };
