import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon, SaveIcon } from "lucide-react";
api;

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Fetch note details by ID
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`);
        setNote(response.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to fetch note details.");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  // console.log({ note });

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note. Please try again.");
    }
  };
  
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please write Title and Content, they cannot be empty.");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note. Please try again.");
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 text-gray-600">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-medium">Loading note...</span>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
          >
            <ArrowLeftIcon className="size-5" />
            Back to Home
          </Link>
          <button
            className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-medium transition-all duration-200"
            onClick={handleDelete}
          >
            <Trash2Icon className="size-5" />
            Delete Note
          </button>
        </div>
        
        <div className="card-modern border border-gray-100 overflow-hidden">
          <div className="bg-gradient-primary px-8 py-6">
            <h2 className="text-3xl font-bold text-white">Edit Note</h2>
            <p className="text-blue-100 mt-2">Update your thoughts and ideas</p>
          </div>
          
          <div className="p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter a compelling title for your note..."
                  className="input-modern"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Content
                </label>
                <textarea
                  placeholder="Write your thoughts, ideas, or anything you want to remember..."
                  className="input-modern resize-none"
                  rows={16}
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                ></textarea>
              </div>
            </div>
            
            <div className="flex items-center justify-center pt-8">
              <button
                className="btn-modern disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={saving}
                onClick={handleSave}
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <SaveIcon className="size-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
