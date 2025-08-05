
const  {OAuth2Client} = require("google-auth-library")

// creating new instance of  OAuth2Client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require("../../models/userModel")


    
const googleLogin = async (req, res) => {
 
  const googleToken  = req.headers.authorization?.split(" ")[1];

  console.log(googleToken)

  try {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    let user = await User.findOne({ email: payload.email }).populate("notes")

    if(!user){
            user = await User.create({
            name: payload.name,
            loginType:"googlelogin",
            email: payload.email,
            profilePicture: payload.picture,
            authProvider: "google",
    });

    }
    console.log(user) ;
    return res.status(200).json({ message:"Log in successfull" , user});

  } catch (err) {

    return res.status(401).json({ error: "Error in google login...Invalid token" });

  }
}

module.exports = googleLogin;

