const express = require("express");
const { sendToLLM } = require("../utils/llmService.js"); // Now using require

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const response = await sendToLLM(message);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router; // Using module.exports instead of export default
