"use client";

import { useState } from "react";
import { Search, Plus, Calendar, Filter, ChevronDown } from "lucide-react";

export default function SpaceTimelinePage() {
  const [viewMode, setViewMode] = useState<"Today" | "Weeks" | "Months" | "Quarters">("Months");
  const [newTitle, setNewTitle] = useState("");

  const roadmapItems = [
    { id: "AUR-1", title: "Aurora AI Gemini Engine Strategy", startCol: 1, spanCol: 2, color: "bg-indigo-600" },
    { id: "AUR-2", title: "Multi-Tenant RBAC & Security Context", startCol: 2, spanCol: 2, color: "bg-emerald-600" },
    { id: "AUR-3", title: "MinIO S3 File Upload Pipeline", startCol: 3, spanCol: 1, color: "bg-purple-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Filter & View Mode Header */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3 flex-1 max-w-lg">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search timeline..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:border-slate-700">
            <span>Status category</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Timeline Zoom Controls */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl shrink-0">
          {(["Today", "Weeks", "Months", "Quarters"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                viewMode === mode
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Gantt Timeline Board Grid */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden grid grid-cols-12 min-h-[480px]">
        {/* Left Column: Work Items Column (3 cols) */}
        <div className="col-span-3 border-r border-slate-800 p-4 space-y-4 bg-slate-900/80">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Work Item</h3>

          {/* Quick Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-3 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <Plus className="w-4 h-4 text-indigo-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="space-y-3 pt-2">
            {roadmapItems.map((item) => (
              <div key={item.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs font-medium text-slate-200 truncate">
                <span className="text-indigo-400 font-bold mr-2">{item.id}</span>
                {item.title}
              </div>
            ))}
          </div>
        </div>

        {/* Right Canvas: Timeline Gantt View (9 cols) */}
        <div className="col-span-9 grid grid-cols-3 relative">
          {/* Months Headers */}
          <div className="border-r border-slate-800 p-3 text-center text-xs font-bold text-slate-400 bg-slate-900">
            July
          </div>
          <div className="border-r border-slate-800 p-3 text-center text-xs font-bold text-slate-400 bg-slate-900">
            August
          </div>
          <div className="p-3 text-center text-xs font-bold text-slate-400 bg-slate-900">
            September
          </div>

          {/* Vertical Current Day Indicator Line */}
          <div className="absolute top-10 bottom-0 left-[33%] w-0.5 bg-indigo-500 shadow-[0_0_10px_#6366f1] pointer-events-none z-10" />

          {/* Roadmap Bars Container */}
          <div className="col-span-3 p-4 space-y-6 pt-8">
            <div className="h-9 rounded-lg bg-indigo-600/30 border border-indigo-500/50 p-2 text-xs font-semibold text-indigo-200 flex items-center shadow-lg transform translate-x-4">
              ✨ Sprint 4 Roadmap Execution
            </div>

            <div className="h-9 rounded-lg bg-emerald-600/30 border border-emerald-500/50 p-2 text-xs font-semibold text-emerald-200 flex items-center shadow-lg transform translate-x-24">
              🚀 Multi-tenant RBAC Rollout
            </div>

            <div className="h-9 rounded-lg bg-purple-600/30 border border-purple-500/50 p-2 text-xs font-semibold text-purple-200 flex items-center shadow-lg transform translate-x-48">
              📁 MinIO S3 Attachments Flow
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
