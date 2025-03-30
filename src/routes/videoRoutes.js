const express = require("express");
const multer = require("multer");
const { uploadVideo } = require("../controllers/videoController");
const verifyToken = require("../middlewares/authMiddleware");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", verifyToken, upload.single("video"), uploadVideo); // Only authenticated users

module.exports = router;
