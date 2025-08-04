import { PlusIcon, LogOut, User } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
              ThinkBoard
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            {user && (
              <>
                <Link to={"/create"} className="btn btn-primary btn-outline">
                  <PlusIcon className="size-5" />
                  <span>New Note</span>
                </Link>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="size-4" />
                    <span className="text-base-content/80">{user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn btn-ghost btn-sm"
                    title="Logout"
                  >
                    <LogOut className="size-4" />
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
