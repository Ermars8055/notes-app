import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
  },
  { timestamps: true }
);

// Guard against re-compiling the model on hot-reload
const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema);

export default Note;
