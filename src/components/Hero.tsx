"use client";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-5xl font-bold mb-4">Task Manager</h1>
      <p className="text-lg mb-6">A simple way to practice Supabase + Next.js CRUD</p>

      <div className="flex gap-3">
        <a href="#roadmap">
          <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition">
            Roadmap
          </button>
        </a>

        <a href="#tasks">
          <button className="px-6 py-3 bg-white/20 text-white font-semibold rounded-lg shadow hover:bg-white/30 transition">
            Go to Tasks
          </button>
        </a>
      </div>
    </section>
  );
}
