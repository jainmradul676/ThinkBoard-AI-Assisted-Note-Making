import { PlusIcon, LogOut, User, Sun, Moon, BookOpen, CheckSquare } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useDarkMode } from "../context/DarkModeContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();

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

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-700/60 shadow-sm sticky top-0 z-50">
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
                {/* Navigation Links */}
                <div className="flex items-center gap-4">
                  <Link 
                    to="/" 
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive('/') 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    <BookOpen className="size-4" />
                    <span>Notes</span>
                  </Link>
                  <Link 
                    to="/tasks" 
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive('/tasks') 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    <CheckSquare className="size-4" />
                    <span>Tasks</span>
                  </Link>
                </div>
                
                {/* Create Buttons */}
                <div className="flex items-center gap-2">
                  <Link 
                    to={"/create"} 
                    className="btn-modern text-sm"
                  >
                    <PlusIcon className="size-4" />
                    <span>New Note</span>
                  </Link>
                  <Link 
                    to={"/create-task"} 
                    className="btn-modern text-sm"
                  >
                    <PlusIcon className="size-4" />
                    <span>New Task</span>
                  </Link>
                </div>
                
                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                  title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {isDarkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
                </button>
                
                <div className="flex items-center gap-3">
                  {/* Profile Avatar */}
                  <div className="relative group">
                    <div className={`w-10 h-10 rounded-full ${getAvatarColor(user.email)} flex items-center justify-center text-white font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group-hover:scale-105`}>
                      {getInitials(user.email)}
                    </div>
                    {/* Tooltip */}
                    <div className="absolute right-0 top-12 bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-100 text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {user.email}
                    </div>
                  </div>
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
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
