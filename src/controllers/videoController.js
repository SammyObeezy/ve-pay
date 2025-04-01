const {
  addVideo,
  getVideos,
  updateVideo,
  deleteVideo,
} = require("../models/Video");

class VideoController {
  async addVideo(req, res) {
    const { title, link } = req.body;
    if (!link || !title) {
      return res.status(400).json({ message: "Title and link are required" });
    }
    try {
      const videoId = await addVideo({ title, link, author: req.user.uid });
      res
        .status(201)
        .json({ message: "Video link added successfully", videoId });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error adding video link", error: error.message });
    }
  }

  async getVideos(req, res) {
    try {
      const videos = await getVideos();
      res.json(videos);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching videos", error: error.message });
    }
  }

  async updateVideo(req, res) {
    const { id } = req.params;
    const { title, link } = req.body;
    try {
      await updateVideo(id, { title, link });
      res.json({ message: "Video link updated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating video link", error: error.message });
    }
  }

  async deleteVideo(req, res) {
    const { id } = req.params;
    try {
      await deleteVideo(id);
      res.json({ message: "Video link deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting video link", error: error.message });
    }
  }
}

module.exports = new VideoController();
