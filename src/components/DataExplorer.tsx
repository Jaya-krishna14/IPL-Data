/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Match } from '../types';
import { Search, Download, Filter, RotateCcw } from 'lucide-react';
import Papa from 'papaparse';

interface DataExplorerProps {
  matches: Match[];
}

export default function DataExplorer({ matches }: DataExplorerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');

  const seasons = useMemo(() => Array.from(new Set(matches.map(m => m.season))).sort((a, b) => b - a), [matches]);
  const teams = useMemo(() => Array.from(new Set([...matches.map(m => m.team1), ...matches.map(m => m.team2)])).sort(), [matches]);

  const filteredMatches = useMemo(() => {
    return matches.filter(m => {
      const matchesSearch = searchTerm === '' || 
        m.team1.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.team2.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.winner?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSeason = selectedSeason === 'all' || m.season.toString() === selectedSeason;
      const matchesTeam = selectedTeam === 'all' || m.team1 === selectedTeam || m.team2 === selectedTeam;

      return matchesSearch && matchesSeason && matchesTeam;
    });
  }, [matches, searchTerm, selectedSeason, selectedTeam]);

  const downloadCSV = () => {
    const csv = Papa.unparse(filteredMatches);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'filtered_ipl_matches.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedSeason('all');
    setSelectedTeam('all');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row gap-4 items-end">
        <div className="flex-1 w-full space-y-2">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Search Matches</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text"
              placeholder="Search team, venue, city, or winner..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="w-full lg:w-48 space-y-2">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Season</label>
          <select 
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Seasons</option>
            {seasons.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="w-full lg:w-64 space-y-2">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">Team</label>
          <select 
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Teams</option>
            {teams.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="flex gap-2 w-full lg:w-auto">
          <button 
            onClick={resetFilters}
            className="flex-1 lg:flex-none p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-5 h-5 mx-auto" />
          </button>
          <button 
            onClick={downloadCSV}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-emerald-500/10"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Match Records</h3>
          <span className="text-xs text-slate-500">Showing {filteredMatches.length} of {matches.length} matches</span>
        </div>
        <div className="overflow-x-auto max-h-[600px]">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-slate-400 uppercase tracking-wider text-[10px] sticky top-0">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Season</th>
                <th className="px-6 py-4">Match</th>
                <th className="px-6 py-4">Winner</th>
                <th className="px-6 py-4">Venue</th>
                <th className="px-6 py-4">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredMatches.map((match) => (
                <tr key={match.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-slate-500 font-mono text-[10px]">{match.id}</td>
                  <td className="px-6 py-4 text-slate-300">{match.season}</td>
                  <td className="px-6 py-4 text-white font-medium">
                    {match.team1} <span className="text-slate-500 font-normal">vs</span> {match.team2}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-emerald-400">{match.winner || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{match.venue}</td>
                  <td className="px-6 py-4 text-slate-300">
                    {match.win_by_runs > 0 ? `Won by ${match.win_by_runs} runs` : `Won by ${match.win_by_wickets} wickets`}
                  </td>
                </tr>
              ))}
              {filteredMatches.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-slate-500">
                    No matches found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
