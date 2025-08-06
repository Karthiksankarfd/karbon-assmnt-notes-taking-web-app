import React, { useContext } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../contex/UserContext";

const useEditNote = () => {

    const baseURL = import.meta.env.VITE_BASE_API_END_POINT;
    const token = localStorage.getItem("notesapptoken");

    const { setUser } = useContext(UserContext);

    const saveNote = async (editNote) => {

        if (!editNote.title.trim() || !editNote.content.trim()) {
            toast.warn("Both title and content are required!");
            return;
        }

        const toastId = toast.loading("Saving note...");

        try {
            console.log(editNote)
            const res = await axios.put(`${baseURL}/note/edit`, editNote, {
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

    return { saveNote };

}
export default useEditNote;
