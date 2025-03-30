const { db } = require("../config/firebase");

exports.addBlog = async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newBlog = { title, content, author, createdAt: new Date() };
    await db.collection("blogs").add(newBlog);
    res.status(201).json({ message: "Blog created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog" });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await db.collection("blogs").get();
    const blogList = blogs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(blogList);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};
