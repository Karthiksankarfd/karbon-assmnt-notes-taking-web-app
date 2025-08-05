const User = require("../../models/userModel")
const hash = require("../../utils/hashpassword")

const createUser = async (req, res) => {
  try {
    const { name, password, email , loginType } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({ message: "User already exists. Try logging in." });
    }
    const hashedPassword = await hash(password)
    
    const newUser = await new User({name  , email , loginType , password:hashedPassword }).save()

    res.status(201).json({
      message: "User created successfully", newUser
    });


  } catch (error) {

    console.error("Error in createUser:", error);
    res.status(500).json({ message: "Server error" });

  }
  
};

module.exports = createUser