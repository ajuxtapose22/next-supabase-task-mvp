"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import AddTask from "./AddTask";

type Task = {
  id: string;
  title: string;
  is_complete: boolean;
  inserted_at?: string;
};

export default function TaskSection() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const { data, error } = await supabase
      .from<Task>("tasks")
      .select("*")
      .order("inserted_at", { ascending: false });

    if (error) {
      console.error("fetchTasks error:", error);
      return;
    }
    setTasks(data || []);
  }

  async function toggleComplete(id: string, current: boolean) {
    const { error } = await supabase.from("tasks").update({ is_complete: !current }).eq("id", id);
    if (error) console.error("toggle error:", error);
    fetchTasks();
  }

  async function deleteTask(id: string) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) console.error("delete error:", error);
    fetchTasks();
  }

  return (
    <section id="tasks" className="max-w-2xl mx-auto py-16 px-4">
      <h2 className="text-2xl font-semibold mb-6">Your Tasks</h2>

      <AddTask onTaskAdded={(task) => setTasks((prev) => [task, ...prev])} />

      <ul className="mt-6 space-y-3">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between p-3 bg-white rounded shadow">
            <span
              onClick={() => toggleComplete(task.id, task.is_complete)}
              className={`cursor-pointer ${task.is_complete ? "line-through text-gray-500" : ""}`}
            >
              {task.title}
            </span>

            <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700">
              🗑
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
