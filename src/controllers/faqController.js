const { addFAQ, getFAQs, updateFAQ, deleteFAQ } = require("../models/FAQ");

class FAQController {
  async addFAQ(req, res) {
    const { question, answer, categories } = req.body;
    try {
      const faqId = await addFAQ({ question, answer, categories });
      res.status(201).json({ message: "FAQ created successfully", faqId });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating FAQ", error: error.message });
    }
  }

  async getFAQs(req, res) {
    try {
      const faqs = await getFAQs();
      res.json(faqs);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching FAQs", error: error.message });
    }
  }

  async updateFAQ(req, res) {
    const { id } = req.params;
    const { question, answer, categories } = req.body;
    try {
      await updateFAQ(id, { question, answer, categories });
      res.json({ message: "FAQ updated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating FAQ", error: error.message });
    }
  }

  async deleteFAQ(req, res) {
    const { id } = req.params;
    try {
      await deleteFAQ(id);
      res.json({ message: "FAQ deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting FAQ", error: error.message });
    }
  }
}

module.exports = new FAQController();
