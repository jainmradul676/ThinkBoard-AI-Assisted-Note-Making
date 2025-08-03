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
    <div>
      <Navbar />
      {isRateLimited && <RateLimitUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {notes.length === 0 && !loading && !isRateLimited && <NotesNotFound />}
        {loading && (
          <div className="text-center text-primary">Loading Notes....</div>
        )}
        {notes.length > 0 && !loading && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
