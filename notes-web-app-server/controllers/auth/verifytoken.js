const jwt = require("jsonwebtoken")
const User = require("../../models/userModel")


const verifyToken = async (req, res) =>{

    const token = req.headers.authorization?.split(" ")[1]

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user =  await User.findOne({_id:decoded.userId}).populate("notes")

        return res.status(200).json({user})

  } catch (err) {

    if (err.name === "TokenExpiredError") {

      return res.status(401).json({ message: "Token expired" });
      
    }

    return res.status(401).json({ message: "Invalid token" });
    
  }
}

module.exports = verifyToken