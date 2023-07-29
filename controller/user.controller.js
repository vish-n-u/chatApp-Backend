const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const { jwtSecretKey } = require("../config/jwt.config");

exports.registration = async (req, res) => {
  // console.log("reached here");
  const newUserObj = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email,
    pic: req.body.pic,
  };
  try {
    const newUser = await User.create(newUserObj);
    res.status(201).send({ message: "success" });
    return;
  } catch (err) {
    res.status(500).send({ message: "internal server error" });
    console.log("error at registration", err);
    return;
  }
};

exports.login = async (req, res) => {
  // console.log("login", req.body.email, req.body.password, req.body.name, 10);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).send({ message: "Incorrect email" });
      return;
    }
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
      res.status(401).send({ message: "Incorrect password" });
      return;
    }
    const token = jwt.sign({ email: user.email }, jwtSecretKey);
    // res.cookie("token", token, { httpOnly: true });
    return res.status(200).send({
      message: "successfully Logged in!",
      token: token,
      user: JSON.stringify(user),
    });
  } catch (err) {
    res.status(500).send({ message: "internal server error" });

    console.log("error at login", err);
    return;
  }
};

exports.getUser = async function (req, res) {
  try {
    // console.log("reached");
    const searchUser = req.query.search || {};
    // console.log("searchUser", searchUser);
    const getSearchedUser = await User.find({
      username: { $regex: new RegExp(searchUser, "i") },
      _id: { $ne: req.user._id },
    });

    // console.log(getSearchedUser);
    return res.status(200).send(getSearchedUser);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "internal error" });
  }
};
