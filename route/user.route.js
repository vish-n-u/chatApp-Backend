const UserController = require("../controller/user.controller");
const UserValidation = require("../validation/user.validation");

module.exports = (app) => {
  app.post(
    "/chatApp/api/v1/users/register",
    [UserValidation.registration],
    UserController.registration
  );
  app.post("/chatApp/api/v1/users/login", UserController.login);
  app.get(
    "/chatApp/api/v1/users",
    [UserValidation.validateJwt],
    UserController.getUser
  );
};
