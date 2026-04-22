import Note from "../models/Note.js";

function validateNotePayload(body) {
  const title = body?.title?.toString().trim();
  const content = body?.content?.toString().trim();

  if (!title || !content) {
    return { error: "Title and content are required." };
  }

  return { title, content };
}

export async function getAllNotes(_req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json(note);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid note id" });
    }
    console.error("Error in getNoteById controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const payload = validateNotePayload(req.body);
    if (payload.error) {
      return res.status(400).json({ message: payload.error });
    }

    const newNote = new Note(payload);
    const savedNote = await newNote.save();
    return res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const payload = validateNotePayload(req.body);
    if (payload.error) {
      return res.status(400).json({ message: payload.error });
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res
      .status(200)
      .json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid note id" });
    }
    console.error("Error in updateNote controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid note id" });
    }
    console.error("Error in deleteNote controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
