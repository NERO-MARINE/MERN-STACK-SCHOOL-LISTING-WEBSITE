const School = require("../models/School");
const User = require("../models/User");
const mongoose = require("mongoose");
const createError = require("../utilitis/error");

// get all schools
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

// search all schools
const searchAllSchools = async (req, res, next) => {
  const { featured, state, lga, category } = req.query;
  try {
    const allSchools = await School.find({
      featured: featured,
      state: state,
      lga: lga,
      category: category,
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
    const school = new School(req.body);
    const savedSchool = await school.save();
    try {
      // push school id into schools array of the user
      await User.findByIdAndUpdate(userId, {
        $push: { schools: savedSchool._id },
      });
    } catch (err) {
      next(err);
    }

    res.status(200).json(savedSchool);
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
      return next(createError(404, "Your listed schools will appear here. You have not listed any school!"));
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
      // pull room id from rooms array of the hotel when room is deleted
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

module.exports = {
  getAllSchools,
  createSchool,
  getSingleSchool,
  deleteSchool,
  updateSchool,
  searchAllSchools,
  countByState,
  UserSchools,
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
