# IPL Cricket Data Analysis Dashboard

A professional, high-performance data analysis dashboard for IPL cricket statistics, built for B.Tech academic projects.

## 🚀 Features
- **Overview Dashboard**: Key performance indicators (KPIs) and historical trends.
- **Team Analysis**: Deep dive into individual team performance across seasons.
- **Toss Analysis**: Statistical evidence of how toss decisions impact match outcomes.
- **Player Analysis**: Top scorers, strike rates, and boundary statistics.
- **Venue Insights**: Analysis of most popular venues and ground-specific trends.
- **Data Explorer**: Advanced filtering and search with CSV export capabilities.
- **Interactive Visualizations**: Powered by Recharts for clear, beautiful insights.
- **Modern UI**: Dark-themed, premium design using Tailwind CSS.

## 🛠️ Technology Stack
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4
- **Visualization**: Recharts
- **Data Parsing**: PapaParse
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📂 Dataset Requirements
To use this dashboard, you need to upload the following CSV files (commonly available on Kaggle):
1. `matches.csv`: Contains match-level details (season, teams, winner, venue, toss).
2. `deliveries.csv`: Contains ball-by-ball details (batsman, runs, extra runs, etc.).

## 💻 Local Setup
1. Clone the repository or download the project files.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser at `http://localhost:3000`.

## 🌐 Deployment
### Streamlit (Alternative Version)
The user originally requested a Streamlit version. This is the **modern React version** which offers better performance and customization for web deployment. If you specifically need Streamlit for your project submission:
- Use the analysis logic in `src/utils/dataProcessor.ts` and port it to Python/Pandas.
- Use `streamlit` and `plotly` in Python.

### Hosting this React App
- **GitHub Pages**: Easy hosting for static React apps.
- **Vercel / Netlify**: Recommended for high performance and automatic deployments from GitHub.

## 📝 Project Workflow
1. **Data Collection**: Sourcing IPL datasets from Kaggle.
2. **Data Cleaning**: Handling missing values and ensuring consistent team names.
3. **Preprocessing**: Transforming CSV rows into structured TypeScript objects.
4. **Analysis**: Calculating aggregates (wins, runs, strike rates).
5. **Visualization**: Mapping processed data to interactive charts.
6. **Dashboarding**: Organizing components into a cohesive user interface.
