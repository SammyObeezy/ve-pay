const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const faqRoutes = require("./routes/faqRoutes");
const videoRoutes = require("./routes/videoRoutes");

// Import Middlewares
const errorHandler = require("./middlewares/errorMiddleware");
const verifyToken = require("./middlewares/authMiddleware");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));
dotenv.config();

// Routes
app.use(authRoutes);
app.use("/api/blogs", verifyToken, blogRoutes);
app.use("/api/faqs", verifyToken, faqRoutes);
app.use("/api/videos", verifyToken, videoRoutes);

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
