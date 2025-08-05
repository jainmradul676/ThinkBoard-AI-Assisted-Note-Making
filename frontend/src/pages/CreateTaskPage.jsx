import { ArrowLeftIcon, SaveIcon, Plus, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreateTaskPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([{ text: "", completed: false }]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required.");
      return;
    }
    
    // Filter out empty items
    const validItems = items.filter(item => item.text.trim());
    if (validItems.length === 0) {
      toast.error("At least one task item is required.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/tasks", {
        title: title.trim(),
        description: description.trim(),
        items: validItems,
      });
      toast.success("Task Created Successfully!");
      navigate("/tasks");
    } catch (error) {
      if (error.response && error.response.status === 429) {
        toast.error("Please slow down, you are creating tasks too fast!", {
          duration: 3000,
          icon: "⚠️",
        });
      } else {
        toast.error("Failed to create task. Please try again.");
        console.error("Error creating task:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const addItem = () => {
    setItems([...items, { text: "", completed: false }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index, text) => {
    const newItems = [...items];
    newItems[index].text = text;
    setItems(newItems);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link 
            to="/tasks" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
          >
            <ArrowLeftIcon className="size-5" />
            Back to Tasks
          </Link>
        </div>
        
        <div className="card-modern border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-primary px-8 py-6">
            <h2 className="text-3xl font-bold text-white">Create New Task</h2>
            <p className="text-blue-100 mt-2">Organize your work with checklists</p>
          </div>
          
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Task Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter a descriptive title for your task..."
                  className="input-modern"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Description
                </label>
                <textarea
                  placeholder="Add a description for your task (optional)..."
                  className="input-modern resize-none"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Task Items *
                </label>
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder={`Task item ${index + 1}...`}
                          className="input-modern"
                          value={item.text}
                          onChange={(e) => updateItem(index, e.target.value)}
                          required
                        />
                      </div>
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                        >
                          <X className="size-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addItem}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-medium transition-all duration-200"
                >
                  <Plus className="size-4" />
                  Add Item
                </button>
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
                      Create Task
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

export default CreateTaskPage; 