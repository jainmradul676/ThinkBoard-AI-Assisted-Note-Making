import express from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskItem,
  addTaskItem,
  removeTaskItem,
} from "../controllers/tasksController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication to all task routes
router.use(authenticateToken);

// Task CRUD routes
router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

// Task item management routes
router.post("/:id/items", addTaskItem);
router.put("/:id/items/toggle", toggleTaskItem);
router.delete("/:id/items", removeTaskItem);

export default router; 