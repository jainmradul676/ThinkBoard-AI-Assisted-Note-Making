import mongoose from "mongoose";

const taskItemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Date,
    default: null,
  },
});

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    items: [taskItemSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate completion percentage
taskSchema.virtual('completionPercentage').get(function() {
  if (this.items.length === 0) return 0;
  const completedItems = this.items.filter(item => item.completed).length;
  return Math.round((completedItems / this.items.length) * 100);
});

// Update task completion status when items change
taskSchema.pre('save', function(next) {
  if (this.items.length > 0) {
    const allCompleted = this.items.every(item => item.completed);
    if (allCompleted && !this.completed) {
      this.completed = true;
      this.completedAt = new Date();
    } else if (!allCompleted && this.completed) {
      this.completed = false;
      this.completedAt = null;
    }
  }
  next();
});

const Task = mongoose.model("Task", taskSchema);

export default Task; 