import React, { useState } from "react";
import axios from "axios";

const CreateNoteModal = ({ isOpen, onClose, userId, onNoteAdded }) => {

 
  const baseURL = import.meta.env.VITE_BASE_API_END_POINT

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddNote = async () => {
    
    console.log(title , content)
    if (!title.trim() || !content.trim()) return;

    try {
      const res = await axios.post(`${baseURL}/notes/${userId}`, {
        title,
        content,
      });

      console.log(res)

      onNoteAdded(res.data.notes);
      setTitle("");
      setContent("");
      onClose();
    } catch (error) {
      console.error("Error adding note:", error.response?.data || error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-[800px] shadow-lg">
        <h2 className="text-lg font-bold mb-4">Add Note</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />
        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded min-h-[100px] mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleAddNote}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNoteModal;
