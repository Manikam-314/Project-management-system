"use client";

import { useState } from "react";
import { 
  Users, Plus, Search, Filter, ShieldCheck, Sparkles, FolderKanban, 
  BarChart3, Clock, CheckCircle2, UserPlus, X, MoreHorizontal, ChevronRight, 
  Mail, Calendar, TrendingUp, Cpu, Award, Zap 
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Team Lead" | "Senior Developer" | "Product Owner" | "QA Engineer" | "DevOps Lead";
  avatarBg: string;
  weeklyHours: number;
  allocatedPoints: number;
  status: "ACTIVE" | "ON_LEAVE";
}

interface Team {
  id: string;
  name: string;
  lead: string;
  department: string;
  membersCount: number;
  velocityPts: number;
  capacityUtilization: number;
  activeProjects: string[];
  members: TeamMember[];
}

export default function TeamsManagementPage() {
  const [teams, setTeams] = useState<Team[]>([
    {
      id: "TEAM-1",
      name: "Frontend Platform Team",
      lead: "Sam Wilson",
      department: "Frontend Engineering",
      membersCount: 8,
      velocityPts: 48,
      capacityUtilization: 88,
      activeProjects: ["Aurora Core (KAN)", "Design System V2"],
      members: [
        { id: "M1", name: "Sam Wilson", email: "sam@aurorapm.io", role: "Team Lead", avatarBg: "bg-indigo-600", weeklyHours: 40, allocatedPoints: 13, status: "ACTIVE" },
        { id: "M2", name: "Jane Doe", email: "jane@aurorapm.io", role: "Senior Developer", avatarBg: "bg-purple-600", weeklyHours: 40, allocatedPoints: 12, status: "ACTIVE" },
        { id: "M3", name: "Alex Smith", email: "alex@aurorapm.io", role: "Product Owner", avatarBg: "bg-emerald-600", weeklyHours: 40, allocatedPoints: 8, status: "ACTIVE" },
        { id: "M4", name: "Maria Garcia", email: "maria@aurorapm.io", role: "QA Engineer", avatarBg: "bg-pink-600", weeklyHours: 35, allocatedPoints: 5, status: "ACTIVE" },
      ]
    },
    {
      id: "TEAM-2",
      name: "Backend Core Services",
      lead: "Jane Doe",
      department: "Backend Engineering",
      membersCount: 10,
      velocityPts: 62,
      capacityUtilization: 94,
      activeProjects: ["Multi-Tenant RBAC", "Spring Security Engine"],
      members: [
        { id: "M2", name: "Jane Doe", email: "jane@aurorapm.io", role: "Team Lead", avatarBg: "bg-purple-600", weeklyHours: 40, allocatedPoints: 15, status: "ACTIVE" },
        { id: "M5", name: "Manikam S", email: "manik@aurorapm.io", role: "DevOps Lead", avatarBg: "bg-blue-600", weeklyHours: 40, allocatedPoints: 14, status: "ACTIVE" },
      ]
    },
    {
      id: "TEAM-3",
      name: "AI & ML Intelligence",
      lead: "Alex Smith",
      department: "Artificial Intelligence",
      membersCount: 6,
      velocityPts: 38,
      capacityUtilization: 75,
      activeProjects: ["pgvector RAG Assistant", "Auto Breakdown Engine"],
      members: [
        { id: "M3", name: "Alex Smith", email: "alex@aurorapm.io", role: "Team Lead", avatarBg: "bg-emerald-600", weeklyHours: 40, allocatedPoints: 10, status: "ACTIVE" },
      ]
    },
    {
      id: "TEAM-4",
      name: "Cloud Infra & DevOps",
      lead: "Manikam S",
      department: "Infrastructure",
      membersCount: 5,
      velocityPts: 42,
      capacityUtilization: 82,
      activeProjects: ["MinIO S3 Attachments", "Kubernetes Pipeline"],
      members: [
        { id: "M5", name: "Manikam S", email: "manik@aurorapm.io", role: "Team Lead", avatarBg: "bg-blue-600", weeklyHours: 40, allocatedPoints: 12, status: "ACTIVE" },
      ]
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  // Modals state
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  // New Team Form State
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDept, setNewTeamDept] = useState("Frontend Engineering");
  const [newTeamLead, setNewTeamLead] = useState("Jane Doe");

  // New Member Form State
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState<TeamMember["role"]>("Senior Developer");

  const filteredTeams = teams.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.lead.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === "ALL" || t.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;

    const newTeam: Team = {
      id: `TEAM-${teams.length + 1}`,
      name: newTeamName,
      lead: newTeamLead,
      department: newTeamDept,
      membersCount: 1,
      velocityPts: 35,
      capacityUtilization: 70,
      activeProjects: ["New Initiative Space"],
      members: [
        { id: Date.now().toString(), name: newTeamLead, email: `${newTeamLead.toLowerCase().replace(" ", "")}@aurorapm.io`, role: "Team Lead", avatarBg: "bg-indigo-600", weeklyHours: 40, allocatedPoints: 10, status: "ACTIVE" }
      ]
    };

    setTeams([...teams, newTeam]);
    setNewTeamName("");
    setShowCreateTeamModal(false);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !selectedTeam) return;

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: newMemberName,
      email: newMemberEmail || `${newMemberName.toLowerCase().replace(" ", "")}@aurorapm.io`,
      role: newMemberRole,
      avatarBg: "bg-purple-600",
      weeklyHours: 40,
      allocatedPoints: 8,
      status: "ACTIVE"
    };

    const updatedTeams = teams.map((t) => {
      if (t.id === selectedTeam.id) {
        return {
          ...t,
          membersCount: t.membersCount + 1,
          members: [...t.members, newMember]
        };
      }
      return t;
    });

    setTeams(updatedTeams);
    setSelectedTeam({
      ...selectedTeam,
      membersCount: selectedTeam.membersCount + 1,
      members: [...selectedTeam.members, newMember]
    });

    setNewMemberName("");
    setNewMemberEmail("");
    setShowAddMemberModal(false);
  };

  const totalEngineers = teams.reduce((acc, t) => acc + t.members.length, 0);
  const avgVelocity = (teams.reduce((acc, t) => acc + t.velocityPts, 0) / (teams.length || 1)).toFixed(1);
  const avgCapacity = Math.round(teams.reduce((acc, t) => acc + t.capacityUtilization, 0) / (teams.length || 1));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Teams & Capacity Management</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage organization engineering teams, member allocation, sprint capacity, and velocity metrics.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowCreateTeamModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all shrink-0 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Create Team
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Total Active Teams</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-bold text-white">{teams.length}</p>
          <span className="text-[11px] text-emerald-400 block">+1 created this quarter</span>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Total Engineers</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white">{totalEngineers} members</p>
          <span className="text-[11px] text-slate-400 block">100% RBAC verified</span>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Avg Sprint Velocity</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-white">{avgVelocity} pts</p>
          <span className="text-[11px] text-cyan-400 block">Across {teams.length} active teams</span>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Sprint Capacity Allocated</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-white">{avgCapacity}%</p>
          <span className="text-[11px] text-amber-400 block">Optimal workload limit</span>
        </div>
      </div>


      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search teams or team leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">All Departments</option>
            <option value="Frontend Engineering">Frontend Engineering</option>
            <option value="Backend Engineering">Backend Engineering</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Infrastructure">Infrastructure</option>
          </select>
        </div>
      </div>

      {/* Teams Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            onClick={() => setSelectedTeam(team)}
            className="rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-all p-6 space-y-5 cursor-pointer group shadow-lg"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-indigo-400">{team.id}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {team.department}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {team.name}
                </h3>
              </div>

              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-indigo-600 transition-all">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Capacity Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>Capacity Allocation</span>
                <span className="text-white font-bold">{team.capacityUtilization}%</span>
              </div>
              <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all ${
                    team.capacityUtilization > 90
                      ? "bg-pink-500"
                      : team.capacityUtilization > 80
                      ? "bg-indigo-500"
                      : "bg-emerald-500"
                  }`}
                  style={{ width: `${team.capacityUtilization}%` }}
                />
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-800/80 text-xs">
              <div>
                <span className="text-[10px] font-semibold text-slate-500 block">Team Lead</span>
                <span className="font-bold text-slate-200 truncate block">{team.lead}</span>
              </div>

              <div>
                <span className="text-[10px] font-semibold text-slate-500 block">Velocity</span>
                <span className="font-bold text-emerald-400">{team.velocityPts} pts / sprint</span>
              </div>

              <div>
                <span className="text-[10px] font-semibold text-slate-500 block">Members</span>
                <span className="font-bold text-indigo-400">{team.membersCount} engineers</span>
              </div>
            </div>

            {/* Active Spaces / Projects Badges */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Spaces</span>
              <div className="flex flex-wrap gap-1.5">
                {team.activeProjects.map((proj, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-medium text-slate-300"
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TEAM DETAIL DRAWER */}
      {selectedTeam && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
          <div className="bg-slate-900 border-l border-slate-800 w-full max-w-2xl h-full flex flex-col justify-between shadow-2xl p-6 space-y-6 overflow-y-auto">
            {/* Drawer Header */}
            <div className="space-y-4 border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-indigo-400">{selectedTeam.id}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {selectedTeam.department}
                  </span>
                </div>
                <button onClick={() => setSelectedTeam(null)} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">{selectedTeam.name}</h2>
                <p className="text-xs text-slate-400 mt-1">Lead: <span className="text-white font-bold">{selectedTeam.lead}</span> • Velocity: <span className="text-emerald-400 font-bold">{selectedTeam.velocityPts} pts</span></p>
              </div>
            </div>

            {/* Members Section */}
            <div className="space-y-4 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-400" />
                  Team Roster & Sprint Allocations ({selectedTeam.members.length})
                </h3>
                <button
                  onClick={() => setShowAddMemberModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Add Member
                </button>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden divide-y divide-slate-800">
                {selectedTeam.members.map((m) => (
                  <div key={m.id} className="p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${m.avatarBg} flex items-center justify-center font-bold text-white text-xs shadow-md`}>
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{m.name}</h4>
                        <span className="text-[10px] text-slate-400">{m.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20 block">
                          {m.role}
                        </span>
                        <span className="text-[10px] text-slate-500 mt-0.5 block">{m.weeklyHours} hrs/wk</span>
                      </div>

                      <div className="w-16 text-right">
                        <span className="font-bold text-emerald-400">{m.allocatedPoints} pts</span>
                        <span className="text-[10px] text-slate-500 block">Allocated</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedTeam(null)}
                className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Close Manager
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE TEAM MODAL */}
      {showCreateTeamModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-bold text-lg text-white">Create Engineering Team</h3>
              <button onClick={() => setShowCreateTeamModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTeam} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Team Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Design Systems & UI Core"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Department</label>
                <select
                  value={newTeamDept}
                  onChange={(e) => setNewTeamDept(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Frontend Engineering">Frontend Engineering</option>
                  <option value="Backend Engineering">Backend Engineering</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Infrastructure">Infrastructure</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Team Lead</label>
                <select
                  value={newTeamLead}
                  onChange={(e) => setNewTeamLead(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Jane Doe">Jane Doe</option>
                  <option value="Sam Wilson">Sam Wilson</option>
                  <option value="Alex Smith">Alex Smith</option>
                  <option value="Manikam S">Manikam S</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateTeamModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/25"
                >
                  Create Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD MEMBER MODAL */}
      {showAddMemberModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-bold text-lg text-white">Add Team Member</h3>
              <button onClick={() => setShowAddMemberModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maria Garcia"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. maria@aurorapm.io"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Role</label>
                <select
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Senior Developer">Senior Developer</option>
                  <option value="Team Lead">Team Lead</option>
                  <option value="Product Owner">Product Owner</option>
                  <option value="QA Engineer">QA Engineer</option>
                  <option value="DevOps Lead">DevOps Lead</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/25"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
