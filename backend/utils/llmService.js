const axios = require("axios");

const LLM_API_URL = process.env.LLM_API_URL || "http://localhost:8000/generate";

const sendToLLM = async (message) => {
  try {
    const response = await axios.post(LLM_API_URL, { message });
    return response.data.response;
  } catch (error) {
    console.error("Error communicating with LLM:", error);
    return "Error processing request";
  }
};

module.exports = { sendToLLM }; // Use module.exports instead of export
