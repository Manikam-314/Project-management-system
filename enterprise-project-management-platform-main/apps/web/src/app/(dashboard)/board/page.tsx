"use client";

import { useState } from "react";
import { Plus, MoreHorizontal, User, Sparkles, MoveRight, X, Check } from "lucide-react";
import { apiClient } from "@/lib/api-client";

export default function KanbanBoardPage() {
  const [columns, setColumns] = useState([
    {
      id: "todo",
      name: "To Do",
      wipLimit: 5,
      cards: [
        { id: "AUR-4", title: "Implement MinIO Presigned File Upload Flow", type: "STORY", points: 3, assignee: "Sam Wilson", priority: "MEDIUM" },
        { id: "AUR-5", title: "Setup PostgreSQL GIN Full-text Search Index", type: "TASK", points: 2, assignee: "Alex Smith", priority: "LOW" }
      ]
    },
    {
      id: "in_progress",
      name: "In Progress",
      wipLimit: 3,
      cards: [
        { id: "AUR-1", title: "Setup Spring AI ChatClient with Gemini Provider Strategy", type: "STORY", points: 5, assignee: "Jane Doe", priority: "HIGH" },
        { id: "WEB-1", title: "Build Interactive Drag & Drop Kanban Board", type: "STORY", points: 8, assignee: "Sam Wilson", priority: "HIGH" }
      ]
    },
    {
      id: "in_review",
      name: "In Review",
      wipLimit: 3,
      cards: [
        { id: "AUR-3", title: "Add Flyway Migrations V1 through V6 Schemas", type: "TASK", points: 3, assignee: "Jane Doe", priority: "MEDIUM" }
      ]
    },
    {
      id: "done",
      name: "Done",
      wipLimit: 0,
      cards: [
        { id: "AUR-2", title: "Configure TenantContextFilter and Multi-tenant RBAC", type: "TASK", points: 3, assignee: "Alex Smith", priority: "URGENT" }
      ]
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const [cardType, setCardType] = useState("STORY");
  const [cardPriority, setCardPriority] = useState("HIGH");
  const [cardPoints, setCardPoints] = useState(3);
  const [cardAssignee, setCardAssignee] = useState("Jane Doe");
  const [submitting, setSubmitting] = useState(false);

  const handleQuickMove = (cardId: string, currentColId: string) => {
    setColumns((prevCols) => {
      const colIdx = prevCols.findIndex(c => c.id === currentColId);
      if (colIdx === -1 || colIdx === prevCols.length - 1) return prevCols;

      const card = prevCols[colIdx].cards.find(c => c.id === cardId);
      if (!card) return prevCols;

      const newCols = prevCols.map(c => ({ ...c, cards: [...c.cards] }));
      newCols[colIdx].cards = newCols[colIdx].cards.filter(c => c.id !== cardId);
      newCols[colIdx + 1].cards.push(card);

      return newCols;
    });
  };

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardTitle.trim()) return;

    setSubmitting(true);
    const newCard = {
      id: `AUR-${Math.floor(Math.random() * 900 + 100)}`,
      title: cardTitle,
      type: cardType,
      priority: cardPriority,
      points: Number(cardPoints),
      assignee: cardAssignee
    };

    try {
      await apiClient("/api/v1/work-items", {
        method: "POST",
        body: { title: cardTitle, type: cardType, priority: cardPriority, storyPoints: cardPoints }
      });
    } catch {
      // Offline fallback
    }

    setColumns(prevCols => {
      const newCols = [...prevCols];
      newCols[0].cards = [newCard, ...newCols[0].cards];
      return newCols;
    });

    setCardTitle("");
    setSubmitting(false);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Sprint Context */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white tracking-tight">Aurora Core — Sprint 4</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-bold text-emerald-400">
              ACTIVE SPRINT
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Goal: Deliver Spring AI assistant, Kanban board drag & drop, and multi-tenant security.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Card
          </button>
        </div>
      </div>

      {/* Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {columns.map((column) => (
          <div key={column.id} className="rounded-xl bg-slate-900/40 border border-slate-800/80 p-4 space-y-4">
            {/* Column Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-200">{column.name}</h3>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-bold text-slate-400">
                  {column.cards.length} {column.wipLimit > 0 && `/ ${column.wipLimit}`}
                </span>
              </div>
              <button className="text-slate-500 hover:text-slate-300">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Cards List */}
            <div className="space-y-3 min-h-[400px]">
              {column.cards.map((card) => (
                <div
                  key={card.id}
                  className="p-4 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-3 group cursor-grab active:cursor-grabbing shadow-sm"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-400">{card.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {card.type}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-slate-100 group-hover:text-indigo-200 transition-colors leading-relaxed">
                    {card.title}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-[9px]">
                        {card.assignee.charAt(0)}
                      </div>
                      <span className="truncate max-w-[80px]">{card.assignee}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-300">{card.points} pts</span>
                      {column.id !== 'done' && (
                        <button
                          onClick={() => handleQuickMove(card.id, column.id)}
                          title="Advance Column"
                          className="p-1 rounded bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-400 transition-all"
                        >
                          <MoveRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-bold text-lg text-white">Add Work Item Card</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCard} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Add Spring Security CORS Policy"
                  value={cardTitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Type</label>
                  <select
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="STORY">STORY</option>
                    <option value="TASK">TASK</option>
                    <option value="EPIC">EPIC</option>
                    <option value="SUBTASK">SUBTASK</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
                  <select
                    value={cardPriority}
                    onChange={(e) => setCardPriority(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                    <option value="URGENT">URGENT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Story Points</label>
                  <input
                    type="number"
                    min={1}
                    max={13}
                    value={cardPoints}
                    onChange={(e) => setCardPoints(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Assignee</label>
                  <select
                    value={cardAssignee}
                    onChange={(e) => setCardAssignee(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Jane Doe">Jane Doe</option>
                    <option value="Alex Smith">Alex Smith</option>
                    <option value="Sam Wilson">Sam Wilson</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  {submitting ? "Adding..." : "Add Card"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
