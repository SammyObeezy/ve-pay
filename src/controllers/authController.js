const { admin } = require("../config/firebase");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    res.json({ message: "Login Successful", uid: userRecord.uid });
  } catch (error) {
    res.status(401).json({ message: "Invalid Email or Password" });
  }
};
