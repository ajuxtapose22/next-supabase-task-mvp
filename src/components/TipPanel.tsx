"use client";

import { useState } from "react";

type TipPanelProps = {
  title: string;
  sql: string;
  code: string;
};

export default function TipPanel({ title, sql, code }: TipPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4 border rounded-2xl p-4 bg-gray-50 shadow-sm max-w-full">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between w-full font-semibold text-blue-600"
      >
        {title}
        <span>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="mt-3 text-sm space-y-4 overflow-x-auto">
          <div>
            <p className="font-semibold">SQL Example:</p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {sql}
            </pre>
          </div>
          <div>
            <p className="font-semibold">Client Code:</p>
            <pre className="bg-gray-900 text-purple-300 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {code}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
