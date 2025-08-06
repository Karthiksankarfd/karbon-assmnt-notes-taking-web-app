const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  const googleToken = req.headers.authorization?.split(" ")[1];

  if (!googleToken) {
    return res.status(400).json({ error: "Google token not provided" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    let user = await User.findOne({ email: payload.email }).populate("notes");

    if (!user) {
      user = await User.create({
        name: payload.name,
        loginType: "googlelogin",
        email: payload.email,
        profilePicture: payload.picture,
        authProvider: "google",
      });
    }

    // Remove password from user before sending response
    user.password = undefined;

    // Create JWT token
    const tokenPayload = { userId: user._id };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user,
    });

  } catch (err) {
    console.error("Google login error:", err);
    return res.status(401).json({ error: "Invalid Google token" });
  }
};

module.exports = googleLogin;
