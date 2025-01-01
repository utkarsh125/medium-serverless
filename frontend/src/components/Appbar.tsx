import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Appbar = () => {
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-black border-b border-gray-800">
      {/* Logo/Title */}
      <Link to="/blog/bulk" className="flex items-center space-x-2">
        <div className="text-2xl font-bold text-white">
          slothBlog
        </div>
      </Link>

      {/* Actions */}
      <div className="flex items-center space-x-6">
        {/* New Button */}
        <Link to="/publish">
          <button
            type="button"
            className="text-white bg-indigo-600 hover:bg-indigo-700 transition-colors font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            New
          </button>
        </Link>
        
        {/* Avatar */}
        <Avatar name="Utkarsh" size={8} />
      </div>
    </div>
  );
};