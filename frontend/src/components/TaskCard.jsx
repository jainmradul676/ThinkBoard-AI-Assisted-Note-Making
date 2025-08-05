import { CheckCircle2, Circle, Trash2Icon, PenSquareIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import toast from "react-hot-toast";
import api from "../lib/axios";

const TaskCard = ({ task, setTasks }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      toast.success("Task Deleted Successfully!");
    } catch (error) {
      toast.error("Failed to delete task. Please try again.");
      console.error("Error deleting task:", error);
    }
  };

  const completedItems = task.items.filter(item => item.completed).length;
  const totalItems = task.items.length;
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <Link
      to={`/task/${task._id}`}
      className="group block"
    >
      <div className="card-modern border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                {task.title}
              </h3>
              {task.description && (
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-2">
              <PenSquareIcon className="size-4 text-blue-500 hover:text-blue-700 transition-colors" />
              <button 
                className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-all duration-200"
                onClick={(e) => handleDelete(e, task._id)}
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          {totalItems > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>Progress</span>
                <span>{completedItems}/{totalItems} ({completionPercentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* Sample Items Preview */}
          {task.items.length > 0 && (
            <div className="space-y-2 mb-4">
              {task.items.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  {item.completed ? (
                    <CheckCircle2 className="size-4 text-green-500" />
                  ) : (
                    <Circle className="size-4 text-gray-400" />
                  )}
                  <span className={`text-gray-600 dark:text-gray-300 ${item.completed ? 'line-through opacity-60' : ''}`}>
                    {item.text}
                  </span>
                </div>
              ))}
              {task.items.length > 3 && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  +{task.items.length - 3} more items
                </div>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {formatDate(task.createdAt)}
            </span>
            <div className="flex items-center gap-2">
              {task.completed && (
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              )}
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Gradient accent line */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      </div>
    </Link>
  );
};

export default TaskCard; 