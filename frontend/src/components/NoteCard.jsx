import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import toast from "react-hot-toast";
import api from "../lib/axios";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      toast.success("Note Deleted Successfully!");
    } catch (error) {
      toast.error("Failed to delete note. Please try again.");
      console.error("Error deleting note:", error);
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="group block"
    >
      <div className="card-modern border border-gray-100 hover:border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
              {note.title}
            </h3>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <PenSquareIcon className="size-4 text-blue-500 hover:text-blue-700 transition-colors" />
              <button 
                className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-all duration-200"
                onClick={(e) => handleDelete(e, note._id)}
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
          
          <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
            {note.content}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500 font-medium">
              {formatDate(note.createdAt)}
            </span>
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </div>
        
        {/* Gradient accent line */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      </div>
    </Link>
  );
};

export default NoteCard;
