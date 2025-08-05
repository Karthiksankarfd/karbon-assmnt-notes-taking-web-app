// routes/notesRoute.js
const express = require("express");
const Note = require("../../models/noteSchema");
const User = require("../../models/userModel")
const mongoose = require("mongoose");

const createNote = async (req, res) => {
  const { userId } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const note = await Note.create(
      [{ title, content, userId }],
      { session }  // im adding this to the transaction
    );

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { notes: note[0]._id } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Note added successfully",
      note: note[0],
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.error("Transaction failed:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = createNote;

