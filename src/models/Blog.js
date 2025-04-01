const { db } = require("../config/firebase");

const addFAQ = async (data) => {
  const faqRef = db.collection("faqs").doc();
  await faqRef.set({ ...data, createdAt: new Date().toISOString() });
};

const getFAQs = async () => {
  const faqSnapshot = await db.collection("faqs").get();
  return faqSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const updateFAQ = async (id, data) => {
  const faqRef = db.collection("faqs").doc(id);
  await faqRef.update({ ...data, updatedAt: new Date().toISOString() });
};

const deleteFAQ = async (id) => {
  const faqRef = db.collection("faqs").doc(id);
  await faqRef.delete();
};

module.exports = {
  addFAQ,
  getFAQs,
  updateFAQ,
  deleteFAQ,
};
