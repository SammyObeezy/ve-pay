const { bucket } = require("../config/firebase");

exports.uploadVideo = async (req, res) => {
  try {
    const file = bucket.file(`videos/${Date.now()}_${req.file.originalname}`);
    const stream = file.createWriteStream({
      metadata: { contentType: req.file.mimetype },
    });

    stream.on("error", (err) => res.status(500).json({ error: err.message }));
    stream.on("finish", () =>
      res.json({ message: "Video uploaded successfully" })
    );

    stream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload video" });
  }
};
