const express = require("express");
const {
  addVideo,
  getVideos,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeAdmin = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/", verifyToken, authorizeAdmin, addVideo); // Only Admins can add video links
router.get("/", getVideos);
router.put("/:id", verifyToken, authorizeAdmin, updateVideo); // Only Admins can update video links
router.delete("/:id", verifyToken, authorizeAdmin, deleteVideo); // Only Admins can delete video links

module.exports = router;
