const User = require("../models/User");
const bcrypt = require("bcryptjs");
const createError = require("../utilitis/error");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  const maxAge = 3 * 24 * 60 * 60
  try {
    // check if user exist
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "Username is not registered"));
    }
    // if theres a user, compare password entered passowrd with user password
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(createError(404, "username or password is incorrect"));
    }

    // if password is correct, we create a jwt token with the user id and isAdmin. W e will use this to identify the user on protected routes

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWTSECRET
    );

    // Destructure data in user and keep sensitive ones in the server
    const { password, isAdmin, ...otherDetails } = user._doc;

    // store token as a cookie('cookie-name', token). cookie-parser is installed and used in app.js
    res
      .cookie("access_token", token, { httpOnly: true, maxAge: maxAge * 60 })
      .status(200)
      .json({...otherDetails});
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw Error("All fields must be field");
    }

    if (!validator.isEmail(email)) {
      // throw Error('Email is not valid')
      return next(createError(503, "email is not valid"));
    }

    if (!validator.isStrongPassword(password)) {
      // throw Error('password is not strong enough')
      return next(createError(503, "password is not strong enough"));
    }

    const isUserNameExisting = await User.findOne({ username: username });
    if (isUserNameExisting) {
      // throw Error('Username is already in use')
      return next(createError(503, "username already in use"));
    }

    const isEmailExisting = await User.findOne({ email: email });
    if (isEmailExisting) {
      // throw Error('email is already in use')
      return next(createError(503, "email already in use"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      email: email,
      password: hash,
    });

    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register,
};

// using the default "throw Error()" -- stops the exexution of the code and throws the error to the catch block. No return keyword is needed. Status code is not passed into the throw Error(). Only the error message is needed. The default status code in the error middleware in app.js is used.

// using the customised "createError" function, the return keyword is used to stop the futher execution of the code the moment the error is created

// jwt token has three parts: header, payload and signature(uses a secret).The header is just the hashing algorithm. The payload should contain non-sensitive data about the user. The server uses the secret known to it only to hash/sign the header and the payload to form the token.
