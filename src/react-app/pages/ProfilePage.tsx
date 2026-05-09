import React, { useMemo, useState } from "react";
import {
  Settings,
  Flame,
  Zap,
  Target,
  Clock,
  ShieldCheck,
  ChevronRight,
  Trophy,
  X,
  User as UserIcon,
  LogOut,
} from "lucide-react";
import { useTaskStore } from "../store/useTaskStore";
import { getLevelData } from "../store/levelUtils";
import sadMascot from "../assets/mascot/sad.png";

const ProfilePage: React.FC = () => {
  const { user, tasks, updateUser, logout } = useTaskStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const levelData = getLevelData(user?.experience || 0);

  const stats = useMemo(() => {
    const completedTasks = tasks.filter((t) => t.status === "completed");
    const totalMinutes = completedTasks.reduce(
      (acc, t) => acc + (t.timeEstimation || 0),
      0,
    );

    return {
      completedCount: completedTasks.length,
      totalMinutes,
      totalXP: user?.experience || 0,
      nextLevelXP: levelData.nextLevelReq,
      progress: levelData.progressPercent,
      streak: user?.streak || 0,
    };
  }, [tasks, user, levelData]);

  const renderHeaderAvatar = () => {
    const avatar = user?.avatarUrl;

    if (!avatar) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
          <UserIcon size="50%" strokeWidth={3} />
        </div>
      );
    }

    const isEmoji =
      !avatar.includes("/") && !avatar.includes(".") && avatar.length <= 4;

    if (isEmoji) {
      return <span>{avatar}</span>;
    }

    return (
      <img
        src={avatar}
        alt="Avatar"
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
          const parent = (e.target as HTMLImageElement).parentElement;
          if (parent) {
            const div = document.createElement("div");
            div.className =
              "w-full h-full flex items-center justify-center bg-slate-100 text-slate-400";
            div.innerHTML =
              '<svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
            parent.appendChild(div);
          }
        }}
      />
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-32 animate-in fade-in duration-500 space-y-10 px-4 sm:px-0">
      {/* HEADER SECTION - Avatar & Identity */}
      <div className="flex flex-col items-center pt-8 pb-4 relative">
        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-[#5B4DDB]/10 to-transparent rounded-[40px] -z-10" />

        <div className="relative mb-6 group">
          <div className="w-32 h-32 rounded-[32px] bg-slate-50 flex items-center justify-center text-6xl shadow-[0_12px_0_#f1f5f9] border-[4px] border-white z-10 relative transform group-hover:scale-105 transition-transform duration-300 overflow-hidden">
            {renderHeaderAvatar()}
          </div>
          {/* Level Badge Overlay */}
          <div className="absolute -bottom-4 -right-4 bg-[#F5B100] text-white w-14 h-14 rounded-full flex items-center justify-center border-[4px] border-white shadow-[0_6px_0_#d97706] z-20 transform rotate-12 group-hover:rotate-0 transition-transform">
            <div className="flex flex-col items-center leading-none">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-80">
                Lvl
              </span>
              <span className="font-black text-xl">{user?.level || 1}</span>
            </div>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#111827] mb-2 uppercase tracking-tighter italic">
          {user?.name || "Adventurer"}
        </h1>
      </div>

      {/* STATISTICS GRID */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-[#111827] uppercase tracking-tighter italic px-2 flex items-center gap-3">
          <Target className="text-[#5B4DDB]" size={24} strokeWidth={3} />
          Record
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <StatCard
            icon={<Flame className="text-white fill-current" size={20} />}
            label="Day Streak"
            value={stats.streak.toString()}
            color="bg-[#FF8A4C] border-[#e67a3d] shadow-[0_6px_0_#ca652d]"
          />
          <StatCard
            icon={<Zap className="text-white fill-current" size={20} />}
            label="Total XP"
            value={stats.totalXP.toString()}
            color="bg-[#F5B100] border-[#d97706] shadow-[0_6px_0_#b45309]"
          />
          <StatCard
            icon={<Trophy className="text-white fill-current" size={20} />}
            label="Quests Done"
            value={stats.completedCount.toString()}
            color="bg-[#5B4DDB] border-[#4539a5] shadow-[0_6px_0_#3730a3]"
          />
          <StatCard
            icon={<Clock className="text-white" size={20} strokeWidth={3} />}
            label="Focus Time"
            value={`${stats.totalMinutes}m`}
            color="bg-[#10B981] border-[#059669] shadow-[0_6px_0_#047857]"
          />
        </div>
      </div>

      {/* ACHIEVEMENTS LIST - HIDDEN AS REQUESTED */}
      {/* 
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2 mb-2">
          <h2 className="text-xl sm:text-2xl font-black text-[#111827] uppercase tracking-tighter italic flex items-center gap-3">
            <Trophy className="text-[#F5B100]" size={24} strokeWidth={3} />
            Achievements
          </h2>
          <button
            onClick={() =>
              useTaskStore.getState().setCurrentPage("achievements")
            }
            className="text-[10px] font-black text-[#5B4DDB] uppercase tracking-[0.2em] px-4 py-2 border-[3px] border-slate-100 rounded-xl hover:border-[#5B4DDB]/30 hover:bg-[#F1EEFF] transition-all active:translate-y-0.5"
          >
            View All
          </button>
        </div>
      </div>
      */}

      {/* SETTINGS / SECONDARY ACTIONS */}
      <div className="space-y-4 pt-6">
        <ActionRow
          icon={
            <Settings className="text-[#7B7F97]" size={24} strokeWidth={3} />
          }
          label="Settings"
          onClick={() => setIsSettingsOpen(true)}
        />
        <ActionRow
          icon={
            <ShieldCheck className="text-[#7B7F97]" size={24} strokeWidth={3} />
          }
          label="Privacy"
          onClick={() => {}}
        />
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          currentName={user?.name || ""}
          currentAvatar={user?.avatarUrl}
          userEmail={user?.email}
          onSave={async (newName, newAvatar) => {
            await updateUser(newName, newAvatar);
            setIsSettingsOpen(false);
          }}
          onLogout={async () => {
            await logout();
            setIsSettingsOpen(false);
          }}
        />
      )}
    </div>
  );
};

const SettingsModal = ({
  isOpen,
  onClose,
  currentName,
  currentAvatar,
  userEmail,
  onSave,
  onLogout,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  currentAvatar: string | null | undefined;
  userEmail: string | undefined;
  onSave: (name: string, avatar: string | null) => Promise<void>;
  onLogout: () => Promise<void>;
}) => {
  const [name, setName] = useState(currentName);
  const [avatar, setAvatar] = useState<string | null>(currentAvatar || null);
  const [isSaving, setIsSaving] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  if (!isOpen) return null;

  const isGuest =
    userEmail?.includes("guest_") && userEmail?.includes("@questify.local");

  const AVATARS = [
    "🦊",
    "🦁",
    "🐯",
    "🐱",
    "🐶",
    "🐻",
    "🐨",
    "🐼",
    "🐸",
    "🐷",
    "🐵",
    "🦄",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSaving(true);
    await onSave(name.trim(), avatar);
    setIsSaving(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#111827]/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] border-[4px] border-slate-100 shadow-[0_16px_0_#f1f5f9] p-6 sm:p-10 w-full max-w-lg animate-in zoom-in-95 duration-300 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={24} strokeWidth={3} />
        </button>

        {showLogoutConfirm ? (
          <div className="flex flex-col items-center text-center animate-in slide-in-from-right-4 duration-300 pt-6">
            <div className="w-32 h-32 mx-auto mb-2 relative transform -translate-y-4">
              <img
                src={sadMascot}
                alt="Sad Mascot"
                className="w-full h-full object-contain filter drop-shadow-xl"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111827] uppercase tracking-tighter italic mb-3">
              {isGuest ? "Sign Out?" : "Leaving So Soon?"}
            </h2>
            <p className="text-[#7B7F97] font-bold text-sm leading-relaxed mb-8 px-4">
              {isGuest ? (
                <>
                  You are playing as a{" "}
                  <span className="text-rose-500">Guest</span>. If you sign out
                  now, your Hero, progress, and tasks will be{" "}
                  <span className="text-rose-500 underline decoration-rose-200 underline-offset-4">
                    lost forever
                  </span>
                  .
                </>
              ) : (
                "Are you sure you want to sign out? Your progress is saved, but we'll miss you!"
              )}
            </p>

            <div className="w-full flex flex-col gap-3">
              <button
                onClick={onLogout}
                className="w-full bg-rose-500 text-white px-8 py-4 rounded-[24px] font-black text-sm uppercase tracking-[0.2em] border-[4px] border-rose-600 shadow-[0_6px_0_#be123c] hover:translate-y-0.5 hover:shadow-[0_4px_0_#be123c] active:translate-y-1 active:shadow-none transition-all"
              >
                {isGuest ? "Yes, Sign Out & Delete Data" : "Yes, Sign Out"}
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full bg-white text-[#7B7F97] px-8 py-4 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] border-[4px] border-slate-100 shadow-[0_4px_0_#f1f5f9] hover:text-[#111827] hover:border-slate-200 hover:translate-y-0.5 hover:shadow-[0_2px_0_#e2e8f0] active:translate-y-1 active:shadow-none transition-all"
              >
                Go Back
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-[#F1EEFF] rounded-2xl flex items-center justify-center border-[3px] border-[#5B4DDB]/20 text-3xl overflow-hidden">
                {!avatar ? (
                  <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300">
                    <UserIcon size={24} strokeWidth={3} />
                  </div>
                ) : avatar.length <= 4 ? (
                  <span>{avatar}</span>
                ) : (
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#111827] uppercase tracking-tighter italic">
                  Profile Settings
                </h2>
                <p className="text-[#7B7F97] font-bold text-xs uppercase tracking-widest">
                  Manage your hero identity
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-8 animate-in slide-in-from-left-4 duration-300"
            >
              {/* Avatar Selection */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black text-[#7B7F97] uppercase tracking-[0.2em] ml-2">
                  Choose Avatar
                </label>
                <div className="grid grid-cols-6 gap-2 bg-[#F8F9FF] p-4 rounded-[24px] border-[4px] border-slate-100">
                  <button
                    type="button"
                    onClick={() => setAvatar(null)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
                      avatar === null
                        ? "bg-white border-[3px] border-[#5B4DDB] shadow-sm scale-110 text-[#5B4DDB]"
                        : "bg-slate-50 text-slate-300 hover:bg-white hover:scale-105"
                    }`}
                  >
                    <UserIcon size={20} strokeWidth={3} />
                  </button>
                  {AVATARS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAvatar(a)}
                      className={`w-10 h-10 flex items-center justify-center text-2xl rounded-xl transition-all ${
                        avatar === a
                          ? "bg-white border-[3px] border-[#5B4DDB] shadow-sm scale-110"
                          : "hover:bg-white hover:scale-105"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[10px] font-black text-[#7B7F97] uppercase tracking-[0.2em] ml-2">
                  <UserIcon size={14} strokeWidth={3} />
                  Hero Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter hero name..."
                  className="w-full bg-[#F8F9FF] border-[4px] border-slate-100 rounded-[24px] px-6 py-5 font-black text-[#111827] text-lg focus:outline-none focus:border-[#5B4DDB] transition-all placeholder:text-slate-300 shadow-inner"
                  maxLength={20}
                  required
                />
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  type="submit"
                  disabled={
                    isSaving ||
                    !name.trim() ||
                    (name === currentName && avatar === currentAvatar)
                  }
                  className="w-full bg-[#5B4DDB] text-white px-8 py-5 rounded-[24px] font-black text-sm uppercase tracking-[0.2em] border-[4px] border-[#4539a5] shadow-[0_6px_0_#3730a3] hover:translate-y-0.5 hover:shadow-[0_4px_0_#3730a3] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:transform-none disabled:shadow-[0_6px_0_#3730a3]"
                >
                  {isSaving ? "Saving Changes..." : "Save Identity"}
                </button>
                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className="w-full bg-white text-rose-500 px-8 py-4 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] border-[4px] border-rose-50 shadow-[0_4px_0_#fff1f2] hover:bg-rose-50 transition-all flex items-center justify-center gap-3"
                >
                  <LogOut size={18} strokeWidth={3} />
                  Sign Out
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 text-[10px] font-black text-[#7B7F97] uppercase tracking-[0.2em] hover:text-[#111827] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) => (
  <div className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-6 border-[4px] border-slate-100 shadow-[0_8px_0_#f1f5f9] flex flex-col gap-4 active:translate-y-1 active:shadow-none transition-all group hover:border-slate-200">
    <div
      className={`w-12 h-12 rounded-2xl flex items-center justify-center border-[3px] ${color} transform group-hover:scale-110 group-hover:-rotate-6 transition-all`}
    >
      {icon}
    </div>
    <div>
      <div className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tighter leading-none mb-1">
        {value}
      </div>
      <div className="text-[10px] font-black text-[#7B7F97] uppercase tracking-[0.2em]">
        {label}
      </div>
    </div>
  </div>
);

const ActionRow = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full bg-white rounded-[24px] p-5 sm:p-6 border-[4px] border-slate-100 flex items-center justify-between shadow-[0_8px_0_#f1f5f9] active:translate-y-1 active:shadow-none transition-all group hover:border-[#5B4DDB]/30"
  >
    <div className="flex items-center gap-5">
      <div className="w-12 h-12 bg-slate-50 rounded-[16px] flex items-center justify-center border-[3px] border-white shadow-inner group-hover:bg-[#F1EEFF] transition-colors">
        {icon}
      </div>
      <span className="text-lg sm:text-xl font-black text-[#111827] uppercase tracking-tighter italic group-hover:text-[#5B4DDB] transition-colors">
        {label}
      </span>
    </div>
    <div className="w-10 h-10 rounded-full border-[3px] border-slate-100 flex items-center justify-center group-hover:border-[#5B4DDB] group-hover:bg-[#5B4DDB] transition-colors">
      <ChevronRight
        className="text-[#7B7F97] group-hover:text-white"
        size={24}
        strokeWidth={4}
      />
    </div>
  </button>
);

export default ProfilePage;
