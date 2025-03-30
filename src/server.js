const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Firebase Configuration
const { db, auth, storage } = require("../src/config/firebaseConfig");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const faqRoutes = require("./routes/faqRoutes");
const videoRoutes = require("./routes/videoRoutes");

// Import Middlewares
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
dotenv.config();

// Firebase Test Route
app.get("/api/test-firebase", async (req, res) => {
  try {
    const testDoc = await db.collection("test").doc("sample").get();
    if (!testDoc.exists) {
      return res.status(404).json({ message: "No test document found" });
    }
    res.json({ data: testDoc.data() });
  } catch (error) {
    res.status(500).json({ message: "Firebase connection failed", error });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/videos", videoRoutes);

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
