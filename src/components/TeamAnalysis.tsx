/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from 'react';
import { Match } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';

interface TeamAnalysisProps {
  matches: Match[];
}

export default function TeamAnalysis({ matches }: TeamAnalysisProps) {
  const teams = useMemo(() => Array.from(new Set([...matches.map(m => m.team1), ...matches.map(m => m.team2)])).sort(), [matches]);
  const [selectedTeam, setSelectedTeam] = useState(teams[0] || '');

  const teamPerformanceBySeason = useMemo(() => {
    if (!selectedTeam) return [];
    const seasons = Array.from(new Set(matches.map(m => m.season))).sort();
    return seasons.map(season => {
      const seasonMatches = matches.filter(m => m.season === season && (m.team1 === selectedTeam || m.team2 === selectedTeam));
      const wins = seasonMatches.filter(m => m.winner === selectedTeam).length;
      return { season, matches: seasonMatches.length, wins, winRate: seasonMatches.length > 0 ? (wins / seasonMatches.length) * 100 : 0 };
    });
  }, [matches, selectedTeam]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Team Performance Analysis</h2>
        <select 
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="bg-slate-900 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {teams.map(team => <option key={team} value={team}>{team}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Matches vs Wins by Season</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamPerformanceBySeason}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="season" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Legend iconType="circle" />
                <Bar name="Matches Played" dataKey="matches" fill="#334155" radius={[4, 4, 0, 0]} />
                <Bar name="Wins" dataKey="wins" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Win Rate (%) Trend</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={teamPerformanceBySeason}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="season" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="winRate" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
