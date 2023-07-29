const messageController = require("../controller/message.controller");
const messageValidation = require("../validation/message.validation");
const UserValidation = require("../validation/user.validation");

module.exports = (app) => {
  console.log("called");
  app.post(
    "/chatApp/api/v1/messages",
    [UserValidation.validateJwt, messageValidation.validateCreateMessage],
    messageController.createMessage
  );
  app.get(
    "/chatApp/api/v1/messages/:chatId",
    [UserValidation.validateJwt, messageValidation.validateFetchAllChat],
    messageController.fetchAllMessage
  );
};
