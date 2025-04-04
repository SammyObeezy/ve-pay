const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

module.exports = authorizeAdmin;
