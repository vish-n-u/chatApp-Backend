const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../config/jwt.config");

exports.registration = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) next();
  else {
    return res.status(400).send({ message: "email already exists" });
  }
};

exports.validateJwt = async function (req, res, next) {
  try {
    const token = req.headers.authorization;

    const verifyJwt = jwt.verify(token, jwtSecretKey);

    const decodeJwt = await jwt.decode(token, jwtSecretKey);

    const user = await User.findOne({ email: decodeJwt.email });
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "internal server err" });
  }
};
