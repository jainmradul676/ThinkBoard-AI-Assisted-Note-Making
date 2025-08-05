import Task from "../models/Task.js";
import { rateLimit } from "express-rate-limit";

// Rate limiting for task operations
const taskRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many task operations, please try again later.",
});

// Get all tasks for the authenticated user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// Get a single task by ID
export const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Failed to fetch task" });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, items } = req.body;
    
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = new Task({
      title: title.trim(),
      description: description?.trim() || "",
      items: items || [],
      user: req.user.userId,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { title, description, items } = req.body;
    
    const task = await Task.findOne({ _id: req.params.id, user: req.user.userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description.trim();
    if (items !== undefined) task.items = items;

    await task.save();
    res.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};

// Toggle task item completion
export const toggleTaskItem = async (req, res) => {
  try {
    const { itemIndex } = req.body;
    
    const task = await Task.findOne({ _id: req.params.id, user: req.user.userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (itemIndex < 0 || itemIndex >= task.items.length) {
      return res.status(400).json({ message: "Invalid item index" });
    }

    const item = task.items[itemIndex];
    item.completed = !item.completed;
    item.completedAt = item.completed ? new Date() : null;

    await task.save();
    res.json(task);
  } catch (error) {
    console.error("Error toggling task item:", error);
    res.status(500).json({ message: "Failed to toggle task item" });
  }
};

// Add a new item to a task
export const addTaskItem = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Item text is required" });
    }

    const task = await Task.findOne({ _id: req.params.id, user: req.user.userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.items.push({
      text: text.trim(),
      completed: false,
    });

    await task.save();
    res.json(task);
  } catch (error) {
    console.error("Error adding task item:", error);
    res.status(500).json({ message: "Failed to add task item" });
  }
};

// Remove an item from a task
export const removeTaskItem = async (req, res) => {
  try {
    const { itemIndex } = req.body;
    
    const task = await Task.findOne({ _id: req.params.id, user: req.user.userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (itemIndex < 0 || itemIndex >= task.items.length) {
      return res.status(400).json({ message: "Invalid item index" });
    }

    task.items.splice(itemIndex, 1);
    await task.save();
    res.json(task);
  } catch (error) {
    console.error("Error removing task item:", error);
    res.status(500).json({ message: "Failed to remove task item" });
  }
};

export { taskRateLimit }; 