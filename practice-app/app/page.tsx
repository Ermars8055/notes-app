"use client";

import { useEffect, useState } from "react";

interface Note {
  _id: string;
  text: string;
  createdAt: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchNotes() {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setText("");
      await fetchNotes();
    } catch {
      setError("Could not save note. Check your MongoDB connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">My Notes</h1>
        <p className="text-gray-500 text-sm mb-8">
          Practice app — add a note, reload the page, confirm it&apos;s still here.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a note..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

        {/* Notes list */}
        {notes.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-12">
            No notes yet. Add one above.
          </p>
        ) : (
          <ul className="space-y-3">
            {notes.map((note) => (
              <li
                key={note._id}
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800"
              >
                <p>{note.text}</p>
                <p className="text-gray-400 text-xs mt-1">
                  {new Date(note.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
