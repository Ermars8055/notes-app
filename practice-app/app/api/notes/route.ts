import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import Note from "@/models/Note";

// GET /api/notes — return all notes
export async function GET() {
  await dbConnect();
  const notes = await Note.find().sort({ createdAt: -1 });
  return NextResponse.json(notes);
}

// POST /api/notes — create a new note
export async function POST(req: Request) {
  await dbConnect();
  const { text } = await req.json();
  if (!text || text.trim() === "") {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }
  const note = await Note.create({ text: text.trim() });
  return NextResponse.json(note, { status: 201 });
}
