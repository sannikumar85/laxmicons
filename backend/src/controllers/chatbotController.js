const asyncHandler = require("../utils/asyncHandler");
const { success } = require("../utils/apiResponse");

function localReply(message = "") {
  const text = message.toLowerCase();

  if (text.includes("service")) {
    return "We provide construction, consultancy, renovation and labour-related services. You can visit the Services page to submit a request.";
  }
  if (text.includes("project")) {
    return "You can explore completed and ongoing projects from the Projects page.";
  }
  if (text.includes("job") || text.includes("career")) {
    return "Open the Careers page to see current vacancies and submit an application.";
  }
  if (text.includes("contact") || text.includes("phone")) {
    return "Please use the Contact page to send an enquiry. The team can follow up using the details you provide.";
  }
  if (text.includes("labour") || text.includes("worker")) {
    return "You can browse available labour profiles and submit a labour request after logging in.";
  }

  return "Hi! I can help with Laxmi Construction services, projects, careers, labour requests and contact information. What would you like to know?";
}

exports.chat = asyncHandler(async (req, res) => {
  const { message, history = [] } = req.body;
  if (typeof message !== "string" || !message.trim()) return res.status(400).json({ success: false, message: "Message is required." });

  // Optional external AI integration:
  // Set AI_API_URL, AI_API_KEY and AI_MODEL in .env if your provider supports
  // a compatible chat-completions endpoint. Otherwise the safe local FAQ reply is used.
  if (process.env.AI_API_URL && process.env.AI_API_KEY) {
    try {
      const response = await fetch(process.env.AI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.AI_API_KEY}`
        },
        body: JSON.stringify({
          model: process.env.AI_MODEL || "default",
          messages: [
            {
              role: "system",
              content: "You are the official Laxmi Construction website assistant. Give concise, factual help about construction services, consultancy, projects, labour, careers and contact. Do not invent prices, guarantees or company facts."
            },
            ...Array.isArray(history) ? history.slice(-10) : [],
            { role: "user", content: message.trim() }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const reply =
          data.choices?.[0]?.message?.content ||
          data.output?.[0]?.content?.[0]?.text ||
          localReply(message);
        return success(res, { reply });
      }
    } catch (error) {
      console.error("AI provider error:", error.message);
    }
  }

  success(res, { reply: localReply(message.trim()) });
});
