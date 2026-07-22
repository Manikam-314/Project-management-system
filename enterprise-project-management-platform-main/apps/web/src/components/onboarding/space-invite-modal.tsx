"use client";

import { useState } from "react";
import { Link2, Check, UserPlus, Sparkles, X, ArrowRight } from "lucide-react";

interface SpaceInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  spaceName?: string;
  shareUrl?: string;
}

export function SpaceInviteModal({
  isOpen,
  onClose,
  spaceName = "My Software Team",
  shareUrl = "http://localhost:3000/join/team-space-94102"
}: SpaceInviteModalProps) {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
  const [sending, setSending] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInviteEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSending(true);
    setTimeout(() => {
      setInvitedEmails((prev) => [...prev, email]);
      setEmail("");
      setSending(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Form Controls */}
        <div className="md:col-span-7 p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                AuroraPM is better when used together
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                AuroraPM works better with your team onboard. Invite a teammate to try out <span className="font-semibold text-indigo-400">{spaceName}</span> with you.
              </p>
            </div>

            {/* Share Via Link Section */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                Share via link
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-3 pr-8 py-2 text-xs text-slate-300 focus:outline-none select-all"
                  />
                  <Link2 className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-all shrink-0 active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="w-3.5 h-3.5" />
                      <span>Copy link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Invite Via Email Form */}
            <form onSubmit={handleInviteEmail} className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                Invite via email
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="e.g. maria@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                />
                <button
                  type="submit"
                  disabled={sending || !email}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold transition-all shrink-0"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  {sending ? "Sending..." : "Invite"}
                </button>
              </div>
            </form>

            {/* Invited Members Badges */}
            {invitedEmails.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400">Invited teammates:</span>
                <div className="flex flex-wrap gap-1.5">
                  {invitedEmails.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[11px] font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <p className="text-[10px] text-slate-500 leading-normal pt-1">
              This space is protected by enterprise RBAC. By inviting team members, you grant workspace view and issue contribution access.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
            >
              Do this later
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
            >
              Go to AuroraPM
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Visual Space Illustration Preview Card */}
        <div className="md:col-span-5 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900/60 p-6 flex flex-col justify-center items-center border-l border-slate-800/80 relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

          {/* Graphic Card Preview */}
          <div className="w-full max-w-[240px] bg-slate-900 border border-slate-700/70 rounded-xl p-4 shadow-2xl space-y-4 transform rotate-1 hover:rotate-0 transition-transform duration-300">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-xs font-bold text-white truncate max-w-[120px]">{spaceName}</h4>
                <div className="flex items-center gap-2 text-[9px] text-slate-400 mt-0.5">
                  <span className="text-indigo-400 font-semibold">Board</span>
                  <span>List</span>
                  <span>Timeline</span>
                </div>
              </div>

              {/* Team Avatars Stack */}
              <div className="flex items-center -space-x-1.5">
                <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-[9px] font-bold text-white ring-2 ring-slate-900">
                  J
                </div>
                <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-[9px] font-bold text-white ring-2 ring-slate-900">
                  M
                </div>
                <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-[9px] font-bold text-white ring-2 ring-slate-900">
                  +
                </div>
              </div>
            </div>

            {/* Mini Kanban Columns Preview */}
            <div className="grid grid-cols-3 gap-2 text-[9px]">
              <div className="bg-slate-950 p-2 rounded border border-slate-800 space-y-1.5">
                <span className="font-bold text-slate-400 uppercase text-[8px]">TO DO</span>
                <div className="h-1.5 bg-indigo-500/40 rounded w-3/4" />
                <div className="h-1.5 bg-slate-700 rounded w-1/2" />
              </div>

              <div className="bg-slate-950 p-2 rounded border border-slate-800 space-y-1.5">
                <span className="font-bold text-slate-400 uppercase text-[8px]">IN PROGRESS</span>
                <div className="h-1.5 bg-emerald-500/40 rounded w-5/6" />
                <div className="h-1.5 bg-slate-700 rounded w-2/3" />
              </div>

              <div className="bg-slate-950 p-2 rounded border border-slate-800 space-y-1.5">
                <span className="font-bold text-slate-400 uppercase text-[8px]">DONE</span>
                <div className="h-1.5 bg-cyan-500/40 rounded w-full" />
                <div className="h-1.5 bg-slate-700 rounded w-1/3" />
              </div>
            </div>

            <div className="flex items-center gap-1.5 pt-1 text-[10px] font-semibold text-indigo-300">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>Real-time collaboration active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
