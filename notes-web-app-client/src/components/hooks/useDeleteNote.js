import axios from 'axios';
import { toast } from 'react-toastify';

const useDeleteNote = () => {
  const baseURL = import.meta.env.VITE_BASE_API_END_POINT;
  const token = localStorage.getItem("notesapptoken");

  const deleteNote = async (noteId) => {
    const loadingToast = toast.loading("Deleting note...");

    try {
      await axios.delete(`${baseURL}/notes/delete/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.update(loadingToast, {
        render: "Note deleted successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error deleting note:", error);

      toast.update(loadingToast, {
        render: error?.response?.data?.message || "Failed to delete note",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return { deleteNote };
};

export default useDeleteNote;
