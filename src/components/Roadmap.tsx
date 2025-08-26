"use client";

import { useState } from "react";
import TipPanel from "./TipPanel";

type Step = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  sql: string;
  code: string;
};

export default function Roadmap() {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: "create",
      title: "Create",
      description: "Insert rows into your Supabase table.",
      completed: false,
      sql: `INSERT INTO tasks (title, is_complete) VALUES ('Learn Supabase', false);`,
      code: `const { data, error } = await supabase.from('tasks').insert([{ title: 'Learn Supabase', is_complete: false }]);`,
    },
    {
      id: "read",
      title: "Read",
      description: "Query and display data (select).",
      completed: false,
      sql: `SELECT * FROM tasks WHERE is_complete = false;`,
      code: `const { data, error } = await supabase.from('tasks').select('*').eq('is_complete', false);`,
    },
    {
      id: "update",
      title: "Update",
      description: "Modify rows (update) and reflect changes in UI.",
      completed: false,
      sql: `UPDATE tasks SET is_complete = true WHERE id = 1;`,
      code: `const { data, error } = await supabase.from('tasks').update({ is_complete: true }).eq('id', 1);`,
    },
    {
      id: "delete",
      title: "Delete",
      description: "Remove rows safely (delete) and handle errors.",
      completed: false,
      sql: `DELETE FROM tasks WHERE id = 1;`,
      code: `const { error } = await supabase.from('tasks').delete().eq('id', 1);`,
    },
  ]);

  const toggleComplete = (id: string) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  const completedCount = steps.filter((s) => s.completed).length;
  const percent = Math.round((completedCount / steps.length) * 100);

  return (
    <section id="roadmap" className="py-16 bg-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">CRUD Roadmap</h2>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded h-4 overflow-hidden">
            <div
              style={{ width: `${percent}%` }}
              className="h-full bg-indigo-500 transition-all"
            />
          </div>
          <p className="mt-2 text-sm text-gray-600 text-center">{percent}% complete</p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`p-6 bg-white shadow-md rounded-2xl border transition ${
                step.completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
              }`}
            >
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-600 mt-2">{step.description}</p>

              {/* Tip Panel */}
              <TipPanel title="💡 Tip" sql={step.sql} code={step.code} />

              {/* Mark complete button */}
              <button
                onClick={() => toggleComplete(step.id)}
                className={`mt-4 px-4 py-2 rounded-lg font-medium transition w-full ${
                  step.completed
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {step.completed ? "Completed" : "Mark as Complete"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
