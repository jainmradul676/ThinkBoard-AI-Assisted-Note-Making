import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import RateLimitUI from "../components/RateLimitUI";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        // console.log(res.data.length, "notes fetched");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error(
            "Failed to fetch and load notes. Please try again later."
          );
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      {isRateLimited && <RateLimitUI />}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {notes.length === 0 && !loading && !isRateLimited && <NotesNotFound />}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg font-medium">Loading your notes...</span>
              </div>
            </div>
          </div>
        )}
        {notes.length > 0 && !loading && !isRateLimited && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Your Notes
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {notes.length} note{notes.length !== 1 ? 's' : ''} in your collection
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
