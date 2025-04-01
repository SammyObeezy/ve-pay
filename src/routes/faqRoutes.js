const express = require("express");
const {
  addFAQ,
  getFAQs,
  updateFAQ,
  deleteFAQ,
} = require("../controllers/faqController");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeAdmin = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/", verifyToken, authorizeAdmin, addFAQ); // Only Admins can add FAQs
router.get("/", getFAQs);
router.put("/:id", verifyToken, authorizeAdmin, updateFAQ); // Only Admins can update FAQs
router.delete("/:id", verifyToken, authorizeAdmin, deleteFAQ); // Only Admins can delete FAQs

module.exports = router;
