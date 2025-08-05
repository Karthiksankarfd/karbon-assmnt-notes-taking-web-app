const express = require("express")
const router = express.Router()
const createNote =  require("../controllers/dataToDB/createNote")


router.post("/notes/:userId" , createNote)


module.exports = router ;