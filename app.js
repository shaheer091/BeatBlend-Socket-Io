require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT;
const DB_url = process.env.DATABASE;

const app = require("express")();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: { origin: "*" },
});

const users = [];

app.use(cors());

// MongoDB connection
mongoose
  .connect(DB_url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

const { postchat } = require("./controllers/chatcontroller");

io.use(async (socket, next) => {
  socket.userd = socket.handshake.auth.userid;
  console.log(socket.userd)
  next();
}).on("connection", (socket) => {
  console.log("a user connected");
  socketId = socket.id;
  // console.log(socketId);
  const user = { socketid: socketId, userid: socket.userd };
  users.push(user);
  console.log(users);

  socket.on("sendMessage", (data) => {
    const { message, receiver, sender } = data;
    postchat(message, receiver, sender);
    data.date = new Date();

    const recipient = users.find((user) => user.userid == receiver);
    if (recipient) {
      io.to(recipient.socketid).emit("receiveMessage", data);
    } else {
      console.log("no reciever found");
    }
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    let index = users.findIndex((e) => e.socketid == socket.id);
    // console.log(index);
    if (index !== -1) {
      users.splice(index, 1);
      // console.log("manu");
    } else {
      console.log("user not found");
    }
    console.log(users, "disconnection");
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
