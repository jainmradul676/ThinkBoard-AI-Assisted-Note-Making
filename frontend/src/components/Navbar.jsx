import { PlusIcon, LogOut, User } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  // Get first letter for avatar
  const getInitials = (email) => {
    return email ? email.charAt(0).toUpperCase() : "U";
  };

  // Generate a consistent color based on email
  const getAvatarColor = (email) => {
    const colors = [
      "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500", 
      "bg-indigo-500", "bg-red-500", "bg-yellow-500", "bg-teal-500"
    ];
    const index = email ? email.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to={"/"} className="group">
            <h1 className="text-2xl font-bold text-gradient font-mono tracking-tight group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300">
              ThinkBoard
            </h1>
          </Link>
          <div className="flex items-center gap-6">
            {user && (
              <>
                <Link 
                  to={"/create"} 
                  className="btn-modern"
                >
                  <PlusIcon className="size-5" />
                  <span>New Note</span>
                </Link>
                <div className="flex items-center gap-3">
                  {/* Profile Avatar */}
                  <div className="relative group">
                    <div className={`w-10 h-10 rounded-full ${getAvatarColor(user.email)} flex items-center justify-center text-white font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group-hover:scale-105`}>
                      {getInitials(user.email)}
                    </div>
                    {/* Tooltip */}
                    <div className="absolute right-0 top-12 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {user.email}
                    </div>
                  </div>
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                    title="Logout"
                  >
                    <LogOut className="size-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
