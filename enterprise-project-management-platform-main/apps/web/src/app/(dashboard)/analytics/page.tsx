"use client";

import { BarChart3, TrendingUp, Users, CheckCircle2, Flame } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Analytics & Sprint Velocity</h1>
        <p className="text-xs text-slate-400 mt-1">Real-time team throughput, burndown trajectories, and workload distribution.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Average Velocity</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white">38.5 pts</p>
          <p className="text-xs text-emerald-400">+14% vs historical baseline</p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Sprint Completion</span>
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-bold text-white">94%</p>
          <p className="text-xs text-indigo-400">44 of 47 story points delivered</p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Lead Time</span>
            <Flame className="w-4 h-4 text-pink-400" />
          </div>
          <p className="text-2xl font-bold text-white">2.4 Days</p>
          <p className="text-xs text-pink-400">-0.6 days cycle time reduction</p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Team Workload</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-white">Balanced</p>
          <p className="text-xs text-cyan-400">Optimal allocation across 6 devs</p>
        </div>
      </div>

      {/* Velocity Visual Chart */}
      <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-base">Sprint Velocity Trend (Last 4 Sprints)</h3>
            <p className="text-xs text-slate-400">Commitment vs Completed story points per sprint cycle.</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { sprint: "Sprint 1", committed: 30, completed: 28 },
            { sprint: "Sprint 2", committed: 35, completed: 34 },
            { sprint: "Sprint 3", committed: 40, completed: 38 },
            { sprint: "Sprint 4 (Active)", committed: 45, completed: 42 }
          ].map((item) => (
            <div key={item.sprint} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-300">{item.sprint}</span>
                <span className="text-indigo-400">{item.completed} / {item.committed} pts</span>
              </div>
              <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                  style={{ width: `${(item.completed / 50) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
