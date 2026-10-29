/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LayoutDashboard, Users, User, Trophy, MapPin, Search, Info, BarChart3, Upload } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onUploadClick: () => void;
}

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'team', label: 'Team Analysis', icon: Users },
  { id: 'toss', label: 'Toss Analysis', icon: BarChart3 },
  { id: 'player', label: 'Player Analysis', icon: User },
  { id: 'venue', label: 'Venue Analysis', icon: MapPin },
  { id: 'explorer', label: 'Data Explorer', icon: Search },
  { id: 'about', label: 'About Project', icon: Info },
];

export default function Layout({ children, activeTab, setActiveTab, onUploadClick }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0F172A] border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Trophy className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-white tracking-tight">IPL Analytics</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Dashboard v1.0</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                    activeTab === item.id
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  )}
                >
                  <Icon className={cn(
                    "w-4 h-4 transition-colors",
                    activeTab === item.id ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300"
                  )} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6">
          <button
            onClick={onUploadClick}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors border border-slate-700"
          >
            <Upload className="w-4 h-4" />
            Upload Dataset
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-slate-800 bg-[#0F172A]/50 backdrop-blur-sm sticky top-0 z-10 px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-slate-200 font-medium capitalize">{activeTab.replace('-', ' ')}</span>
          </div>
          <div className="flex items-center gap-4">
             {/* Secondary actions could go here */}
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
