const User = require("../models/User");
const bcrypt = require("bcryptjs");
const createError = require("../utilitis/error");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const login = async (req, res, next) => {
  const maxAge = 3 * 24 * 60 * 60;
  try {
    // check if user exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(404, "email is not registered"));
    }
    // if theres a user, compare password entered passowrd with user password
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(createError(404, "email or password is incorrect"));
    }

    // if password is correct, we create a jwt token with the user id and isAdmin. We will use this to identify the user on protected routes

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
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, password, state, lga, schoolOwner, hearAboutUs } = req.body;
    if (!username || !email || !password || !state || !lga || !schoolOwner || !hearAboutUs) {
      throw Error("All fields must be field");
    }
   
    if (!validator.isEmail(email)) {
      // throw Error('Email is not valid')
      return next(createError(503, "email is not valid"));
    }

    // if (!validator.isStrongPassword(password)) {
    //   // throw Error('password is not strong enough')
    //   return next(createError(503, "password is not strong enough!(example: 123Abc@#aed3)"));
    // }

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
      state: state,
      lga: lga,
      schoolOwner: schoolOwner,
      hearAboutUs: hearAboutUs,
      password: hash,
    });

    await newUser.save();
    res.status(200).json(newUser);

    //  sending email after sign up

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
      to: req.body.email,
      subject: `NSS Welcomes You`,
      text: `Dear ${req.body.username}`,
      html: `<div style="background-color: rgb(238, 237, 237); padding: 20px; border-radius: 15px; text-align: left;">

      <p style="color: black; background: white; padding: 15px; line-height: 1.8; border-radius: 10px; font-family: 'Arial', sans-serif;">
          Welcome to Naija School Search! We are delighted to have you as a part of our school listing community. Your registration marks the beginning of an exciting journey to discover and connect with the best educational institutions in your area.
      </p>
  
      <h4 style="margin-top: 20px; padding: 10px; color: black; background: white; border-radius: 10px; font-family: 'Arial', sans-serif;">
          Here's what you can do at NSS:
      </h4>
  
      <ul style="margin: 20px 0; padding-left: 20px; font-family: 'Arial', sans-serif;">
          <li style="margin: 10px 0; font-size: 18px;">Apply for your school to be listed if you are a school owner</li>
          <li style="margin: 10px 0; font-size: 18px;">Explore a wide range of schools, from daycare to secondary, including skills acquisition centers.</li>
          <li style="margin: 10px 0; font-size: 18px;">Find detailed information about each school, including location, facilities, and more.</li>
      </ul>
  
      <h3 style="margin-top: 20px; color: black; background: white; padding: 15px; line-height: 1.8; border-radius: 10px; font-family: 'Arial', sans-serif;">
          If you have any questions, need assistance, or want to provide feedback, feel free to reach out to our support team via the contact information provided on the website. We're here to help you every step of the way.
      </h3>
  
      <br/> 
      <b>Best Regards,</b>  
      <br/>
      <b style="color: green; font-family: 'Arial', sans-serif;">Naija School Search</b>
  </div>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        res.send("error");
      } else {
        console.log(info.response);
      }
    });
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
