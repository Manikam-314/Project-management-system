"use client";

import { useState } from "react";
import { Search, Plus, Filter, Layers, User, MoreHorizontal, ArrowUpDown } from "lucide-react";

export default function SpaceListPage() {
  const [items, setItems] = useState([
    { id: "AUR-1", title: "Finalize Documentation for the Project", type: "TASK", assignee: "Manikam S", reporter: "Jane Doe", priority: "HIGH", status: "TO DO" },
    { id: "AUR-2", title: "Optimize Performance of the Application", type: "TASK", assignee: "Alex Smith", reporter: "Jane Doe", priority: "MEDIUM", status: "IN PROGRESS" },
    { id: "AUR-3", title: "Develop Transaction History Feature", type: "STORY", assignee: "Sam Wilson", reporter: "Manikam S", priority: "HIGH", status: "IN REVIEW" },
    { id: "AUR-4", title: "Create Wallet Integration", type: "STORY", assignee: "Manikam S", reporter: "Jane Doe", priority: "URGENT", status: "DONE" },
    { id: "AUR-5", title: "Set Up Notifications for Users", type: "TASK", assignee: "Alex Smith", reporter: "Manikam S", priority: "LOW", status: "TO DO" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [showAddRow, setShowAddRow] = useState(false);

  const filteredItems = items.filter(
    (i) =>
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem = {
      id: `AUR-${Math.floor(Math.random() * 900 + 10)}`,
      title: newTitle,
      type: "TASK",
      assignee: "Manikam S",
      reporter: "Jane Doe",
      priority: "MEDIUM",
      status: "TO DO",
    };

    setItems([newItem, ...items]);
    setNewTitle("");
    setShowAddRow(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3 flex-1 max-w-lg">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search work..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:border-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            Filter
          </button>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:border-slate-700">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            Group
          </button>
        </div>

        <button
          onClick={() => setShowAddRow(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Create Issue
        </button>
      </div>

      {/* Spreadsheet Table Container */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4 w-12">#</th>
                <th className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <span>Work Item Key & Title</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 w-40">Assignee</th>
                <th className="py-3 px-4 w-36">Reporter</th>
                <th className="py-3 px-4 w-28">Priority</th>
                <th className="py-3 px-4 w-32">Status</th>
                <th className="py-3 px-4 w-12"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/80">
              {/* Add Row Inline Form */}
              {showAddRow && (
                <tr className="bg-indigo-950/30">
                  <td className="py-2.5 px-4 text-indigo-400 font-bold">+</td>
                  <td className="py-2.5 px-4" colSpan={5}>
                    <form onSubmit={handleCreateRow} className="flex items-center gap-3">
                      <input
                        type="text"
                        autoFocus
                        placeholder="What needs to be done? Press Enter to save..."
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="flex-1 bg-slate-950 border border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddRow(false)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
                      >
                        Cancel
                      </button>
                    </form>
                  </td>
                  <td className="py-2.5 px-4"></td>
                </tr>
              )}

              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900 transition-colors group">
                  <td className="py-3 px-4 font-mono font-bold text-indigo-400">{item.id}</td>
                  <td className="py-3 px-4 font-medium text-slate-100 group-hover:text-indigo-200">
                    {item.title}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-[9px]">
                        {item.assignee.charAt(0)}
                      </div>
                      <span className="text-slate-300 truncate max-w-[100px]">{item.assignee}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{item.reporter}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.priority === "URGENT" || item.priority === "HIGH"
                          ? "bg-pink-500/10 text-pink-400 border border-pink-500/20"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.status === "DONE"
                          ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
                          : item.status === "IN PROGRESS"
                          ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 hover:text-slate-200">
                    <MoreHorizontal className="w-4 h-4 cursor-pointer" />
                  </td>
                </tr>
              ))}

              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-slate-400">
                    <p className="text-sm font-semibold">There are no work items here yet</p>
                    <p className="text-xs text-slate-500 mt-1">
                      You either don't have any work items or your existing ones don't match your current filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Bar */}
        <div className="p-3 border-t border-slate-800 bg-slate-900 flex items-center justify-between text-xs text-slate-400">
          <button
            onClick={() => setShowAddRow(true)}
            className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            <Plus className="w-3.5 h-3.5" />
            Create
          </button>
          <span>{filteredItems.length} work items total</span>
        </div>
      </div>
    </div>
  );
}
