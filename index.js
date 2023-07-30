import Express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRoute } from "./route/user.route.js";
import chatRoute from "./route/chat.route.js";

import messageRoute from "./route/message.route.js";
import { Server } from "socket.io";
import DB_URL from "./config/db.config.js";

const express = Express;
const app = express();
app.use(express.json());

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
  userRoute(app);
  chatRoute(app);
  messageRoute(app);
  const server = app.listen(
    5000,
    console.log(`Server running on PORT ${5000}...`)
  );
  const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: "https://main--cerulean-puffpuff-0bd317.netlify.app",
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
