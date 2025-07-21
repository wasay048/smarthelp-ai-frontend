import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-full p-4">
      <h2 className="text-lg font-bold mb-4">SmartHelp.AI</h2>
      <ul>
        <li className="mb-2">
          <Link to="/dashboard" className="hover:text-gray-400">
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/chat" className="hover:text-gray-400">
            Chat
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/knowledge" className="hover:text-gray-400">
            Knowledge
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/embed" className="hover:text-gray-400">
            Embed Code
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/auth" className="hover:text-gray-400">
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
