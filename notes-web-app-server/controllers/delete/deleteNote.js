// routes/notesRoute.js
const express = require("express");
const mongoose = require("mongoose");
const Note = require("../../models/noteSchema");
const User = require("../../models/userModel");

const deleteNote = async (req, res) => {
  
  const { userId  } = req.user;
  
  const { noteId } = req.params;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Delete the note
    const note = await Note.findOneAndDelete(
      { _id: noteId },
      { session }
    );

    if (!note) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: "Note not found" });
    }

    // Remove noteId from user's notes array
    await User.findByIdAndUpdate(

      {_id:  userId},
      { $pull:  { notes: noteId } },
      { session }

    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Note deleted successfully",
      note,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Transaction failed:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = deleteNote;
