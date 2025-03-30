class Video {
  constructor(url, title, description) {
    this.url = url;
    this.title = title;
    this.description = description;
    this.uploadedAt = new Date();
  }
}

module.exports = Video;
