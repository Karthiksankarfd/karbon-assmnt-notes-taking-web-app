import React, { useContext } from 'react'
import { UserContext } from '../../contex/UserContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const useAddNotes = () => {

    const baseURL = import.meta.env.VITE_BASE_API_END_POINT
    const { user, setUser } = useContext(UserContext)

    const handleAddNote = async (note) => {
        if (!note.title.trim() || !note.content.trim()) {
            toast.warn("Both title and content are required!", {
                position: "top-right",
            });
            return;
        }

        const toastId = toast.loading("Saving note...", {
            position: "top-right",
        });

        try {
            const res = await axios.post(`${baseURL}/notes/${user?._id}`, note);

            setUser((prev) => ({
                ...prev,
                notes: [...prev.notes, res.data.note],
            }));

            toast.update(toastId, {
                render: "Note added successfully!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

        } catch (error) {
            toast.update(toastId, {
                render:
                    error.response?.data?.message || "Failed to add note. Try again.",
                type: "error",
                isLoading: false,
                autoClose: 4000,
            });

            console.error("Error adding note:", error.response?.data || error.message);
        }
    };
    return { handleAddNote }
}

export default useAddNotes
