const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
  compony: {
    type: String,
    maxlength: 50,
    required: true,
  },
  address: {
    type: String,
    maxlength: 100,
  },
  phonenumber: {
    type: Number,
    maxlength: 11,
    required: true,
  },
  email: {
    type: String,
    maxlength: 50,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 100,
    required: true,
  },

  refreshToken: {
    token: {
      type: String,
      default: "",
      maxlength: 500,
    },
    createdDate: {
      type: Date,
      default: Date.now(),
      required: true,
    },
  },
});

module.exports = {
  userSchema: mongoose.model("User", userSchema),
};
