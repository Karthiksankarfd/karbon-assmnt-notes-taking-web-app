
const Note = require("../../models/noteSchema");

const editNote = async (req, res) => {

  const { _id, title, content } = req.body;

  console.log(req.body)
  if (!_id || !title || !content) {
    return res.status(400).json({ error: "Missing note ID, title, or content." });
  }

  try {
    const note = await Note.findByIdAndUpdate(
      _id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({
      message: "Note updated successfully",
      note,
    });
  } catch (err) {
    console.error("Edit note error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = editNote;
