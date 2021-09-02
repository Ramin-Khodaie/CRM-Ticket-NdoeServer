const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restPinSchema = new Schema({
  pin: {
    type: String,
    maxlength: 6,
    minlength: 6,
  },
  email: {
    type: String,
    maxlength: 50,
    required: true,
  },
});

module.exports = {
  restPinSchema: mongoose.model("Reset-Pin", restPinSchema),
};
