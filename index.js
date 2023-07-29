const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
const mongoose = require("mongoose");
const DB_URL = require("./config/db.config");

app.use(cors());
app.get("/", (req, res) => {
  res.status(200).json({ message: "hello world" });
});

mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on("error", () => {
  console.log("#### Error while connecting to mongoDB ####");
});
db.once("open", () => {
  console.log("#### Connected to mongoDB ####");
  require("./route/user.route")(app);
  require("./route/chat.route")(app);
  require("./route/message.route")(app);
  const server = app.listen(
    5000,
    console.log(`Server running on PORT ${5000}...`)
  );
  const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
    },
  });
  io.on("connection", (socket) => {
    console.log("Connection established");
    socket.on("setup", (userData) => {
      socket.join(userData._id);

      socket.emit("connected");
    });
    socket.on("join chat", (room) => {
      console.log("join room", room);
      socket.join(room);
    });

    socket.on("disjoin chat", (room) => {
      console.log("disjoin room", room);
      socket.leave(room);
    });
    socket.on("typing", (room) => {
      console.log("typing reached", room);
      socket.in(room).emit("typing", room);
    });
    socket.on("stop typing", (room) => {
      console.log("stop typing reached", room);
      socket.in(room).emit("stop typing", room);
    });
    socket.on("new message", (newMessageReceived) => {
      newMessageReceived.chatId.users.forEach((user) => {
        if (newMessageReceived.sender._id === user._id) return;

        socket.in(user._id).emit("message recieved", newMessageReceived);
      });
    });
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });
});
