import mongoose from "mongoose";

// 1 - Define the schema for a Note
// 2 - Model based on that schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
// Export the Note model for use in other parts of the application
