/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function AboutProject() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-10 px-6 text-slate-300">
      <section>
        <h2 className="text-3xl font-bold text-emerald-400 mb-6">Project Documentation</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Abstract</h3>
            <p className="leading-relaxed">
              The Indian Premier League (IPL) is one of the most popular and competitive T20 cricket leagues globally, generating massive amounts of data in every match. This project, "IPL Cricket Data Analysis Dashboard," aims to transform raw match and delivery data into actionable insights through interactive visualizations and comprehensive statistical modeling. By analyzing factors such as toss decisions, team performance, venue dynamics, and player consistency, the dashboard provides a deep understanding of the game's patterns and trends.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Introduction</h3>
            <p className="leading-relaxed">
              In the modern era of sports, data analytics has become an integral part of strategy and performance evaluation. This dashboard serves as a tool for cricket enthusiasts and analysts to explore historical IPL data. It leverages a modern web stack to provide a responsive and interactive experience, allowing users to drill down into specific seasons, teams, and venues.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Problem Statement</h3>
            <p className="leading-relaxed">
              While IPL data is publicly available, it often exists in large CSV files that are difficult for the average fan or student to analyze without programming knowledge. There is a need for a centralized, user-friendly interface that can process this raw data and present it in a visually appealing and easy-to-understand format.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Objectives</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide a high-level overview of IPL history through Key Performance Indicators (KPIs).</li>
              <li>To analyze team performance across different seasons and venues.</li>
              <li>To evaluate the impact of the toss on match outcomes.</li>
              <li>To identify top-performing players based on runs, boundaries, and strike rates.</li>
              <li>To offer a flexible data exploration tool for custom queries.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Methodology</h3>
            <p className="mb-4">The project follows a structured data science workflow:</p>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-mono text-emerald-400">
                <span>Data Collection</span>
                <span className="text-slate-600">→</span>
                <span>Data Cleaning</span>
                <span className="text-slate-600">→</span>
                <span>Preprocessing</span>
                <span className="text-slate-600">→</span>
                <span>Analysis</span>
                <span className="text-slate-600">→</span>
                <span>Visualization</span>
                <span className="text-slate-600">→</span>
                <span>Dashboard</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Tools and Technologies</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800 text-center">
                <span className="block font-bold text-white">React & Vite</span>
                <span className="text-xs text-slate-500">Frontend Framework</span>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800 text-center">
                <span className="block font-bold text-white">Tailwind CSS</span>
                <span className="text-xs text-slate-500">Styling</span>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800 text-center">
                <span className="block font-bold text-white">Recharts</span>
                <span className="text-xs text-slate-500">Visualization</span>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800 text-center">
                <span className="block font-bold text-white">TypeScript</span>
                <span className="text-xs text-slate-500">Data Integrity</span>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800 text-center">
                <span className="block font-bold text-white">PapaParse</span>
                <span className="text-xs text-slate-500">CSV Processing</span>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800 text-center">
                <span className="block font-bold text-white">Lucide React</span>
                <span className="text-xs text-slate-500">Iconography</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Conclusion</h3>
            <p className="leading-relaxed">
              This project demonstrates the power of web-based data visualization in making complex datasets accessible. By analyzing IPL data, we've uncovered significant trends in match outcomes and individual performances. The dashboard provides a robust foundation for further exploration of sports analytics.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Future Scope</h3>
            <p className="leading-relaxed">
              Future iterations of this project could include live API integration for real-time match tracking, advanced predictive modeling for match outcomes, and deeper player analysis using bowling economy and wicket-taking patterns.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
