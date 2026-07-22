"use client";

import { useState } from "react";
import { GitPullRequest, GitBranch, ShieldAlert, Cpu, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";

export default function SpaceDevelopmentPage() {
  const [activeTab, setActiveTab] = useState("Pull requests");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Development & DevOps Insights</h1>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-[10px] font-bold text-purple-400">
              BETA
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time DORA metrics, repository pull request tracking, and code vulnerabilities.
          </p>
        </div>
      </div>

      {/* Metrics Row (Top 7 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">Work items</span>
          <p className="text-2xl font-bold text-white">4</p>
          <span className="text-[10px] text-slate-500 block">Completed this week</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">Pull request cycle time</span>
          <p className="text-2xl font-bold text-white">1.4 days</p>
          <span className="text-[10px] text-slate-500 block">Rolling 7-day median</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">Lead time for changes</span>
          <p className="text-2xl font-bold text-white">3.2 hrs</p>
          <span className="text-[10px] text-slate-500 block">Rolling 12-week average</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">Deployment frequency</span>
          <p className="text-2xl font-bold text-white">14 / wk</p>
          <span className="text-[10px] text-slate-500 block">Weekly average</span>
        </div>
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">Overdue Items</span>
          <p className="text-xl font-bold text-emerald-400">0</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">Open PRs</span>
          <p className="text-xl font-bold text-indigo-400">2</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">Open Bugs</span>
          <p className="text-xl font-bold text-amber-400">1</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-1">
          <span className="text-[11px] font-semibold text-slate-400">Vulnerabilities</span>
          <p className="text-xl font-bold text-emerald-400">0 Critical</p>
        </div>
      </div>

      {/* Related Work Sub-Tabs & Content */}
      <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white">Related work</h3>
          <div className="flex items-center gap-2">
            {["Pull requests", "Repositories", "Vulnerabilities", "Deployments"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Illustration */}
        <div className="p-8 rounded-xl bg-slate-950 border border-slate-800/80 text-center space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto">
            <GitPullRequest className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Connect your code tools to AuroraPM</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Minimize context switching and gain visibility of your team's pull requests and development workflow in Jira/AuroraPM.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-emerald-400">
            git commit -m "AUR-102 Add Spring AI Gemini strategy"
          </div>
        </div>
      </div>
    </div>
  );
}
