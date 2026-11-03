const express = require("express");
const fetch = require("node-fetch");
const authMiddleware = require("../Middleware/authMiddleware");

const router = express.Router();
const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

router.post("/ask", authMiddleware, async (req, res) => {
  const prompt = typeof req.body?.prompt === "string" ? req.body.prompt.trim() : "";
  if (!prompt) return res.status(400).json({ message: "Please enter a question." });
  if (prompt.length > 12000) return res.status(400).json({ message: "Please keep your question under 12,000 characters." });
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ message: "The AI tutor is not configured yet. Please try again later." });
  try {
    const response = await fetch(GEMINI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error("Gemini request failed:", response.status);
      return res.status(502).json({ message: "The AI tutor is temporarily unavailable. Please try again shortly." });
    }
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return res.status(502).json({ message: "The AI tutor did not return an answer. Please try again." });
    return res.json({ text });
  } catch (error) {
    console.error("Gemini error:", error.message);
    return res.status(502).json({ message: "The AI tutor could not be reached. Please try again." });
  }
});

module.exports = router;
