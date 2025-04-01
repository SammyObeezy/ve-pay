const { addBlog, getBlogs, updateBlog, deleteBlog } = require("../models/Blog");

class BlogController {
  async addBlog(req, res) {
    const { title, content, categories, tags } = req.body;
    try {
      const blogId = await addBlog({
        title,
        content,
        categories,
        tags,
        author: req.user.uid,
      });
      res.status(201).json({ message: "Blog created successfully", blogId });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating blog", error: error.message });
    }
  }

  async getBlogs(req, res) {
    try {
      const blogs = await getBlogs();
      res.json(blogs);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching blogs", error: error.message });
    }
  }

  async updateBlog(req, res) {
    const { id } = req.params;
    const { title, content, categories, tags } = req.body;
    try {
      await updateBlog(id, { title, content, categories, tags });
      res.json({ message: "Blog updated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating blog", error: error.message });
    }
  }

  async deleteBlog(req, res) {
    const { id } = req.params;
    try {
      await deleteBlog(id);
      res.json({ message: "Blog deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting blog", error: error.message });
    }
  }
}

module.exports = new BlogController();
