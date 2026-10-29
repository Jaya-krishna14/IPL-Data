/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Match {
  id: number;
  season: number;
  city: string;
  date: string;
  team1: string;
  team2: string;
  toss_winner: string;
  toss_decision: 'bat' | 'field';
  result: string;
  dl_applied: number;
  winner: string;
  win_by_runs: number;
  win_by_wickets: number;
  player_of_match: string;
  venue: string;
  umpire1: string;
  umpire2: string;
  umpire3: string;
}

export interface Delivery {
  match_id: number;
  inning: number;
  batting_team: string;
  bowling_team: string;
  over: number;
  ball: number;
  batsman: string;
  non_striker: string;
  bowler: string;
  is_super_over: number;
  wide_runs: number;
  bye_runs: number;
  legbye_runs: number;
  noball_runs: number;
  penalty_runs: number;
  batsman_runs: number;
  extra_runs: number;
  total_runs: number;
  player_dismissed: string | null;
  dismissal_kind: string | null;
  fielder: string | null;
}

export interface PlayerStats {
  playerName: string;
  totalRuns: number;
  matchesPlayed: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  ballsFaced: number;
}

export interface TeamStats {
  teamName: string;
  matchesPlayed: number;
  wins: number;
  losses: number;
  tossWins: number;
}
