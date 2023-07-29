// createChat/accessChats
// create groupchat
// add users to group chat
// remove users from group chat
// get chats
// rename group chats

const UserValidation = require("../validation/user.validation");
const ChatController = require("../controller/chat.controller");
const ChatValidation = require("../validation/chat.validation");

module.exports = (app) => {
  app.post(
    "/chatApp/api/v1/chats",
    [UserValidation.validateJwt],
    ChatController.accessChat
  );
  app.get(
    "/chatApp/api/v1/chats",
    [UserValidation.validateJwt],
    ChatController.getAllChat
  );
  app.post(
    "/chatApp/api/v1/groupchats",
    [UserValidation.validateJwt],
    ChatController.createGroupChat
  );
  app.put(
    "/chatApp/api/v1/groupchats",
    [UserValidation.validateJwt],
    ChatController.updateGroupChatName
  );
  app.put(
    "/chatApp/api/v1/groupchats/removeuser",
    [UserValidation.validateJwt, ChatValidation.validateAddOrRemoveUser],
    ChatController.removeUser
  );
  app.put(
    "/chatApp/api/v1/groupchats/removemultipleuser",
    [UserValidation.validateJwt, ChatValidation.validateAddOrRemoveUser],
    ChatController.removeMultipleUser
  );
  app.put(
    "/chatApp/api/v1/groupchats/adduser",
    [UserValidation.validateJwt, ChatValidation.validateAddOrRemoveUser],
    ChatController.addUser
  );
};
