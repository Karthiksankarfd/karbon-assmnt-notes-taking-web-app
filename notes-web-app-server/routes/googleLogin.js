const express = require("express")
const router = express.Router()

const googleLogin = require("../controllers/auth/googleLogin")
const login =  require("../controllers/auth/login")
const verifyToken = require("../controllers/auth/verifytoken")
const signUp = require("../controllers/auth/createUser")

router.post("/google-login" , googleLogin)
router.post("/login" , login)
router.get("/verify-token" , verifyToken)
router.post("/signup" , signUp)

module.exports = router ;



