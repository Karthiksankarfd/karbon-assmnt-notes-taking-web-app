const express = require("express")
const router = express.Router()
const tokenMiddleware = require("../middleware/verifytokenmiddleware")
const deleteNote = require("../controllers/delete/deleteNote")

router.delete("/notes/delete/:noteId" , tokenMiddleware  , deleteNote)

module.exports = router ;