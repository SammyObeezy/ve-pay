const { db } = require("../config/firebase");

exports.addFAQ = async (req, res) => {
  const { question, answer } = req.body;

  try {
    const newFAQ = { question, answer };
    await db.collection("faqs").add(newFAQ);
    res.status(201).json({ message: "FAQ added", faq: newFAQ });
  } catch (error) {
    res.status(500).json({ error: "Failed to add FAQ" });
  }
};

exports.getFAQs = async (req, res) => {
  try {
    const faqs = await db.collection("faqs").get();
    const faqList = faqs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(faqList);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch FAQs" });
  }
};
