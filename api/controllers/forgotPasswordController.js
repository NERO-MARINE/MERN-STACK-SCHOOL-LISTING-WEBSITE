const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("../utilitis/error");
const nodemailer = require("nodemailer");

const secretKey = process.env.JWTSECRET;

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "mail.codebadgertech.com",
  port: 465, // use out going server smtp port
  auth: {
    user: "info@codebadgertech.com",
    pass: "codebadger@590",
  },
});

const resetRequest = async (req, res, next) => {
  try {
    const { email } = req.body;

    // check if email exist
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(createError(404, "Email address is not registered"));
    }

    // Generate a JWT token with the user's email
    const token = jwt.sign({ email }, secretKey, { expiresIn: "5m" });

    // Send a password reset email to the user
    const resetLink = `https://naijaschoolsearch.onrender.com/reset-password/${token}`;

    const mailOptions = {
      from: "info@codebadgertech.com",
      to: email,
      subject: "Password Reset Request",
      text: `To reset your password, click on the following link: ${resetLink}`,
      html: `<div style="background-color: rgb(238, 237, 237); padding: 20px;">
      <p style="color: black; background:white; padding: 15px; line-height: 2.0; border-radius: 10px;">You are receiving this email because you requested a password change. To reset your password, click on the following link: ${resetLink} . This link expires in just 5-munites</p>
      <br/><b style="color: green;">Naija School Search</b>
      </div>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message:
            "Failed to send reset email! This is unusal, Try again in few minutes",
        });
      } else {
        // console.log(info);
        res.json({ message: "Reset email sent successfully" });
      }
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// Route to reset the password
const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    // Verify the JWT token
    const decoded = jwt.verify(token, secretKey);

    if (!decoded) {
      return next(
        createError(
          404,
          "Invalid Reset Token. Please Request another rset link!"
        )
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findOne({ email: decoded.email });
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    // console.error(error);
    res.status(500).json({
      message: "Internal server error! Seems your reset link has expired",
    });
  }
};

module.exports = {
  resetRequest,
  resetPassword,
};
