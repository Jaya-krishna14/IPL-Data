/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useMemo, useEffect } from 'react';
import Papa from 'papaparse';
import { Match, Delivery } from './types';
import Layout from './components/Layout';
import Overview from './components/Overview';
import TeamAnalysis from './components/TeamAnalysis';
import TossAnalysis from './components/TossAnalysis';
import PlayerAnalysis from './components/PlayerAnalysis';
import VenueAnalysis from './components/VenueAnalysis';
import DataExplorer from './components/DataExplorer';
import AboutProject from './components/AboutProject';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [matches, setMatches] = useState<Match[]>([]);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load default matches dataset on mount
  useEffect(() => {
    const loadDefaultData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/assets/aistudio/matches_57241c84.csv');
        if (!response.ok) return; // Silent fail if file doesn't exist yet
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results: Papa.ParseResult<Match>) => {
            setMatches(results.data);
            setLoading(false);
          }
        });
      } catch (err) {
        console.error('Failed to load default dataset:', err);
        setLoading(false);
      }
    };

    loadDefaultData();
  }, []);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>, type: 'matches' | 'deliveries') => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<any>) => {
        if (type === 'matches') {
          setMatches(results.data as Match[]);
        } else {
          setDeliveries(results.data as Delivery[]);
        }
        setLoading(false);
      },
      error: (err: Error) => {
        setError(`Error parsing ${file.name}: ${err.message}`);
        setLoading(false);
      }
    });
  }, []);

  const renderContent = () => {
    if (matches.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 border border-slate-700">
            <Upload className="w-10 h-10 text-slate-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No Data Uploaded</h2>
          <p className="text-slate-400 max-w-md mb-8">
            Please upload the <code className="text-emerald-400">matches.csv</code> and <code className="text-emerald-400">deliveries.csv</code> files to start the analysis.
          </p>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/20"
          >
            Upload Datasets
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview': return <Overview matches={matches} deliveries={deliveries} />;
      case 'team': return <TeamAnalysis matches={matches} />;
      case 'toss': return <TossAnalysis matches={matches} />;
      case 'player': return <PlayerAnalysis deliveries={deliveries} />;
      case 'venue': return <VenueAnalysis matches={matches} />;
      case 'explorer': return <DataExplorer matches={matches} />;
      case 'about': return <AboutProject />;
      default: return <Overview matches={matches} deliveries={deliveries} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} onUploadClick={() => setIsUploadOpen(true)}>
      {renderContent()}

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0F172A] border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Upload Datasets</h3>
              <button onClick={() => setIsUploadOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 text-red-400 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Matches Dataset (matches.csv)</label>
                  <div className="relative group">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={(e) => handleFileUpload(e, 'matches')}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className={clsx(
                      "flex items-center gap-3 p-4 rounded-xl border-2 border-dashed transition-all",
                      matches.length > 0 ? "border-emerald-500/50 bg-emerald-500/5" : "border-slate-800 hover:border-emerald-500/30 bg-slate-900/50"
                    )}>
                      <FileText className={clsx("w-8 h-8", matches.length > 0 ? "text-emerald-400" : "text-slate-600")} />
                      <div>
                        <p className="text-sm font-medium text-white">{matches.length > 0 ? `${matches.length} matches loaded` : 'Choose matches.csv'}</p>
                        <p className="text-xs text-slate-500">Required for most charts</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Deliveries Dataset (deliveries.csv)</label>
                  <div className="relative group">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={(e) => handleFileUpload(e, 'deliveries')}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className={clsx(
                      "flex items-center gap-3 p-4 rounded-xl border-2 border-dashed transition-all",
                      deliveries.length > 0 ? "border-emerald-500/50 bg-emerald-500/5" : "border-slate-800 hover:border-emerald-500/30 bg-slate-900/50"
                    )}>
                      <FileText className={clsx("w-8 h-8", deliveries.length > 0 ? "text-emerald-400" : "text-slate-600")} />
                      <div>
                        <p className="text-sm font-medium text-white">{deliveries.length > 0 ? `${deliveries.length} deliveries loaded` : 'Choose deliveries.csv'}</p>
                        <p className="text-xs text-slate-500">Required for player analysis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsUploadOpen(false)}
                disabled={matches.length === 0}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/20"
              >
                Start Analysis
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
