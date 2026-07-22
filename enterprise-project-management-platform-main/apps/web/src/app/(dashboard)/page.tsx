import Link from "next/link";
import { FolderKanban, CheckCircle2, Clock, AlertTriangle, Sparkles, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/20 p-8">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-indigo-300">
            <Sparkles className="w-3.5 h-3.5" />
            Phase 8 Production Complete
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back, Jane</h1>
          <p className="text-sm text-slate-300 max-w-xl">
            AuroraPM Enterprise Suite is running. 12 active tasks across 3 projects, with AI assistance standing by.
          </p>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 blur-xl pointer-events-none">
          <div className="w-64 h-64 rounded-full bg-indigo-500" />
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Active Projects</span>
            <FolderKanban className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-bold text-white">4</p>
          <p className="text-xs text-emerald-400">+1 created this sprint</p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Sprint Velocity</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white">42 pts</p>
          <p className="text-xs text-emerald-400">12% increase vs Sprint 3</p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">In Progress Work</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-white">18 items</p>
          <p className="text-xs text-cyan-400">3 assigned to you</p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">AI Risk Alerts</span>
            <AlertTriangle className="w-4 h-4 text-pink-400" />
          </div>
          <p className="text-2xl font-bold text-white">0 High</p>
          <p className="text-xs text-slate-400">All sprints healthy</p>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/board" className="group p-6 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-indigo-500/50 transition-all space-y-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <FolderKanban className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-2">
              Kanban Board
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </h3>
            <p className="text-xs text-slate-400 mt-1">Drag and drop tasks across columns with WIP validation.</p>
          </div>
        </Link>

        <Link href="/analytics" className="group p-6 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/50 transition-all space-y-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
              Analytics & Velocity
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </h3>
            <p className="text-xs text-slate-400 mt-1">Burndown charts, team velocity, and cumulative flow diagrams.</p>
          </div>
        </Link>

        <Link href="/ai" className="group p-6 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-pink-500/50 transition-all space-y-4">
          <div className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white group-hover:text-pink-300 transition-colors flex items-center gap-2">
              Aurora AI Suite
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </h3>
            <p className="text-xs text-slate-400 mt-1">Auto task breakdown, story generation, AC checklist, and RAG assistant.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
