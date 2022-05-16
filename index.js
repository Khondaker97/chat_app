import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import userRoutes from "./routes/userRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";

dotenv.config();
const app = express();
app.get("/", (req, res) => {
  res.send("hello it works");
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`running on port ${PORT} `));
mongoose
  .connect(process.env.MONGO_URI, () => console.log(`Connected to database.`), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(server)
  .catch((error) => console.log(error));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    Credential: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
