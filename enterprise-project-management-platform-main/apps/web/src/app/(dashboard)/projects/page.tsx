"use client";

import { useState, useEffect } from "react";
import { Plus, FolderKanban, Tag, Calendar, User, Search, X, Check } from "lucide-react";
import { apiClient } from "@/lib/api-client";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([
    { id: "1", key: "AUR", name: "Aurora Core Engine", description: "Spring Boot 3.5 multi-tenant backend architecture & AI core", status: "ACTIVE", lead: "Jane Doe", count: 24 },
    { id: "2", key: "WEB", name: "Next.js 15 Web App", description: "Modern React web platform with Tailwind & shadcn UI", status: "ACTIVE", lead: "Alex Smith", count: 18 },
    { id: "3", key: "OPS", name: "DevOps & K8s Pipeline", description: "Docker Compose local stack, Helm charts, and GitHub Actions", status: "ACTIVE", lead: "Sam Wilson", count: 9 },
  ]);

  const [workItems, setWorkItems] = useState([
    { key: "AUR-1", title: "Setup Spring AI ChatClient with Gemini Provider Strategy", type: "STORY", priority: "HIGH", points: 5, assignee: "Jane Doe", status: "In Progress" },
    { key: "AUR-2", title: "Configure TenantContextFilter and Multi-tenant RBAC", type: "TASK", priority: "URGENT", points: 3, assignee: "Alex Smith", status: "Done" },
    { key: "WEB-1", title: "Build Interactive Drag and Drop Kanban Board with dnd-kit", type: "STORY", priority: "HIGH", points: 8, assignee: "Sam Wilson", status: "In Progress" },
    { key: "WEB-2", title: "Implement Global Search Cmd+K Palette and Filters", type: "TASK", priority: "MEDIUM", points: 3, assignee: "Jane Doe", status: "To Do" },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch from backend API if available
  useEffect(() => {
    async function loadBackendData() {
      try {
        const fetchedProjects = await apiClient<any[]>("/api/v1/projects");
        if (fetchedProjects && fetchedProjects.length > 0) {
          setProjects(fetchedProjects.map(p => ({
            id: p.id,
            key: p.key,
            name: p.name,
            description: p.description || "Project created via Spring Boot API",
            status: p.status || "ACTIVE",
            lead: "Jane Doe",
            count: 0
          })));
        }
      } catch {
        // Fallback to initial local state
      }
    }
    loadBackendData();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey || !newName) return;

    setSubmitting(true);
    const createdProject = {
      id: Date.now().toString(),
      key: newKey.toUpperCase(),
      name: newName,
      description: newDesc || "Custom created enterprise project",
      status: "ACTIVE",
      lead: "Jane Doe",
      count: 0
    };

    try {
      await apiClient("/api/v1/projects", {
        method: "POST",
        body: { key: newKey.toUpperCase(), name: newName, description: newDesc }
      });
    } catch {
      // Offline fallback
    }

    setProjects(prev => [createdProject, ...prev]);
    setNewKey("");
    setNewName("");
    setNewDesc("");
    setSubmitting(false);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Projects & Work Items</h1>
          <p className="text-xs text-slate-400 mt-1">Manage project scope, epics, stories, and task hierarchies.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          Create Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400">
                {project.key}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {project.status}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-white text-base">{project.name}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{project.description}</p>
            </div>
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                {project.lead}
              </span>
              <span>{project.count} Work Items</span>
            </div>
          </div>
        ))}
      </div>

      {/* Work Items Table Section */}
      <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-white text-base">All Work Items</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Filter items..."
                className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-medium">
                <th className="pb-3 px-3">Key</th>
                <th className="pb-3 px-3">Title</th>
                <th className="pb-3 px-3">Type</th>
                <th className="pb-3 px-3">Priority</th>
                <th className="pb-3 px-3">Points</th>
                <th className="pb-3 px-3">Assignee</th>
                <th className="pb-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {workItems.map((item) => (
                <tr key={item.key} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-semibold text-indigo-400">{item.key}</td>
                  <td className="py-3 px-3 font-medium text-slate-200">{item.title}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      item.priority === 'URGENT' ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' :
                      item.priority === 'HIGH' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-slate-800 text-slate-300'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-semibold">{item.points} pts</td>
                  <td className="py-3 px-3 text-slate-300">{item.assignee}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-bold text-lg text-white">Create New Project</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Key (2-6 letters)</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="e.g. PRJ"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value.toUpperCase())}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Workflow Service"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Summary of project scope and deliverables..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
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
                  {submitting ? "Saving..." : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
