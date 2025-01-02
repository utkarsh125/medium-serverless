//@ts-nocheck
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { BACKEND_URL } from "../config";
import axios from "axios";

export const Appbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: {
          authorization: JSON.parse(localStorage.getItem("token") || ""),
        },
      })
      .then((response) => setUserName(response.data.name || "Guest"))
      .catch(() => navigate("/signin"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const NavAvatar = ({ name }: { name: string }) => {
    const initial = name ? name[0].toUpperCase() : "?";
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-500 text-white font-bold">
        {initial}
      </div>
    );
  };

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-black border-b border-gray-800">
      <Link to="/blog/bulk" className="flex items-center space-x-2">
        <div className="text-2xl font-bold text-white">slothBlog</div>
      </Link>
      <div className="flex items-center space-x-6">
        <Link to="/publish">
          <button
            type="button"
            className="text-white bg-indigo-600 hover:bg-indigo-700 transition-colors font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            New
          </button>
        </Link>
        <div className="relative">
          <div onClick={() => setShowDropdown(!showDropdown)} className="cursor-pointer">
            <NavAvatar name={userName} />
          </div>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
