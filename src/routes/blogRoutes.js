const express = require("express");
const {
  addBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeAdmin = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/", verifyToken, authorizeAdmin, addBlog); // Only Admins can add blogs
router.get("/", getBlogs);
router.put("/:id", verifyToken, authorizeAdmin, updateBlog); // Only Admins can update blogs
router.delete("/:id", verifyToken, authorizeAdmin, deleteBlog); // Only Admins can delete blogs

module.exports = router;
