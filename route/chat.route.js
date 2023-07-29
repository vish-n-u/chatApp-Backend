// createChat/accessChats
// create groupchat
// add users to group chat
// remove users from group chat
// get chats
// rename group chats

import { validateJwtV } from "../validation/user.validation.js";
import {
  validateAddOrRemoveUserV,
  validateGroupChatIdV,
} from "../validation/chat.validation.js";
import {
  accessChatC,
  getAllChatC,
  createGroupChatC,
  updateGroupChatNameC,
  removeUserC,
  removeMultipleUserC,
  addUserC,
} from "../controller/chat.controller.js";

export default function chatRoute(app) {
  app.post("/chatApp/api/v1/chats", [validateJwtV], accessChatC);
  app.get("/chatApp/api/v1/chats", [validateJwtV], getAllChatC);
  app.post("/chatApp/api/v1/groupchats", [validateJwtV], createGroupChatC);
  app.put("/chatApp/api/v1/groupchats", [validateJwtV], updateGroupChatNameC);
  app.put(
    "/chatApp/api/v1/groupchats/removeuser",
    [validateJwtV, validateAddOrRemoveUserV],
    removeUserC
  );
  app.put(
    "/chatApp/api/v1/groupchats/removemultipleuser",
    [validateJwtV, validateAddOrRemoveUserV],
    removeMultipleUserC
  );
  app.put(
    "/chatApp/api/v1/groupchats/adduser",
    [validateJwtV, validateAddOrRemoveUserV],
    addUserC
  );
}
