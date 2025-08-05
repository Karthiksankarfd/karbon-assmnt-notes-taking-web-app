// routes/notesRoute.js
const express = require("express");
const router = express.Router();
const editNote = require("../controllers/update/updateNote");
const authMiddleware = require("../middleware/verifytokenmiddleware")

router.post("/note/edit", editNote); 

module.exports = router;
