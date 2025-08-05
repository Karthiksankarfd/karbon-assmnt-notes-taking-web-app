import React, { useContext, useState } from 'react'
import CreateNoteModal from '../modal/CreateNoteModal';
import { UserContext } from '../../contex/UserContext';

const Notes = () => {
  const { user } = useContext(UserContext)
  const [modalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const userId = user._id ;

  return (
<div className="p-6  h-dvh w-full">
      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded fixed bottom-5 right-5"
      >
        Add Note
      </button>

      <ul className="mt-4 space-y-2">
        {notes.map((note, i) => (
          <li key={i} className="p-4 border rounded">
            <strong>{note.title}</strong>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>

      <CreateNoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        userId={userId}
        onNoteAdded={(newNotes) => setNotes(newNotes)}
      />
    </div>
  )
}

export default Notes
