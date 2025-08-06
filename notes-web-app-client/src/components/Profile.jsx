import React, { useContext } from "react";
import { UserContext } from "../contex/UserContext";
import { AuthContext } from "../contex/AuthContext";

const Profile = () => {
  
  const { setLoggedIn } =  useContext(AuthContext)
  const handleLogOut = ()=>{
    localStorage.removeItem("notesapptoken")
    setLoggedIn(false)
  }
  const { user } = useContext(UserContext)

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-full mx-auto p-6 bg-black/90 text-white/80 shadow min-h-dvh h-auto">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={user?.profilePicture || "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png"}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="">{user?.email}</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium">
          Total Notes: {user?.notes?.length || 0}
        </h3>
        <button className="bg-black px-4 py-1" onClick={handleLogOut}>Log Out</button>
      </div>

      <ul className="space-y-2">
        {user?.notes?.map((note, index) => (
          <li key={index} className="p-3 border rounded ">
            <strong>{note.title}</strong>
            <p className="whitespace-pre-line">{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
