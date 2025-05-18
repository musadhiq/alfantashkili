import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Logo from './Logo';
import { LogOut, User } from 'lucide-react'; // Optional: icon library
import { logout } from '../features/auth/authSlice';
import LogoImage from '../assets/logo.png';

function NavBar() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
  };

  return (
    <div className="nav-bar-container flex justify-between items-center px-4 py-2  border-b">
      <div className="flex items-center gap-2">
        <img src={LogoImage} alt="Logo" className="w-14 h-10 object-cover filter  rounded-lg" />
        <span className="text-base font-semibold">Alfantashkili</span>
      </div>

      {token && (
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-full transition"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <User className="w-5 h-5 text-gray-700" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-50">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NavBar;
