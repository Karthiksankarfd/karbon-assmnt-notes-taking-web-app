import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contex/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { EditNoteContext } from "../contex/EditContext";

const EditNote = () => {
    
  const baseURL = import.meta.env.VITE_BASE_API_END_POINT;
  const token = localStorage.getItem("notesapptoken");

  const {  setUser } = useContext(UserContext);
  const { editNote  , setEditNote} = useContext(EditNoteContext);





  const handleNoteChange = (e) => {
    console.log(editNote._id)
    setEditNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddNote = async () => {
    if (!editNote.title.trim() || !editNote.content.trim() ) {
      toast.warn("Both title and content are required!");
      return;
    }

    const toastId = toast.loading("Saving note...");
   

    try {
         console.log(editNote)
      const res = await axios.post(`${baseURL}/note/edit`, editNote , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 

     
      setUser((prev) => ({
        ...prev,
        notes: prev.notes.map((n) =>
          n._id === res.data.note._id ? res.data.note : n
        ),
      }));

      toast.update(toastId, {
        render: "Note updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

    } catch (error) {
      toast.update(toastId, {
        render: error.response?.data?.message || "Failed to update note.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
      console.error("Error editing note:", error.response?.data || error.message);
    }
  };

  return (
    <section className="bg-black/90 min-h-dvh w-full p-5 text-white/70 relative">
      <div>
        <input
          type="text"
          name="title"
          onChange={handleNoteChange}
          value={editNote?.title}
          placeholder="Title"
          className="text-2xl font-semibold py-2 px-5 w-full bg-transparent border-b border-white/50 focus:outline-none mb-4"
        />
      </div>

      <div>
        <textarea
          name="content"
          onChange={handleNoteChange}
          value={editNote?.content}
          placeholder="Notes"
          className="w-full h-64 resize-none p-5 bg-transparent border border-white/30 rounded-lg focus:outline-white/70"
        ></textarea>
      </div>

      <button
        onClick={handleAddNote}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg fixed bottom-5 left-1/2 transform -translate-x-1/2"
      >
        Save Edit
      </button>
    </section>
  );
};

export default EditNote;
