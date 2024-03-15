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

app.use(cors());

const { postchat } = require("./controllers/chatcontroller");

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("sendMessage", (data) => {
    const { message, receiver } = data;
    const sender = data.sender.userId;
    postchat(message, receiver, sender);
    data.date = new Date();
    data.sender = sender;
    io.emit("message-broadcast", data);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
  });
});

// MongoDB connection
mongoose
  .connect(DB_url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

httpServer.listen(port, () => console.log(`listening on port ${port}`));
