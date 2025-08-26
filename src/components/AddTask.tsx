"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface Task {
  id: string;
  title: string;
  is_complete: boolean;
  inserted_at?: string;
}

interface AddTaskProps {
  onTaskAdded: (task: Task) => void;
}

export default function AddTask({ onTaskAdded }: AddTaskProps) {
  const [title, setTitle] = useState("");

  async function handleAdd() {
    const trimmed = title.trim();
    if (!trimmed) return;

    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title: trimmed }])
      .select();

    if (!error && data?.length) {
      onTaskAdded(data[0] as Task);
      setTitle("");
    }
  }

  return (
    <div className="flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        className="flex-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
      >
        Add
      </button>
    </div>
  );
}
