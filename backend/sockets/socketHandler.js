const axios = require("axios");

const LLM_API_URL = process.env.LLM_API_URL || "http://localhost:8000/generate";

const setupSockets = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("send_message", async (data) => {
      try {
        // Send message to LLM
        const response = await axios.post(LLM_API_URL, { message: data.message });

        // Send response back to client
        socket.emit("receive_message", { message: response.data.response });
      } catch (error) {
        socket.emit("receive_message", { message: "Error processing request" });
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

module.exports = setupSockets; // Use module.exports instead of export default
