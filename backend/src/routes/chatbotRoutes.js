const router = require("express").Router();
const c = require("../controllers/chatbotController");

router.post("/chat", c.chat);

module.exports = router;
