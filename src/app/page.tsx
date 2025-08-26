"use client";

import Hero from "../components/Hero";
import Roadmap from "../components/Roadmap";
import TaskSection from "../components/TaskSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <Hero />
      <Roadmap />
      <TaskSection />
    </main>
  );
}
