const School = require("../models/School");
const User = require("../models/User");
const mongoose = require("mongoose");
const createError = require("../utilitis/error");
const multer = require('multer');
const nodemailer = require('nodemailer');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set your upload folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
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
      return next(createError(404, "No school Found!"));
    }

    res.status(200).json(allSchools);
  } catch (err) {
    next(err);
  }
};

// create a school
const createSchool = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    if (!req.files || req.files.length === 0) {
      return next(createError(404, "No files Selected."));
    }

    if (req.files.length < 6 || req.files.length > 6) {
      return next(createError(404, "Select 6 quality images of your school "));
    }

    const user = await User.findById(userId);
    const school = new School(req.body);
    const savedSchool = await school.save();

     // Upload and associate multiple images with the school
     const fileNames = [];

     if (req.files && req.files.length > 0) {
       // Handle multiple uploaded images
       for (const file of req.files) {
         // Save the file name to the array
         fileNames.push(file.originalname);
       }
     }
 
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
    //  sending email after school listing application

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
      to: user.email,
      subject: `School listing application`,
      text: `Hello ${user.username}`,
      html: `<p style="color: white; background:green; padding: 10px; line-height: 2.0;">Your school  ${savedSchool.name} listing application has been received and it is under review. We will send you the feedback of the review shortly.</p> <a href="#">check your dashboard to see status of your school listing</a>`,
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
    const listOfUsersSchool = await Promise.all(
      user.schools.map((school) => {
        return School.findById(school);
      })
    );

    if (listOfUsersSchool.length == "") {
      return next(
        createError(
          404,
          "Your listed schools will appear here. You have not listed any school!"
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

    // Check if the favorite school already exists
    const user = await User.findById(userId);

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

    // Check if the schoolId exists in the user's favoriteSchools array
    if (!user.favoriteSchools.includes(schoolId)) {
      return next(createError(404, "School not found in favorites!"));
    }

    // Remove the schoolId from the user's favoriteSchools array. Return only the ids that do not match the toBeDeleted schoolId
    user.favoriteSchools = user.favoriteSchools.filter(id => id.toString() !== schoolId);
    
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

    res.status(200).json(user.favoriteSchools);
  } catch (err) {
    next(err);
  }
}

// Get user's actual favorite schools
const getFavoriteSchools = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId); 
    const listOfFavSchools = await Promise.all(
      user.favoriteSchools.map((school) => {
        return School.findById(school);
      })
    );

    if(listOfFavSchools.length < 1){
      return next(createError(409, "You have not added any school to your favorite list!"));
    }

    res.status(200).json(listOfFavSchools);
 
  } catch (err) {
    next(err);
  }
}

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
  getFavoriteSchools
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
