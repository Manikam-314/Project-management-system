"use client";

import { useState } from "react";
import { 
  X, Sparkles, Paperclip, Check, AlertTriangle, Calendar, User, 
  Tag, Link2, Shield, Layers, HelpCircle, Bold, Italic, Code, List 
} from "lucide-react";

interface CreateIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIssueCreated?: (issue: any) => void;
}

export function CreateIssueModal({ isOpen, onClose, onIssueCreated }: CreateIssueModalProps) {
  const [space, setSpace] = useState("My Software Team1 (KAN)");
  const [workType, setWorkType] = useState("Task");
  const [status, setStatus] = useState("TO DO");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [labels, setLabels] = useState<string[]>(["frontend"]);
  const [newLabelInput, setNewLabelInput] = useState("");
  const [team, setTeam] = useState("My Software Team");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reporter, setReporter] = useState("Manikam S");
  const [priority, setPriority] = useState("Medium");
  const [assignee, setAssignee] = useState("Unassigned");
  const [parent, setParent] = useState("");
  const [linkedRelation, setLinkedRelation] = useState("blocks");
  const [linkedUrl, setLinkedUrl] = useState("");
  const [flagged, setFlagged] = useState(false);
  const [createAnother, setCreateAnother] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAddLabel = () => {
    if (!newLabelInput.trim()) return;
    setLabels([...labels, newLabelInput.trim()]);
    setNewLabelInput("");
  };

  const handleAssignToMe = () => {
    setAssignee("Manikam S");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary.trim()) return;

    setSubmitting(true);
    const newIssue = {
      id: `AUR-${Math.floor(Math.random() * 900 + 100)}`,
      space,
      workType,
      status,
      summary,
      description,
      labels,
      team,
      startDate,
      dueDate,
      reporter,
      priority,
      assignee,
      parent,
      flagged,
    };

    setTimeout(() => {
      if (onIssueCreated) onIssueCreated(newIssue);
      setSubmitting(false);

      if (!createAnother) {
        onClose();
      } else {
        setSummary("");
        setDescription("");
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <h2 className="text-base font-bold text-white">New issue</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Space & Work Type Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Space *</label>
              <select
                value={space}
                onChange={(e) => setSpace(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="My Software Team1 (KAN)">My Software Team1 (KAN)</option>
                <option value="Team Astro (AST)">Team Astro (AST)</option>
                <option value="Front-End Dev (FED)">Front-End Dev (FED)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Work type *</label>
              <select
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Task">Task</option>
                <option value="Story">Story</option>
                <option value="Feature">Feature</option>
                <option value="Request">Request</option>
                <option value="Bug">Bug</option>
              </select>
            </div>
          </div>

          {/* Status & Priority Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Status *</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="TO DO">TO DO</option>
                <option value="IN PROGRESS">IN PROGRESS</option>
                <option value="IN REVIEW">IN REVIEW</option>
                <option value="DONE">DONE</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Summary * */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Summary *</label>
            <input
              type="text"
              required
              placeholder="e.g. Implement Spring Security CORS Policy"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Description with Formatting Toolbar */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-300">Description</label>
              <span className="text-[10px] text-indigo-400 flex items-center gap-1 font-semibold">
                <Sparkles className="w-3 h-3" />
                Type /ai to Ask Aurora AI
              </span>
            </div>

            <div className="border border-slate-800 rounded-lg bg-slate-950 overflow-hidden">
              <div className="px-3 py-1.5 border-b border-slate-800 bg-slate-900/60 flex items-center gap-2 text-slate-400">
                <button type="button" className="p-1 hover:text-white rounded"><Bold className="w-3.5 h-3.5" /></button>
                <button type="button" className="p-1 hover:text-white rounded"><Italic className="w-3.5 h-3.5" /></button>
                <button type="button" className="p-1 hover:text-white rounded"><Code className="w-3.5 h-3.5" /></button>
                <button type="button" className="p-1 hover:text-white rounded"><List className="w-3.5 h-3.5" /></button>
              </div>
              <textarea
                rows={4}
                placeholder="Add rich description or accept criteria..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-transparent p-3 text-xs text-white placeholder-slate-500 focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Assignee & Reporter Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-300">Assignee</label>
                <button
                  type="button"
                  onClick={handleAssignToMe}
                  className="text-[10px] text-indigo-400 hover:underline font-semibold"
                >
                  Assign to me
                </button>
              </div>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Unassigned">Automatic (Unassigned)</option>
                <option value="Manikam S">Manikam S</option>
                <option value="Jane Doe">Jane Doe</option>
                <option value="Alex Smith">Alex Smith</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Reporter *</label>
              <input
                type="text"
                readOnly
                value={reporter}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none select-none opacity-80"
              />
            </div>
          </div>

          {/* Start Date & Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Start date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Due date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* File Attachments Drop Zone */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Attachment</label>
            <div className="border-2 border-dashed border-slate-800 rounded-xl p-4 text-center bg-slate-950 hover:border-indigo-500/50 transition-colors cursor-pointer space-y-1">
              <Paperclip className="w-5 h-5 text-slate-500 mx-auto" />
              <p className="text-xs text-slate-400 font-medium">Drop files to attach or <span className="text-indigo-400 underline">Browse</span></p>
            </div>
          </div>

          {/* Flagged Impediment Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="flagged"
              checked={flagged}
              onChange={(e) => setFlagged(e.target.checked)}
              className="rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0"
            />
            <label htmlFor="flagged" className="font-semibold text-slate-300 cursor-pointer flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Flagged (Impediment)
            </label>
          </div>

          {/* Bottom Footer Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="createAnother"
                checked={createAnother}
                onChange={(e) => setCreateAnother(e.target.checked)}
                className="rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0"
              />
              <label htmlFor="createAnother" className="text-slate-400 cursor-pointer">
                Create another
              </label>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !summary}
                className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                {submitting ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
