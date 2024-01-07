const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    state: {
      type: String,
      required: true,
    },

    lga: {
      type: String,
      required: true,
    },

    schoolOwner: {
      type: String,
      required: true,
    },

    hearAboutUs: {
      type: String,
      required: true,
    },

    agreedToTerms: {
      type: String,
      default: "I Agree",
    },

    schools: {
      type: [String],
    },

    favoriteSchools: {
      type: [String],
    },
  },
  {
    collation: { locale: "en", strength: 2 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
