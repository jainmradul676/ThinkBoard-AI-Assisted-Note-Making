import { ArrowLeftIcon } from "lucide-react";
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
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-4 mr-2" />
            Back To Home
          </Link>
          <div className="card bg-base-100 mx-40 mt-10">
            <div className="card-body p-17">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-10">
                  <label className="label">
                    <span className="label-text font-bold text-lg">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-bold text-lg">
                      Content
                    </span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
                <div className="card-actions justify-center mt-6">
                  <button
                    type="submit"
                    className="btn btn-success text-lg font-bold"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
