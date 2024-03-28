const Chats = require("../models/chatSchema");

module.exports = {
  postchat: async (message, receiver, sender) => {
    const chat = new Chats({
      message,
      receiver,
      sender,
    });
    await chat.save();
  },
};
