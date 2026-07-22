"use client";

import { useState } from "react";
import { 
  CheckCircle2, Clock, PlusCircle, AlertCircle, Sparkles, X, 
  BarChart3, PieChart, Layers, ShieldCheck, ChevronRight, UserPlus 
} from "lucide-react";
import { SpaceInviteModal } from "@/components/onboarding/space-invite-modal";

export default function SpaceSummaryPage() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      {!bannerDismissed && (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/30 p-5 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4 z-10">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Customize your Reports view to suit your space.</h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Head to the Reports tab to easily customize charts and widgets for a dashboard tailored to your space.
              </p>
            </div>
          </div>
          <button
            onClick={() => setBannerDismissed(true)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />
        </div>
      )}

      {/* Main Grid: Stats & Summary vs Quickstart Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 7-Day Metrics & Breakdown Cards */}
        <div className="lg:col-span-8 space-y-6">
          {/* 4 Stat Cards Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>completed</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold text-white">3</p>
              <span className="text-[10px] text-slate-400 block">in the last 7 days</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>updated</span>
                <Clock className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-2xl font-bold text-white">12</p>
              <span className="text-[10px] text-slate-400 block">in the last 7 days</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>created</span>
                <PlusCircle className="w-4 h-4 text-indigo-400" />
              </div>
              <p className="text-2xl font-bold text-white">8</p>
              <span className="text-[10px] text-slate-400 block">in the last 7 days</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>due soon</span>
                <AlertCircle className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-bold text-white">2</p>
              <span className="text-[10px] text-slate-400 block">in the next 7 days</span>
            </div>
          </div>

          {/* Status Overview Card */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Status overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 block">TO DO</span>
                <p className="text-lg font-bold text-indigo-400 mt-1">4 items</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 block">IN PROGRESS</span>
                <p className="text-lg font-bold text-emerald-400 mt-1">2 items</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 block">IN REVIEW</span>
                <p className="text-lg font-bold text-amber-400 mt-1">1 item</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 block">DONE</span>
                <p className="text-lg font-bold text-cyan-400 mt-1">3 items</p>
              </div>
            </div>
          </div>

          {/* Priority Breakdown & Work Types Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white">Priority breakdown</h4>
                <BarChart3 className="w-4 h-4 text-indigo-400" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Get a holistic view of how work is being prioritized across your team.
              </p>
              <div className="space-y-2 pt-2">
                <div>
                  <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                    <span>High / Urgent</span>
                    <span className="font-bold text-pink-400">40%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-500 rounded-full w-[40%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                    <span>Medium</span>
                    <span className="font-bold text-amber-400">45%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full w-[45%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white">Types of work</h4>
                <PieChart className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Create work items to view a breakdown of total work by work type.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                  Story (60%)
                </span>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                  Task (30%)
                </span>
                <span className="px-2.5 py-1 rounded bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold">
                  Bug (10%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Quickstart Wizard Checklist */}
        <div className="lg:col-span-4 p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="font-bold text-sm text-white">Quickstart</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              3 of 6 Done
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <h4 className="text-xs font-bold text-white">Break down your work</h4>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed pl-6">
                Like a spreadsheet (but better), the list helps you simplify features, bugs, and initiatives.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <h4 className="text-xs font-bold text-white">View progress at a glance</h4>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <h4 className="text-xs font-bold text-white">Centralize your docs</h4>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                <h4 className="text-xs font-bold text-slate-300">Streamline ad hoc requests</h4>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                <h4 className="text-xs font-bold text-slate-300">Visualize dependencies</h4>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                  <h4 className="text-xs font-bold text-slate-300">Invite your team</h4>
                </div>
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold"
                >
                  Invite
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SpaceInviteModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
      />
    </div>
  );
}
