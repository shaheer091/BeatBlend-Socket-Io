const Chats = require("../models/chatSchema");

module.exports = {
  postchat: async (message, reciever, sender) => {
    const chat = new Chats({
      chatdata: message,
      reciever,
      sender,
    });
    await chat.save();
  },
};
