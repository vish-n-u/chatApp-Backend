const Chat = require("../model/chat.model");

exports.validateCreateMessage = async (req, res, next) => {
  if (!req.body.chatId || !req.body.content) {
    return res.status(404).send({ message: "Invalid input" });
  }
  try {
    const chat = await Chat.findOne({ _id: req.body.chatId });
    req.chat = chat;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.validateFetchAllChat = async (req, res, next) => {
  // console.log(req.params.chatId, req.params);
  if (!req.params.chatId) {
    return res.status(404).send({ message: "Invalid ChatId" });
  }
  try {
    const chat = await Chat.findOne({ _id: req.params.chatId });
    if (!chat) return res.status(404).send({ message: "Invalid ChatId" });
    else {
      req.chat = chat;
      next();
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
