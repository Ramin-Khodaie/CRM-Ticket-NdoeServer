const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  subject: {
    type: String,
    maxlength: 250,
    required: true,
    default: "",
  },
  status: {
    type: String,
    maxlength: 100,
    required: true,
    default: "Pending operator response",
  },
  openAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  conversation: [
    {
      sender: {
        type: String,
        maxlength: 100,
        required: true,
        default: "",
      },
      message: {
        type: String,
        maxlength: 200,
      },
      msgAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

module.exports = {
  ticketSchema: mongoose.model("ticket", ticketSchema),
};
