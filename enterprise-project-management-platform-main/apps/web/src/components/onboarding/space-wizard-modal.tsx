"use client";

import { useState } from "react";
import { 
  Sparkles, Check, ArrowRight, ArrowLeft, Plus, X, Layers, Users, 
  Code, Briefcase, Megaphone, Palette, Settings, Cpu, ShieldCheck, 
  Headphones, DollarSign, Scale, BarChart2, HelpCircle 
} from "lucide-react";
import { SpaceInviteModal } from "./space-invite-modal";

interface SpaceWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (spaceData: any) => void;
}

export function SpaceWizardModal({ isOpen, onClose, onComplete }: SpaceWizardModalProps) {
  const [step, setStep] = useState(1);
  const [spaceName, setSpaceName] = useState("My Software Team");
  
  // Step 2: Use Cases
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>(["Manage tasks"]);
  
  // Step 3: Work Category
  const [workCategory, setWorkCategory] = useState("Software development");

  // Step 4: Workflow Statuses
  const [statuses, setStatuses] = useState<string[]>(["To Do", "In Progress", "In Review", "Done"]);
  const [newStatusInput, setNewStatusInput] = useState("");
  const [showAddStatus, setShowAddStatus] = useState(false);

  // Step 5: Work Item Types
  const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>(["Task", "Story"]);

  // Step 6 Modal Trigger
  const [showInviteModal, setShowInviteModal] = useState(false);

  if (!isOpen) return null;

  const toggleUseCase = (uc: string) => {
    setSelectedUseCases((prev) =>
      prev.includes(uc) ? prev.filter((i) => i !== uc) : [...prev, uc]
    );
  };

  const toggleWorkType = (wt: string) => {
    setSelectedWorkTypes((prev) =>
      prev.includes(wt) ? prev.filter((i) => i !== wt) : [...prev, wt]
    );
  };

  const handleAddStatus = () => {
    if (!newStatusInput.trim()) return;
    setStatuses((prev) => [...prev, newStatusInput.trim()]);
    setNewStatusInput("");
    setShowAddStatus(false);
  };

  const handleRemoveStatus = (index: number) => {
    setStatuses((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else if (step === 5) {
      setShowInviteModal(true);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinishAll = () => {
    setShowInviteModal(false);
    onComplete({
      name: spaceName,
      useCases: selectedUseCases,
      category: workCategory,
      statuses,
      workTypes: selectedWorkTypes
    });
    onClose();
  };

  const workCategoryList = [
    { id: "Software development", label: "Software development", icon: Code, color: "text-purple-400" },
    { id: "Product management", label: "Product management", icon: Briefcase, color: "text-emerald-400" },
    { id: "Marketing", label: "Marketing", icon: Megaphone, color: "text-amber-400" },
    { id: "Design", label: "Design", icon: Palette, color: "text-pink-400" },
    { id: "Project management", label: "Project management", icon: Layers, color: "text-indigo-400" },
    { id: "Operations", label: "Operations", icon: Settings, color: "text-cyan-400" },
    { id: "IT support", label: "IT support", icon: HelpCircle, color: "text-orange-400" },
    { id: "Human resources", label: "Human resources", icon: Users, color: "text-emerald-400" },
    { id: "Customer service", label: "Customer service", icon: Headphones, color: "text-blue-400" },
    { id: "Legal", label: "Legal", icon: Scale, color: "text-slate-400" },
    { id: "Finance", label: "Finance", icon: DollarSign, color: "text-emerald-400" },
    { id: "Sales", label: "Sales", icon: BarChart2, color: "text-purple-400" },
    { id: "Data science", label: "Data science", icon: Cpu, color: "text-indigo-400" },
    { id: "Other", label: "Other", icon: Sparkles, color: "text-pink-400" },
  ];

  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Main Config Column */}
          <div className="md:col-span-7 p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Step indicator header */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                  Step {step} of 5
                </span>
                <div className="flex items-center gap-1 flex-1 max-w-[120px]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        i <= step ? "bg-indigo-500" : "bg-slate-800"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* STEP 1: Name Your Space */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Name your space</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      This is where you'll help your team track progress, stay organized, and manage tasks.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-300">Name your space</label>
                    <input
                      type="text"
                      value={spaceName}
                      onChange={(e) => setSpaceName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <span className="block text-[11px] font-semibold text-slate-400">Example space names:</span>
                    <div className="flex flex-wrap gap-2">
                      {["My Software Team", "Team Astro", "Front-End Dev", "QA Testing", "Bug Tracking"].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setSpaceName(preset)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                            spaceName === preset
                              ? "bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-sm"
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Team Usage Plan */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">How does your team plan to use AuroraPM?</h2>
                    <p className="text-xs text-slate-400 mt-1">Select all options that match your team's goals.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Prioritize work",
                      "Manage tasks",
                      "Track bugs",
                      "Run sprints",
                      "Work in scrum",
                      "Map work dependencies"
                    ].map((item) => {
                      const isSelected = selectedUseCases.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleUseCase(item)}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs font-semibold transition-all ${
                            isSelected
                              ? "bg-indigo-600/15 border-indigo-500 text-white shadow-sm"
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          <span>{item}</span>
                          <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isSelected ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-700"
                          }`}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: Work Category */}
              {step === 3 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">What kind of work do you do?</h2>
                    <p className="text-xs text-slate-400 mt-1">This helps us suggest templates that help your team do their best work.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
                    {workCategoryList.map((cat) => {
                      const IconComp = cat.icon;
                      const isSelected = workCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setWorkCategory(cat.id)}
                          className={`p-2.5 rounded-xl border text-left flex items-center gap-3 text-xs font-semibold transition-all ${
                            isSelected
                              ? "bg-indigo-600/15 border-indigo-500 text-white shadow-sm"
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          <IconComp className={`w-4 h-4 ${cat.color}`} />
                          <span className="truncate">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: How Do You Track Work? */}
              {step === 4 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">How do you track work?</h2>
                    <p className="text-xs text-slate-400 mt-1">As you complete work, it moves through these workflow statuses.</p>
                  </div>

                  <div className="space-y-2">
                    {statuses.map((st, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={st}
                          onChange={(e) => {
                            const newSt = [...statuses];
                            newSt[idx] = e.target.value;
                            setStatuses(newSt);
                          }}
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                        />
                        {statuses.length > 2 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveStatus(idx)}
                            className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}

                    {showAddStatus ? (
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          placeholder="e.g. In Review"
                          value={newStatusInput}
                          onChange={(e) => setNewStatusInput(e.target.value)}
                          className="flex-1 bg-slate-950 border border-indigo-500 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleAddStatus}
                          className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                        >
                          Add
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowAddStatus(true)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 pt-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add status
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 5: What Types of Work Do You Need? */}
              {step === 5 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">What types of work do you need?</h2>
                    <p className="text-xs text-slate-400 mt-1">These form the building blocks of your space.</p>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      { id: "Task", desc: "A small piece of work." },
                      { id: "Story", desc: "A requirement expressed from the user's perspective." },
                      { id: "Feature", desc: "A broad piece of functionality." },
                      { id: "Request", desc: "An ask for assistance." },
                      { id: "Bug", desc: "A problem that needs fixing." },
                    ].map((typeItem) => {
                      const isSelected = selectedWorkTypes.includes(typeItem.id);
                      return (
                        <button
                          key={typeItem.id}
                          type="button"
                          onClick={() => toggleWorkType(typeItem.id)}
                          className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                            isSelected
                              ? "bg-indigo-600/15 border-indigo-500 shadow-sm"
                              : "bg-slate-950 border-slate-800 hover:border-slate-700"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-colors ${
                            isSelected ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-700"
                          }`}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">{typeItem.id}</span>
                            <span className="text-[11px] text-slate-400">{typeItem.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
              ) : <div />}

              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all active:scale-95"
              >
                {step === 5 ? "Continue" : "Next"}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Visual Preview Column */}
          <div className="md:col-span-5 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900/40 p-6 flex flex-col items-center justify-center border-l border-slate-800/80 relative overflow-hidden">
            <div className="w-full max-w-[250px] bg-slate-900 border border-slate-700/80 rounded-xl p-4 shadow-2xl space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h4 className="text-xs font-bold text-white truncate">{spaceName || "My Software Team..."}</h4>
                <div className="flex items-center gap-2 text-[9px] text-slate-400 mt-1">
                  <span className="text-indigo-400 font-bold">Board</span>
                  <span>List</span>
                  <span>Timeline</span>
                  <span>Backlog</span>
                </div>
              </div>

              {/* Workflow Status Preview Columns */}
              <div className="grid grid-cols-3 gap-2">
                {statuses.slice(0, 3).map((st, i) => (
                  <div key={i} className="bg-slate-950 p-2 rounded border border-slate-800 space-y-1.5">
                    <span className="font-bold text-slate-400 uppercase text-[7px] truncate block">{st}</span>
                    <div className="h-1.5 bg-indigo-500/40 rounded w-full" />
                    <div className="h-1.5 bg-slate-800 rounded w-2/3" />
                  </div>
                ))}
              </div>

              <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[10px] text-indigo-300 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Custom workflow ready for team execution</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 6: Team Onboarding Invite Modal */}
      <SpaceInviteModal
        isOpen={showInviteModal}
        spaceName={spaceName}
        onClose={handleFinishAll}
      />
    </>
  );
}
