/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo } from 'react';
import { Match } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface TossAnalysisProps {
  matches: Match[];
}

const COLORS = ['#10b981', '#3b82f6'];

export default function TossAnalysis({ matches }: TossAnalysisProps) {
  const tossStats = useMemo(() => {
    const batWins = matches.filter(m => m.toss_decision === 'bat' && m.toss_winner === m.winner).length;
    const batTotal = matches.filter(m => m.toss_decision === 'bat').length;
    const fieldWins = matches.filter(m => m.toss_decision === 'field' && m.toss_winner === m.winner).length;
    const fieldTotal = matches.filter(m => m.toss_decision === 'field').length;

    return [
      { name: 'Bat First', value: batTotal, wins: batWins, winRate: (batWins / batTotal) * 100 },
      { name: 'Field First', value: fieldTotal, wins: fieldWins, winRate: (fieldWins / fieldTotal) * 100 }
    ];
  }, [matches]);

  const tossImpactBySeason = useMemo(() => {
    const seasons = Array.from(new Set(matches.map(m => m.season))).sort();
    return seasons.map(season => {
      const seasonMatches = matches.filter(m => m.season === season);
      const tossWinnerWins = seasonMatches.filter(m => m.toss_winner === m.winner).length;
      return { 
        season, 
        tossWinnerWon: (tossWinnerWins / seasonMatches.length) * 100,
        tossWinnerLost: 100 - (tossWinnerWins / seasonMatches.length) * 100
      };
    });
  }, [matches]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-white">Toss Impact Analysis</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Toss Decisions Distribution</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tossStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {tossStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Toss Winner's Win % by Season</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tossImpactBySeason}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="season" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} unit="%" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                />
                <Legend />
                <Bar name="Toss Winner Won" dataKey="tossWinnerWon" fill="#10b981" stackId="a" radius={[0, 0, 0, 0]} />
                <Bar name="Toss Winner Lost" dataKey="tossWinnerLost" fill="#ef4444" stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
