import React, { useContext, useState } from "react";
import { UserContext } from "../contex/UserContext";
import useAddNotes from "../components/hooks/useAddNotes";

const AddNotesPage = () => {
  const { user } = useContext(UserContext);
  const { handleAddNote } = useAddNotes();

  const [note, setNote] = useState({
    _id: user._id,
    title: "",
    content: "",
  });

  const handleNoteChange = (e) => {
    setNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    handleAddNote(note);
  };

  return (
    <section className="bg-black/90 h-auto min-h-dvh w-full p-5 text-white/70 relative">
      <div>
        <input
          onChange={handleNoteChange}
          type="text"
          name="title"
          placeholder="Title"
          className="focus:outline-1 focus:outline-white/70 text-2xl font-semibold py-2 px-5 text-white/70"
        />
      </div>
      <div className="h-full">
        <textarea
          onChange={handleNoteChange}
          name="content"
          placeholder="Notes"
          id="notes"
          className="focus:outline-1 focus:outline-white/70 field-sizing-content text-lg font-semibold py-2 px-5   text-white/70 w-full"
        ></textarea>
      </div>
      <button
        onClick={handleNoteSubmit}
        className="bg-black/90 text-white/70 font-bold p-2 fixed bottom-5 left-1/2 transform -translate-x-1/2 "
      >
        Save Note
      </button>
    </section>
  );
};

export default AddNotesPage;
