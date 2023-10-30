const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
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

    schools: {
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
