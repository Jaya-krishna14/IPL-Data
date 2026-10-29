/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo } from 'react';
import { Delivery } from '../types';
import { getPlayerStats } from '../utils/dataProcessor';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PlayerAnalysisProps {
  deliveries: Delivery[];
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#f97316', '#06b6d4'];

export default function PlayerAnalysis({ deliveries }: PlayerAnalysisProps) {
  const topScorers = useMemo(() => getPlayerStats(deliveries).slice(0, 10), [deliveries]);

  if (deliveries.length === 0) {
    return (
      <div className="bg-slate-900/50 border border-slate-800 p-12 rounded-2xl text-center">
        <h3 className="text-xl font-bold text-white mb-2">Detailed Player Analysis Unavailable</h3>
        <p className="text-slate-400">Please upload <code className="text-emerald-400">deliveries.csv</code> to view player statistics including runs, fours, and sixes.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-white">Top Performing Players</h2>

      <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-white mb-6">Top 10 Run Scorers</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topScorers}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="playerName" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
              />
              <Bar dataKey="totalRuns" radius={[4, 4, 0, 0]}>
                {topScorers.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Boundaries Comparison</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topScorers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="playerName" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} angle={-45} textAnchor="end" height={60} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Bar name="Fours" dataKey="fours" fill="#10b981" stackId="a" radius={[0, 0, 0, 0]} />
                <Bar name="Sixes" dataKey="sixes" fill="#3b82f6" stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h3 className="text-lg font-bold text-white">Top 10 Player Stats</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/50 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-3">Player</th>
                  <th className="px-4 py-3">Runs</th>
                  <th className="px-4 py-3">SR</th>
                  <th className="px-4 py-3">4s/6s</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {topScorers.map((player, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-medium text-white">{player.playerName}</td>
                    <td className="px-4 py-3 text-slate-300 tabular-nums">{player.totalRuns}</td>
                    <td className="px-4 py-3 text-emerald-400 tabular-nums">{player.strikeRate.toFixed(1)}</td>
                    <td className="px-4 py-3 text-slate-400 tabular-nums">{player.fours}/{player.sixes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
