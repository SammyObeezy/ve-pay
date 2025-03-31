const express = require("express");
const { addFAQ, getFAQs } = require("../controllers/faqController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, addFAQ); // Only authenticated users can add FAQs
router.get("/", verifyToken, getFAQs);

module.exports = router;
