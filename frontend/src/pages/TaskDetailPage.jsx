import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon, SaveIcon, Plus, X, CheckCircle2, Circle } from "lucide-react";

const TaskDetailPage = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Fetch task details by ID
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
        toast.error("Failed to fetch task details.");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted successfully!");
      navigate("/tasks");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };
  
  const handleSave = async () => {
    if (!task.title.trim()) {
      toast.error("Please write a title, it cannot be empty.");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/tasks/${id}`, task);
      toast.success("Task updated successfully!");
      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const toggleItem = async (itemIndex) => {
    try {
      const response = await api.put(`/tasks/${id}/items/toggle`, { itemIndex });
      setTask(response.data);
    } catch (error) {
      console.error("Error toggling item:", error);
      toast.error("Failed to update item. Please try again.");
    }
  };

  const addItem = async () => {
    if (!newItemText.trim()) return;
    
    try {
      const response = await api.post(`/tasks/${id}/items`, { text: newItemText.trim() });
      setTask(response.data);
      setNewItemText("");
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Failed to add item. Please try again.");
    }
  };

  const removeItem = async (itemIndex) => {
    try {
      const response = await api.delete(`/tasks/${id}/items`, { data: { itemIndex } });
      setTask(response.data);
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item. Please try again.");
    }
  };

  const updateItem = (itemIndex, text) => {
    const newItems = [...task.items];
    newItems[itemIndex].text = text;
    setTask({ ...task, items: newItems });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 text-gray-600 dark:text-gray-300">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-medium">Loading task...</span>
          </div>
        </div>
      </div>
    );
  }
  
  const completedItems = task.items.filter(item => item.completed).length;
  const totalItems = task.items.length;
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/tasks" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
          >
            <ArrowLeftIcon className="size-5" />
            Back to Tasks
          </Link>
          <button
            className="inline-flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium transition-all duration-200"
            onClick={handleDelete}
          >
            <Trash2Icon className="size-5" />
            Delete Task
          </button>
        </div>
        
        <div className="card-modern border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-primary px-8 py-6">
            <h2 className="text-3xl font-bold text-white">Edit Task</h2>
            <p className="text-blue-100 mt-2">Update your task and checklist</p>
          </div>
          
          <div className="p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Task Title
                </label>
                <input
                  type="text"
                  placeholder="Enter a descriptive title for your task..."
                  className="input-modern"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
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
                  value={task.description}
                  onChange={(e) => setTask({ ...task, description: e.target.value })}
                ></textarea>
              </div>

              {/* Progress Section */}
              {totalItems > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <span>Progress</span>
                    <span>{completedItems}/{totalItems} ({completionPercentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Task Items
                </label>
                
                {/* Existing Items */}
                <div className="space-y-3 mb-4">
                  {task.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <button
                        type="button"
                        onClick={() => toggleItem(index)}
                        className="flex-shrink-0"
                      >
                        {item.completed ? (
                          <CheckCircle2 className="size-5 text-green-500" />
                        ) : (
                          <Circle className="size-5 text-gray-400 hover:text-blue-500" />
                        )}
                      </button>
                      <input
                        type="text"
                        className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        value={item.text}
                        onChange={(e) => updateItem(index, e.target.value)}
                        style={{ textDecoration: item.completed ? 'line-through' : 'none', opacity: item.completed ? 0.6 : 1 }}
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-all duration-200"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add New Item */}
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Add a new task item..."
                    className="input-modern flex-1"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addItem()}
                  />
                  <button
                    type="button"
                    onClick={addItem}
                    className="btn-modern text-sm"
                    disabled={!newItemText.trim()}
                  >
                    <Plus className="size-4" />
                    Add
                  </button>
                </div>
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

export default TaskDetailPage; 