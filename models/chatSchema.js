const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  sender: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timeDisplay: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const chating = mongoose.model("chat", chatSchema);

module.exports = chating;
