import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  // res.status(200).json({ message: "We fetched all the Notes." });
  try {
    const notes = await Note.find({ user: req.user.userId }).sort({ createdAt: -1 }); // Sort by creation date, most recent first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes through notes controller:", error);
    res
      .status(500)
      .json({ message: "Internal server error, failed to fetch notes" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.userId });
    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }
    res.status(200).json(note);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, failed to fetch note by ID" });
    // Log the error
    console.error("Error fetching note by ID through notes controller:", error);
  }
};

export const createNote = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing." });
    }
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required." });
    }
    const newNote = new Note({ title, content, user: req.user.userId });
    const savedNote = await newNote.save();
    res
      .status(201)
      .json({ message: "Note Created Successfully!", createdNote: savedNote });
  } catch (error) {
    console.error("Error creating note through notes controller:", error);
    res
      .status(500)
      .json({ message: "Internal server error, failed to create note" });
  }
};

export const updateNote = async (req, res) => {
  // res.status(201).json({ message: "Note Updated Successfully!" });
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required." });
    }
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found." });
    }
    res.status(200).json({ message: "Note Updated Successfully!" });
  } catch (error) {
    console.error("Error updating note through notes controller:", error);
    res
      .status(500)
      .json({ message: "Internal server error, failed to update note" });
  }
};

export const deleteNote = async (req, res) => {
  // res.status(201).json({ message: "Note Deleted Successfully!" });
  try {
    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found." });
    }
    res.status(200).json({ message: "Note Deleted Successfully!" });
  } catch (error) {
    console.error("Error deleting note through notes controller:", error);
    res
      .status(500)
      .json({ message: "Internal server error, failed to delete note" });
  }
};
