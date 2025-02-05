const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const chatbotRoutes = require("./routes/chatbot");
const setupSockets = require("./sockets/socketHandler");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/chatbot", chatbotRoutes);

// WebSocket setup
setupSockets(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
