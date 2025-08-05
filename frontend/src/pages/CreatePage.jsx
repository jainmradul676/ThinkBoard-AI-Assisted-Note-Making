import { ArrowLeftIcon, SaveIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and Content both fields are required.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note Created Successfully!");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 429) {
        toast.error("Please slow down, you are creating notes too fast!", {
          duration: 3000,
          icon: "⚠️",
        });
      } else {
        toast.error("Failed to create note. Please try again.");
        console.error("Error creating note:", error);
      }
    } finally {
      setLoading(false);
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
          >
            <ArrowLeftIcon className="size-5" />
            Back to Home
          </Link>
        </div>
        
        <div className="card-modern border border-gray-100 overflow-hidden">
          <div className="bg-gradient-primary px-8 py-6">
            <h2 className="text-3xl font-bold text-white">Create New Note</h2>
            <p className="text-blue-100 mt-2">Capture your thoughts and ideas</p>
          </div>
          
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter a compelling title for your note..."
                  className="input-modern"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Content
                </label>
                <textarea
                  placeholder="Write your thoughts, ideas, or anything you want to remember..."
                  className="input-modern resize-none"
                  rows={12}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
              
              <div className="flex items-center justify-center pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-modern disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <SaveIcon className="size-5" />
                      Create Note
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
