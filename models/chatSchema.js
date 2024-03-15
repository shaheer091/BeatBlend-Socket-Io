const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  reciever: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  sender: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  chatdata: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const chating = mongoose.model("chat", chatSchema);

module.exports = chating;
