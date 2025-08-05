const User = require("../../models/userModel");
const comparePassword = require("../../utils/comparepassword");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ message: "No user found. Please sign up." });
    }

    if (user.loginType === "standard") {
      const isPasswordValid = await comparePassword(password, user.password); 

      if (!isPasswordValid) {
        return res.status(403).json({ message: "Invalid password" });
      }
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    user.password = undefined; 

    return res.status(200).json({ message: "Logged in", user, token });
  } catch (e) {
    console.error("Login error:", e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = login;
