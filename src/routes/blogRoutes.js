const express = require("express");
const { addBlog, getBlogs } = require("../controllers/blogController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, addBlog); // Only authenticated users can add blogs
router.get("/", verifyToken, getBlogs);

module.exports = router;
