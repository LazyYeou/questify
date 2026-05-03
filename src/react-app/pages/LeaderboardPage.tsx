import React, { useState, useMemo, useEffect } from "react";
import {
  Crown,
  Calendar,
  History,
  Loader2,
  Star,
  Sparkles,
} from "lucide-react";
import { useTaskStore } from "../store/useTaskStore";
import leaderboardMascot from "../assets/mascot/leaderboard.png";
import defaultUserIcon from "../assets/icon/user.png";

interface LeaderboardEntry {
  id: string;
  name: string;
  level: number;
  xp: number;
  minutesSpent: number;
  avatar: string;
  rank: number;
}

type LeaderboardType = "allTime" | "weekly";

const LeaderboardPage: React.FC = () => {
  const [activeType, setActiveType] = useState<LeaderboardType>("allTime");
  const [data, setData] = useState<{
    allTime: LeaderboardEntry[];
    weekly: LeaderboardEntry[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = useTaskStore((state) => state.user);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/leaderboard");
        if (!response.ok) throw new Error("Failed to fetch leaderboard");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const activeData = useMemo(() => {
    if (!data) return [];
    return activeType === "allTime" ? data.allTime : data.weekly;
  }, [activeType, data]);

  const top3 = activeData.slice(0, 3);
  const others = activeData.slice(3);

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 text-[#5B4DDB]">
        <Loader2 className="w-10 h-10 animate-spin opacity-50" />
        <p className="font-black text-[10px] uppercase tracking-[0.3em] opacity-50">
          Loading Leaderboard...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 sm:gap-8 pb-16 pt-0 sm:pt-6 px-3 sm:px-0 animate-in fade-in duration-500">
      {/* 1. TOP HERO BANNER */}
      <div className="relative overflow-hidden bg-[#5B4DDB] rounded-[28px] sm:rounded-[40px] p-5 sm:p-10 border-[3px] sm:border-4 border-[#4539a5] shadow-[0_6px_0_#4539a5] mb-2 flex items-center justify-between min-h-[130px] sm:min-h-[160px]">
        {/* Decorative Background Elements */}
        <div className="absolute top-[-20px] left-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        {/* <Star className="absolute top-3 right-[45%] text-white/20 w-5 h-5 sm:w-8 sm:h-8 rotate-12 pointer-events-none" />
        <Sparkles className="absolute bottom-4 left-[45%] text-white/20 w-6 h-6 sm:w-10 sm:h-10 -rotate-12 pointer-events-none" /> */}
        <div className="absolute top-0 left-0 right-0 h-3 sm:h-5 opacity-40 rounded-t-[24px] sm:rounded-t-[36px] pointer-events-none" />

        <div className="relative z-10 w-[60%] sm:w-[65%] flex flex-col justify-center">
          {/* <div className="inline-flex items-center gap-1 sm:gap-1.5 mb-1.5 sm:mb-3 bg-white/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg sm:rounded-xl backdrop-blur-sm border border-white/20 w-max">
            <Crown size={12} className="text-amber-300 sm:w-5 sm:h-5" />
            <span className="text-[8px] sm:text-[11px] font-black text-white uppercase tracking-widest">
              Leaderboard
            </span>
          </div> */}
          <h1 className="text-2xl sm:text-5xl font-black text-white mb-1 sm:mb-2 uppercase tracking-tight leading-none drop-shadow-sm">
            {activeType === "allTime" ? "Hall of Fame" : "Time Keepers"}
          </h1>
          <p className="text-white/90 text-[10px] sm:text-sm font-bold leading-tight max-w-[95%]">
            {activeType === "allTime"
              ? "Total EXP accumulated since the beginning."
              : "Total focus time recorded this week."}
          </p>
        </div>

        {/* Mascot Area */}
        <div className="relative w-[80%] sm:w-[800%] flex justify-end pointer-events-none z-10">
          <img
            src={leaderboardMascot}
            alt="Leaderboard Mascot"
            className="w-35 h-35 sm:w-56 sm:h-56 object-contain drop-shadow-2xl -scale-x-100 absolute -right-2 sm:-right-8 -bottom-16 sm:-bottom-32"
          />
        </div>
      </div>

      {/* TABS SELECTOR */}
      <div className="flex justify-center mt-2 relative z-20">
        <div className="bg-white p-1.5 sm:p-2 rounded-full shadow-[0_4px_0_rgba(0,0,0,0.05)] border-[3px] sm:border-4 border-slate-100 flex gap-1 sm:gap-2">
          <TabButton
            active={activeType === "allTime"}
            onClick={() => setActiveType("allTime")}
            icon={<History size={16} className="sm:w-5 sm:h-5" />}
            label="All Time"
          />
          <TabButton
            active={activeType === "weekly"}
            onClick={() => setActiveType("weekly")}
            icon={<Calendar size={16} className="sm:w-5 sm:h-5" />}
            label="Weekly"
          />
        </div>
      </div>

      {/* 2. TOP 3 PODIUM SECTION */}
      <div className="flex flex-row items-end justify-center gap-1.5 sm:gap-4 mt-4">
        {/* Rank 2 */}
        {top3[1] && (
          <PodiumCard
            entry={top3[1]}
            rank={2}
            highlightColor="silver"
            heightClass="h-[90px] sm:h-[180px]"
            type={activeType}
          />
        )}

        {/* Rank 1 */}
        {top3[0] && (
          <PodiumCard
            entry={top3[0]}
            rank={1}
            highlightColor="gold"
            heightClass="h-[120px] sm:h-[220px]"
            isWinner
            type={activeType}
          />
        )}

        {/* Rank 3 */}
        {top3[2] && (
          <PodiumCard
            entry={top3[2]}
            rank={3}
            highlightColor="bronze"
            heightClass="h-[70px] sm:h-[140px]"
            type={activeType}
          />
        )}
      </div>

      <div className="border-t-[3px] sm:border-t-4 border-slate-100 my-1 sm:my-2 rounded-full w-3/4 mx-auto"></div>

      {/* 3. LEADERBOARD LIST CARD */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {others.map((entry) => (
          <LeaderboardRow
            key={entry.id}
            entry={entry}
            type={activeType}
            isCurrentUser={String(user?.id) === String(entry.id)}
          />
        ))}
        {activeData.length === 0 && (
          <div className="bg-white border-[3px] sm:border-4 border-slate-100 rounded-[24px] sm:rounded-[32px] p-6 text-center text-[#7B7F97] font-bold text-xs sm:text-base">
            No hero data yet...
          </div>
        )}
      </div>
      <style>{`
        @keyframes crown-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-crown-float {
          animation: crown-float 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

const TabButton = ({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all border-2 border-transparent ${
      active
        ? "bg-[#5B4DDB] text-white shadow-md shadow-[#5B4DDB]/30"
        : "text-[#7B7F97] hover:bg-slate-50 hover:text-[#111827]"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const Avatar = ({
  avatar,
  className,
}: {
  avatar: string;
  className: string;
}) => {
  const isEmoji =
    avatar &&
    avatar !== "🦊" &&
    !avatar.includes("/") &&
    !avatar.includes(".") &&
    avatar.length <= 4;

  if (isEmoji) {
    return <span className="truncate">{avatar}</span>;
  }

  const src = avatar && avatar !== "🦊" ? avatar : defaultUserIcon;

  return (
    <img
      src={src}
      alt="Avatar"
      className={`${className} object-cover rounded-full`}
      onError={(e) => {
        (e.target as HTMLImageElement).src = defaultUserIcon;
      }}
    />
  );
};

const PodiumCard = ({
  entry,
  rank,
  highlightColor,
  heightClass,
  isWinner = false,
  type,
}: {
  entry: LeaderboardEntry;
  rank: number;
  highlightColor: "gold" | "silver" | "bronze";
  heightClass: string;
  isWinner?: boolean;
  type: LeaderboardType;
}) => {
  const colors = {
    gold: {
      bg: "bg-amber-300",
      topBg: "bg-amber-100",
      border: "border-amber-400",
      text: "text-amber-800",
      rankColor: "bg-amber-400 text-amber-900 border-amber-200",
    },
    silver: {
      bg: "bg-slate-300",
      topBg: "bg-slate-100",
      border: "border-slate-400",
      text: "text-slate-800",
      rankColor: "bg-slate-400 text-slate-900 border-slate-200",
    },
    bronze: {
      bg: "bg-orange-300",
      topBg: "bg-orange-100",
      border: "border-orange-400",
      text: "text-orange-900",
      rankColor: "bg-orange-400 text-orange-900 border-orange-200",
    },
  };

  const c = colors[highlightColor];

  return (
    <div
      className={`flex-1 min-w-0 flex flex-col items-center justify-end relative`}
    >
      {/* Avatar Container */}
      <div className="relative mb-2 sm:mb-3 flex flex-col items-center z-20 w-full px-1">
        {isWinner && (
          <Crown
            className="absolute -top-6 sm:-top-10 text-amber-400 w-8 h-8 sm:w-10 sm:h-10 drop-shadow-md z-30 animate-crown-float"
            fill="currentColor"
          />
        )}

        <div
          className={`w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center text-2xl sm:text-4xl shadow-[0_2px_0_rgba(0,0,0,0.05)] border-2 sm:border-4 ${c.border} relative shrink-0 mx-auto`}
        >
          <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
            <Avatar avatar={entry.avatar} className="w-full h-full" />
          </div>
          {/* Rank Badge */}
          <div
            className={`absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-5 h-5 sm:w-8 sm:h-8 rounded-full ${c.rankColor} border font-black text-[9px] sm:text-sm flex items-center justify-center shadow-sm z-10`}
          >
            {rank}
          </div>
        </div>
      </div>

      {/* Podium Block */}
      <div
        className={`${heightClass} w-full ${c.bg} border-2 sm:border-4 ${c.border} rounded-t-[16px] sm:rounded-t-[20px] rounded-b-[8px] sm:rounded-b-[10px] relative overflow-hidden flex flex-col items-center justify-start pt-2 sm:pt-4 shadow-sm`}
      >
        {/* Lighter top "surface" of the block */}
        <div
          className={`absolute top-0 left-0 right-0 h-2.5 sm:h-4 ${c.topBg} border-b-2 sm:border-b-4 ${c.border} opacity-50`}
        ></div>

        <div className="w-full px-1 flex flex-col items-center min-w-0 mt-0.5 sm:mt-2 z-10">
          <h3
            className={`font-black text-[9px] mt-2 sm:text-base truncate w-full text-center text-slate-900`}
          >
            {entry.name}
          </h3>

          <div className="mt-1 bg-white/60 px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-xl border border-white/50 inline-flex items-center justify-center max-w-full">
            <span
              className={`font-black text-[8px] sm:text-sm ${c.text} truncate`}
            >
              {type === "allTime" ? `${entry.xp} XP` : `${entry.minutesSpent}m`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const LeaderboardRow = ({
  entry,
  type,
  isCurrentUser,
}: {
  entry: LeaderboardEntry;
  type: LeaderboardType;
  isCurrentUser: boolean;
}) => {
  return (
    <div
      className={`group flex items-center gap-2 sm:gap-4 p-2.5 sm:p-5 rounded-[20px] sm:rounded-3xl border-2 sm:border-4 transition-all duration-200 ${
        isCurrentUser
          ? "bg-amber-50 border-amber-200 shadow-[0_4px_0_rgba(251,191,36,0.3)] sm:shadow-[0_6px_0_rgba(251,191,36,0.3)] z-10"
          : "bg-white border-slate-100 shadow-[0_3px_0_rgba(0,0,0,0.02)] sm:shadow-[0_6px_0_rgba(0,0,0,0.02)] active:translate-y-1 active:shadow-none"
      }`}
    >
      <div
        className={`w-7 h-7 sm:w-10 sm:h-10 rounded-[10px] sm:rounded-2xl flex items-center justify-center font-black text-[10px] sm:text-lg shrink-0 ${
          isCurrentUser
            ? "bg-amber-400 text-white shadow-sm"
            : "bg-slate-100 text-[#7B7F97]"
        }`}
      >
        {entry.rank}
      </div>

      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-slate-50 flex items-center justify-center text-xl sm:text-3xl shadow-inner border border-slate-200 select-none shrink-0 overflow-hidden">
        <Avatar avatar={entry.avatar} className="w-full h-full" />
      </div>

      <div className="flex-1 min-w-0 pr-1">
        <h4
          className={`font-black text-[13px] sm:text-lg truncate leading-tight ${isCurrentUser ? "text-amber-800" : "text-[#111827]"}`}
        >
          {entry.name}
        </h4>
        <p className="text-[#7B7F97] font-bold text-[8px] sm:text-[10px] uppercase tracking-wider leading-none mt-0.5">
          Level {entry.level}
        </p>
      </div>

      <div className="text-right shrink-0">
        <div
          className={`px-2 py-1 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl border sm:border-2 font-black flex items-center justify-center ${isCurrentUser ? "bg-amber-100 border-amber-200 text-amber-700" : "bg-slate-50 border-slate-100 text-[#111827]"}`}
        >
          {type === "allTime" ? (
            <>
              <span className="text-[10px] sm:text-base leading-none">
                {entry.xp.toLocaleString()}
              </span>
              <span className="text-[7px] sm:text-[10px] opacity-60 ml-0.5 sm:ml-1 leading-none">
                XP
              </span>
            </>
          ) : (
            <>
              <span className="text-[10px] sm:text-base leading-none">
                {entry.minutesSpent.toLocaleString()}
              </span>
              <span className="text-[7px] sm:text-[10px] opacity-60 ml-0.5 sm:ml-1 leading-none">
                m
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
