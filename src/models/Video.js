const { db } = require("../config/firebase");

const addVideo = async (data) => {
  const videoRef = db.collection("videos").doc();
  await videoRef.set({ ...data, createdAt: new Date().toISOString() });
  return videoRef.id;
};

const getVideos = async () => {
  const videosSnapshot = await db.collection("videos").get();
  return videosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const updateVideo = async (id, data) => {
  const videoRef = db.collection("videos").doc(id);
  await videoRef.update({ ...data, updatedAt: new Date().toISOString() });
};

const deleteVideo = async (id) => {
  const videoRef = db.collection("videos").doc(id);
  await videoRef.delete();
};

module.exports = {
  addVideo,
  getVideos,
  updateVideo,
  deleteVideo,
};
