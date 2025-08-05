import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import RateLimitUI from "../components/RateLimitUI";
import toast from "react-hot-toast";
import TaskCard from "../components/TaskCard";
import api from "../lib/axios";
import { CheckSquare, Plus } from "lucide-react";
import { Link } from "react-router";

const TasksPage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error(
            "Failed to fetch and load tasks. Please try again later."
          );
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      {isRateLimited && <RateLimitUI />}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {tasks.length === 0 && !loading && !isRateLimited && (
          <div className="flex flex-col items-center justify-center py-20 space-y-8 max-w-lg mx-auto text-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full p-8 shadow-lg">
                <CheckSquare className="size-12 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">No tasks yet</h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Ready to get organized? Create your first task list to start managing your projects.
              </p>
            </div>
            <Link 
              to="/create-task" 
              className="btn-modern"
            >
              <Plus className="size-5" />
              Create Your First Task
            </Link>
          </div>
        )}
        
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg font-medium">Loading your tasks...</span>
              </div>
            </div>
          </div>
        )}
        
        {tasks.length > 0 && !loading && !isRateLimited && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Your Tasks
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {tasks.length} task{tasks.length !== 1 ? 's' : ''} in your collection
              </p>
            </div>
            
            {/* Pending Tasks */}
            {pendingTasks.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Pending Tasks ({pendingTasks.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {pendingTasks.map((task) => (
                    <TaskCard key={task._id} task={task} setTasks={setTasks} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Completed Tasks ({completedTasks.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {completedTasks.map((task) => (
                    <TaskCard key={task._id} task={task} setTasks={setTasks} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage; 