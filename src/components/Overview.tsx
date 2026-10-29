/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo } from 'react';
import { Match, Delivery } from '../types';
import { calculateKPIs, getTeamWins, getSeasonMatches } from '../utils/dataProcessor';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Trophy, Users, Calendar, MapPin, Hash } from 'lucide-react';

interface OverviewProps {
  matches: Match[];
  deliveries: Delivery[];
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#f97316', '#06b6d4'];

export default function Overview({ matches, deliveries }: OverviewProps) {
  const kpis = useMemo(() => calculateKPIs(matches, deliveries), [matches, deliveries]);
  const teamWins = useMemo(() => getTeamWins(matches).slice(0, 8), [matches]);
  const seasonMatches = useMemo(() => getSeasonMatches(matches), [matches]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Matches', value: kpis.totalMatches, icon: Trophy, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          { label: 'Total Teams', value: kpis.totalTeams, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
          { label: 'Total Seasons', value: kpis.totalSeasons, icon: Calendar, color: 'text-amber-400', bg: 'bg-amber-400/10' },
          { label: 'Total Venues', value: kpis.totalVenues, icon: MapPin, color: 'text-purple-400', bg: 'bg-purple-400/10' },
          { label: 'Total Runs', value: kpis.totalRuns.toLocaleString(), icon: Hash, color: 'text-pink-400', bg: 'bg-pink-400/10' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
            <div className={`${kpi.bg} ${kpi.color} w-10 h-10 rounded-lg flex items-center justify-center mb-4`}>
              <kpi.icon className="w-6 h-6" />
            </div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{kpi.label}</p>
            <h3 className="text-2xl font-bold text-white mt-1 tabular-nums">{kpi.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Team-wise Wins Chart */}
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Top Teams by Wins</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamWins} layout="vertical" margin={{ left: 40, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={100} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {teamWins.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Season-wise Matches Chart */}
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Matches per Season</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={seasonMatches}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                <XAxis dataKey="season" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Bar dataKey="matches" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Matches Table */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white">Recent Matches</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Season</th>
                <th className="px-6 py-4 font-semibold">Teams</th>
                <th className="px-6 py-4 font-semibold">Winner</th>
                <th className="px-6 py-4 font-semibold">Venue</th>
                <th className="px-6 py-4 font-semibold">Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {matches.slice(0, 5).map((match, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-300">{match.season}</td>
                  <td className="px-6 py-4 text-sm font-medium text-white">
                    {match.team1} <span className="text-slate-500 font-normal mx-1">vs</span> {match.team2}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-md border border-emerald-500/20">
                      {match.winner}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{match.venue}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {match.win_by_runs > 0 ? `${match.win_by_runs} runs` : `${match.win_by_wickets} wickets`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
