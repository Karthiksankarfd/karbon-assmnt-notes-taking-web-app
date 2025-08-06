const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

const verifyToken = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "Token not provided" }); // 400 Bad Request
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.userId }).populate("notes");

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // 404 Not Found
    }

    return res.status(200).json({ user });

  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(440).json({ message: "Session expired. Please log in again." }); 
    }

    return res.status(401).json({ message: "Invalid token" }); 
  }
};

module.exports = verifyToken;
