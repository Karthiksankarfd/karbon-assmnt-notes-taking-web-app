import React, { useContext } from "react";
import { UserContext } from "../contex/UserContext";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useDeleteNote from "../components/hooks/useDeleteNote";
import { EditNoteContext } from "../contex/EditContext";

export default function NotesPage() {
  const navigateTo = useNavigate();

  const { setEditNote } = useContext(EditNoteContext);
  const { user, setUser } = useContext(UserContext);
  const { deleteNote } = useDeleteNote();

  const handleEditNote = (note) => {
    setEditNote(note); // Set the current note in context
    navigateTo(`editnote/?noteId=${note._id}`); // Navigate to /editnote (query param remains in URL)
  };

  const handleDeleteNote = async (noteId) => {
    const updatedNotes = user.notes.filter((note) => note._id !== noteId);
    setUser((prev) => ({ ...prev, notes: updatedNotes }));
    await deleteNote(noteId);
  };

  if (!user?.notes?.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg bg-red-100 text-red-700 shadow-md w-full max-w-md mx-auto mt-10">
        <h2 className="text-xl font-semibold text-center">
          You haven&apos;t created any notes yet.
        </h2>
        <Link
          to="/addnotes"
          className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
        >
          + Add Note
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-dvh h-auto bg-black/90 text-white/70 relative">
      <Link
        to="addnotes"
        className="
          bg-black/90 
          text-white/70 
          font-bold 
          fixed bottom-4 left-1/2 transform -translate-x-1/2 
          animate-bounce hover:animate-none

          text-base px-6 py-2
          sm:text-lg sm:px-8 sm:py-2.5
          md:text-xl md:px-10 md:py-3
          lg:text-2xl lg:px-12 lg:py-3.5
        "
      >
        Create New Note
      </Link>

      <ul className="mt-4 space-y-4">
        {user?.notes?.map((note, i) => (
          <li
            key={i}
            className="p-4 border rounded-lg shadow-sm  flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <strong className="text-2xl underline">
                {" "}
                <h2 className="text-white text-2xl font-medium ">
                  Title :-
                </h2>{" "}
                {note.title}
              </strong>
              <div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditNote(note)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>

                <div className="py-2">
                  <h6>Created On : {note?.createdAt?.split("T")[0]}</h6>
                  <h6>Updated On : {note?.updatedAt?.split("T")[0]}</h6>
                </div>
              </div>
            </div>

            <h2 className="text-white text-2xl underline">Content :-</h2>
            <p className="whitespace-pre-line ">{note?.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
