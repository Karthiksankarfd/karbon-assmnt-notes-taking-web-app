import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contex/UserContext';
// import { Menu, X } from 'lucide-react'; // or use any icons you like

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black text-white px-4 py-3 sticky top-0 z-40">
      <nav className="flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="text-xl font-bold">
          My Notes
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ?  <button>x</button> : <button>open</button>}
        </button>

        {/* Menu Items (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:underline">
            View My Notes
          </Link>
          <Link to="profile" className="flex items-center gap-2">
            <img
              className="h-10 w-10 rounded-full"
              src={
                user?.profilePicture ||
                'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png'
              }
              alt="profile"
            />
            <span>{user?.name || 'Profile'}</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          <Link to="/" className="hover:underline" onClick={() => setIsOpen(false)}>
            View My Notes
          </Link>
          <Link
            to="profile"
            className="flex items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <img
              className="h-10 w-10 rounded-full"
              src={
                user?.profilePicture ||
                'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png'
              }
              alt="profile"
            />
            <span>{user?.name || 'Profile'}</span>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
