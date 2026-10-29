/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Match, Delivery, PlayerStats, TeamStats } from '../types';

export function calculateKPIs(matches: Match[], deliveries: Delivery[]) {
  const totalMatches = matches.length;
  const teams = new Set([...matches.map(m => m.team1), ...matches.map(m => m.team2)]);
  const seasons = new Set(matches.map(m => m.season));
  const venues = new Set(matches.map(m => m.venue));
  const totalRuns = deliveries.reduce((sum, d) => sum + (Number(d.total_runs) || 0), 0);

  return {
    totalMatches,
    totalTeams: teams.size,
    totalSeasons: seasons.size,
    totalVenues: venues.size,
    totalRuns
  };
}

export function getTeamWins(matches: Match[]) {
  const wins: Record<string, number> = {};
  matches.forEach(m => {
    if (m.winner) {
      wins[m.winner] = (wins[m.winner] || 0) + 1;
    }
  });
  return Object.entries(wins)
    .map(([name, count]) => ({ name, value: count }))
    .sort((a, b) => b.value - a.value);
}

export function getSeasonMatches(matches: Match[]) {
  const seasonCounts: Record<number, number> = {};
  matches.forEach(m => {
    seasonCounts[m.season] = (seasonCounts[m.season] || 0) + 1;
  });
  return Object.entries(seasonCounts)
    .map(([season, count]) => ({ season: Number(season), matches: count }))
    .sort((a, b) => a.season - b.season);
}

export function getPlayerStats(deliveries: Delivery[]): PlayerStats[] {
  const stats: Record<string, any> = {};

  deliveries.forEach(d => {
    const name = d.batsman;
    if (!stats[name]) {
      stats[name] = {
        playerName: name,
        totalRuns: 0,
        matchesPlayedSet: new Set(),
        fours: 0,
        sixes: 0,
        ballsFaced: 0
      };
    }

    const s = stats[name];
    s.totalRuns += Number(d.batsman_runs) || 0;
    s.matchesPlayedSet.add(d.match_id);
    if (d.batsman_runs === 4) s.fours += 1;
    if (d.batsman_runs === 6) s.sixes += 1;
    if (d.extra_runs === 0 || d.extra_runs === null) {
        // Technically wide balls don't count as balls faced for batsman
        s.ballsFaced += 1;
    }
  });

  return Object.values(stats).map((s: any) => ({
    playerName: s.playerName,
    totalRuns: s.totalRuns,
    matchesPlayed: s.matchesPlayedSet.size,
    fours: s.fours,
    sixes: s.sixes,
    ballsFaced: s.ballsFaced,
    strikeRate: s.ballsFaced > 0 ? (s.totalRuns / s.ballsFaced) * 100 : 0
  })).sort((a, b) => b.totalRuns - a.totalRuns);
}

export function getTossAnalysis(matches: Match[]) {
  const tossDecisionWins = {
    bat: { wins: 0, total: 0 },
    field: { wins: 0, total: 0 }
  };

  matches.forEach(m => {
    if (m.toss_decision === 'bat' || m.toss_decision === 'field') {
      tossDecisionWins[m.toss_decision].total += 1;
      if (m.toss_winner === m.winner) {
        tossDecisionWins[m.toss_decision].wins += 1;
      }
    }
  });

  return [
    { name: 'Bat First', value: tossDecisionWins.bat.total, winRate: (tossDecisionWins.bat.wins / tossDecisionWins.bat.total) * 100 },
    { name: 'Field First', value: tossDecisionWins.field.total, winRate: (tossDecisionWins.field.wins / tossDecisionWins.field.total) * 100 }
  ];
}

export function getVenueAnalysis(matches: Match[]) {
  const venueStats: Record<string, number> = {};
  matches.forEach(m => {
    venueStats[m.venue] = (venueStats[m.venue] || 0) + 1;
  });
  return Object.entries(venueStats)
    .map(([name, count]) => ({ name, value: count }))
    .sort((a, b) => b.value - a.value);
}
