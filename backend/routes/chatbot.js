import express from "express";
import { sendToLLM } from "../utils/llmService.js";

const router = express.Router();

// Fallback API route (Optional)
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

export default router;
