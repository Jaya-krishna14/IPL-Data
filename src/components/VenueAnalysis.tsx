/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo } from 'react';
import { Match } from '../types';
import { getVenueAnalysis } from '../utils/dataProcessor';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface VenueAnalysisProps {
  matches: Match[];
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#f97316', '#06b6d4'];

export default function VenueAnalysis({ matches }: VenueAnalysisProps) {
  const venueStats = useMemo(() => getVenueAnalysis(matches).slice(0, 15), [matches]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-white">Venue Distribution Analysis</h2>

      <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
        <h3 className="text-lg font-bold text-white mb-6">Top 15 Most Used Venues</h3>
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={venueStats} layout="vertical" margin={{ left: 100, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
              <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} width={180} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {venueStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white">Matches Played by Venue</h3>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-slate-400 uppercase tracking-wider text-[10px] sticky top-0">
              <tr>
                <th className="px-6 py-3">Venue Name</th>
                <th className="px-6 py-3">Total Matches</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {getVenueAnalysis(matches).map((venue, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30">
                  <td className="px-6 py-3 text-white">{venue.name}</td>
                  <td className="px-6 py-3 text-emerald-400 font-bold tabular-nums">{venue.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
