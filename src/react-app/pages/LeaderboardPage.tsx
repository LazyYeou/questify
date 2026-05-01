import React from 'react';
import { Trophy, Medal, Sparkles } from 'lucide-react';

const LeaderboardPage: React.FC = () => {
  const players = [
    { rank: 1, name: "Alex", exp: 4500, level: 12, avatar: "🦊" },
    { rank: 2, name: "Jordan", exp: 3800, level: 10, avatar: "🐼" },
    { rank: 3, name: "Sarah", exp: 3200, level: 9, avatar: "🐱" },
    { rank: 4, name: "Mike", exp: 2900, level: 8, avatar: "🦁" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto pb-24">
      <div className="flex flex-col items-center mb-10">
        <div className="w-20 h-20 bg-gradient-to-br from-[#FFB52E] to-[#FF9800] rounded-[24px] flex items-center justify-center shadow-lg mb-4 transform -rotate-6">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-black text-[#111827]">Hall of Fame</h1>
        <p className="text-[#7B7F97] font-bold">Top Questers this week</p>
      </div>

      <div className="space-y-4">
        {players.map((player) => (
          <div key={player.rank} className="bg-white rounded-[32px] p-6 flex items-center gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-white">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${
              player.rank === 1 ? 'bg-[#FFF9E6] text-[#F5B100]' : 'bg-[#F8F9FF] text-[#7B7F97]'
            }`}>
              {player.rank === 1 ? <Medal /> : `#${player.rank}`}
            </div>
            <div className="text-3xl">{player.avatar}</div>
            <div className="flex-1">
              <h3 className="font-extrabold text-xl text-[#111827]">{player.name}</h3>
              <p className="text-[#7B7F97] font-bold text-sm">Level {player.level}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1.5 text-[#F5B100] font-black">
                <Sparkles size={16} fill="currentColor" />
                <span>{player.exp} XP</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardPage;
