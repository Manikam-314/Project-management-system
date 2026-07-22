"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  FolderKanban, LayoutGrid, Search, Plus, Bell, Settings, ChevronDown, 
  ChevronRight, Star, Clock, Layers, Filter, LayoutDashboard, Users, 
  Target, PanelLeftClose, PanelLeft, Sparkles, FileText, Calendar, Code, CheckSquare,
  Bookmark, User, ShieldCheck, Check, SlidersHorizontal, Eye
} from "lucide-react";
import { SpaceWizardModal } from "../onboarding/space-wizard-modal";
import { CreateIssueModal } from "../issues/create-issue-modal";

interface JiraShellLayoutProps {
  children: React.ReactNode;
}

export function JiraShellLayout({ children }: JiraShellLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showSpaceWizard, setShowSpaceWizard] = useState(false);
  const [showCreateIssue, setShowCreateIssue] = useState(false);

  // Active space state
  const [activeSpace, setActiveSpace] = useState("My Software Team1");
  const [showSpaceDropdown, setShowSpaceDropdown] = useState(false);

  const spacesList = [
    "My Software Team1",
    "Team Astro",
    "Front-End Dev",
    "QA Testing",
    "Bug Tracking"
  ];

  // Collapsible sidebar sections state
  const [openSections, setOpenSections] = useState({
    forYou: true,
    recent: true,
    starred: false,
    spaces: true,
    filters: true,
    dashboards: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const navTabs = [
    { label: "Summary", href: "/summary", icon: LayoutDashboard },
    { label: "List", href: "/list", icon: CheckSquare },
    { label: "Board", href: "/board", icon: FolderKanban },
    { label: "Development", href: "/development", icon: Code },
    { label: "Timeline", href: "/timeline", icon: Calendar },
    { label: "Docs", href: "/ai", icon: FileText },
  ];

  const handleSelectSpace = (spaceName: string) => {
    setActiveSpace(spaceName);
    setShowSpaceDropdown(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header Navigation Bar */}
      <header className="h-14 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Toggle Sidebar ([)"
          >
            {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
          </button>

          {/* Jira App Branding */}
          <Link href="/summary" className="flex items-center gap-2 pr-2 border-r border-slate-800 group">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 group-hover:bg-indigo-500 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-600/30 transition-colors">
              <FolderKanban className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm text-white tracking-tight">AuroraPM</span>
          </Link>

          {/* Global Search Input */}
          <div className="relative w-64 md:w-96">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search work items, projects, or /ai prompts..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-12 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-400">
              ⌘K
            </span>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateIssue(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            Create
          </button>

          <span className="hidden md:inline-flex px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-[10px] font-bold text-purple-300">
            Enterprise Plan
          </span>

          <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-indigo-500 absolute top-1.5 right-1.5 ring-2 ring-slate-900" />
          </button>

          <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
            <Settings className="w-4 h-4" />
          </button>

          <div className="w-7 h-7 rounded-full bg-emerald-600 border border-emerald-400/40 flex items-center justify-center font-bold text-white text-xs">
            MS
          </div>
        </div>
      </header>

      {/* Main Body Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 bg-slate-900/80 border-r border-slate-800/80 flex flex-col justify-between shrink-0 overflow-y-auto p-3 space-y-4">
            <div className="space-y-4">
              {/* For You Section */}
              <div className="space-y-1">
                <button
                  onClick={() => toggleSection("forYou")}
                  className="w-full flex items-center justify-between px-2 py-1 text-xs font-bold text-slate-400 hover:text-slate-200"
                >
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-indigo-400" />
                    For you
                  </span>
                  {openSections.forYou ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>

                {openSections.forYou && (
                  <div className="space-y-0.5 text-xs text-slate-400 pl-4">
                    <Link href="/list" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-800 hover:text-slate-200 truncate">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>Worked on</span>
                    </Link>
                    <Link href="/list" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-800 hover:text-slate-200 truncate">
                      <User className="w-3 h-3 text-slate-500" />
                      <span>Assigned to me</span>
                    </Link>
                    <Link href="/board" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-800 hover:text-slate-200 truncate">
                      <Star className="w-3 h-3 text-amber-400" />
                      <span>Starred items</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Spaces Section & Launcher */}
              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span>Spaces</span>
                  <button
                    onClick={() => setShowSpaceWizard(true)}
                    className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                    title="Create Space"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Active Space Dropdown Card with Popover */}
                <div className="relative">
                  <button
                    onClick={() => setShowSpaceDropdown(!showSpaceDropdown)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between hover:border-indigo-500/40 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center font-bold text-white text-[10px] shrink-0">
                        KAN
                      </div>
                      <span className="text-xs font-bold text-slate-100 group-hover:text-indigo-300 transition-colors truncate">
                        {activeSpace}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  </button>

                  {/* Spaces Dropdown Popover */}
                  {showSpaceDropdown && (
                    <div className="absolute left-0 right-0 top-12 z-50 bg-slate-900 border border-slate-800 rounded-xl p-2 shadow-2xl space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 px-2 py-1 block">Switch Space</span>
                      {spacesList.map((sp) => (
                        <button
                          key={sp}
                          onClick={() => handleSelectSpace(sp)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                            activeSpace === sp
                              ? "bg-indigo-600/20 text-indigo-300 font-bold"
                              : "text-slate-300 hover:bg-slate-800"
                          }`}
                        >
                          <span className="truncate">{sp}</span>
                          {activeSpace === sp && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                        </button>
                      ))}
                      <div className="pt-1 border-t border-slate-800">
                        <button
                          onClick={() => {
                            setShowSpaceDropdown(false);
                            setShowSpaceWizard(true);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold text-indigo-400 hover:bg-indigo-600/10 flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Create new space
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Active Space Sub-Tabs */}
                <nav className="space-y-0.5 pt-1 pl-1">
                  {navTabs.map((tab) => {
                    const IconComp = tab.icon;
                    const isActive = pathname === tab.href;
                    return (
                      <Link
                        key={tab.href}
                        href={tab.href}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          isActive
                            ? "bg-indigo-600/15 text-indigo-300 font-semibold border-l-2 border-indigo-500"
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                        }`}
                      >
                        <IconComp className={`w-3.5 h-3.5 ${isActive ? "text-indigo-400" : "text-slate-500"}`} />
                        <span>{tab.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Filters Section */}
              <div className="pt-2 border-t border-slate-800/80 space-y-1">
                <button
                  onClick={() => toggleSection("filters")}
                  className="w-full flex items-center justify-between px-2 py-1 text-xs font-bold text-slate-400 hover:text-slate-200"
                >
                  <span className="flex items-center gap-1.5">
                    <Filter className="w-3.5 h-3.5 text-slate-500" />
                    Filters
                  </span>
                  {openSections.filters ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>

                {openSections.filters && (
                  <div className="space-y-0.5 text-xs text-slate-400 pl-4">
                    <Link href="/list" className="block px-2 py-1.5 rounded hover:bg-slate-800 hover:text-slate-200 truncate">
                      My open work items
                    </Link>
                    <Link href="/list" className="block px-2 py-1.5 rounded hover:bg-slate-800 hover:text-slate-200 truncate">
                      Reported by me
                    </Link>
                    <Link href="/list" className="block px-2 py-1.5 rounded hover:bg-slate-800 hover:text-slate-200 truncate">
                      All work items
                    </Link>
                    <Link href="/list" className="block px-2 py-1.5 rounded hover:bg-slate-800 hover:text-slate-200 truncate text-indigo-400 font-medium">
                      View all filters
                    </Link>
                  </div>
                )}
              </div>

              {/* Dashboards Section */}
              <div className="pt-2 border-t border-slate-800/80 space-y-1">
                <button
                  onClick={() => toggleSection("dashboards")}
                  className="w-full flex items-center justify-between px-2 py-1 text-xs font-bold text-slate-400 hover:text-slate-200"
                >
                  <span className="flex items-center gap-1.5">
                    <LayoutDashboard className="w-3.5 h-3.5 text-slate-500" />
                    Dashboards
                  </span>
                  {openSections.dashboards ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>

                {openSections.dashboards && (
                  <div className="space-y-0.5 text-xs text-slate-400 pl-4">
                    <Link href="/summary" className="block px-2 py-1.5 rounded hover:bg-slate-800 hover:text-slate-200 truncate">
                      Default dashboard
                    </Link>
                    <Link href="/summary" className="block px-2 py-1.5 rounded hover:bg-slate-800 hover:text-slate-200 truncate text-indigo-400 font-medium">
                      View all dashboards
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Sidebar Shortcuts */}
            <div className="pt-3 border-t border-slate-800/80 space-y-1 text-xs text-slate-400">
              <Link href="/projects" className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-800 hover:text-white">
                <Target className="w-3.5 h-3.5 text-slate-500" />
                <span>Projects</span>
              </Link>
              <Link href="/teams" className={`flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-800 hover:text-white ${pathname === '/teams' ? 'bg-indigo-600/20 text-indigo-300 font-bold' : ''}`}>
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <span>Teams</span>
              </Link>
            </div>
          </aside>
        )}

        {/* Center Main View Canvas */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-950">
          {children}
        </main>
      </div>

      {/* Space Onboarding Wizard Modal */}
      <SpaceWizardModal
        isOpen={showSpaceWizard}
        onClose={() => setShowSpaceWizard(false)}
        onComplete={(data) => {
          if (data && data.name) setActiveSpace(data.name);
        }}
      />

      {/* Global Create Issue Modal Drawer */}
      <CreateIssueModal
        isOpen={showCreateIssue}
        onClose={() => setShowCreateIssue(false)}
      />
    </div>
  );
}
