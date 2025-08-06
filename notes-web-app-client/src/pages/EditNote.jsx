import React, { useContext } from "react";
import { EditNoteContext } from "../contex/EditContext";
import useEditNote from "../components/hooks/useEditNote";

const EditNote = () => {
    
  const { editNote  , setEditNote} = useContext(EditNoteContext);
  const { saveNote } = useEditNote()


  const handleNoteChange = (e) => {
    setEditNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddNote = async () => {
        await saveNote(editNote)
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
          className="w-full resize-none field-sizing-content p-5 bg-transparent border border-white/30 rounded-lg focus:outline-white/70"
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
