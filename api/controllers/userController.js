const User = require("../models/User")
const mongoose = require("mongoose")
const createError = require("../utilitis/error")

// get all users
const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers)
  } catch (err) {
    next(err)
  }
};

// get single user
const getSingleUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json("user does not exist")
    }

    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json("user not found")
    }
    res.status(200).json(user)
  } catch (err) {
    next(err);
  }
};

// update a user
const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json("user does not exist")
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedUser) {
        return res.status(404).json("user does not exist")
      }

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// delete user
const deleteUser = async(req, res, next) => {
  try{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json("user does not exist")
    }

    const deletedUser = await User.findByIdAndDelete(id)
    if (!deletedUser) {
        return res.status(404).json("user not found")
      }

      res.status(200).json(deletedUser)
  }
  catch(err){
    next(err)
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
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
