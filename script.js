// Script.js for The Analytical Field

// --- Mock Data ---

const mockLiveScores = [
    {
        league: "Premier League",
        matches: [
            { home: "Arsenal", away: "Liverpool", score: "1 - 1", time: "65'", status: "LIVE" },
            { home: "Man City", away: "Chelsea", score: "2 - 0", time: "FT", status: "Finished" },
            { home: "Brighton", away: "Spurs", score: "0 - 0", time: "12:30", status: "Upcoming" }
        ]
    },
    {
        league: "La Liga",
        matches: [
            { home: "Real Madrid", away: "Sevilla", score: "3 - 1", time: "88'", status: "LIVE" },
            { home: "Barcelona", away: "Girona", score: "2 - 2", time: "FT", status: "Finished" }
        ]
    },
    {
        league: "Champions League",
        matches: [
            { home: "Bayern", away: "PSG", score: "1 - 0", time: "HT", status: "Halftime" },
            { home: "Inter", away: "Atletico", score: "0 - 0", time: "20:00", status: "Upcoming" }
        ]
    }
];

const mockFeatureStats = {
    title: "El Clásico: Possession & Control",
    teams: { home: "Barcelona", away: "Real Madrid" },
    metrics: {
        possession: [55, 45],
        xg: [1.2, 0.8],
        shots: [14, 9],
        passes: [540, 410]
    },
    momentumData: {
        labels: ["0'", "15'", "30'", "45'", "60'", "75'", "90'"],
        home: [10, 25, 40, 35, 60, 50, 80],
        away: [20, 15, 30, 45, 20, 40, 30]
    }
};

console.log("Mock Data Loaded:", mockLiveScores, mockFeatureStats);

// Function to render Daily Updates
function renderDailyUpdates() {
    const tickerContainer = document.getElementById('score-ticker');
    if (!tickerContainer) return;

    tickerContainer.innerHTML = ''; // Clear existing content

    mockLiveScores.forEach(leagueData => {
        const leagueColumn = document.createElement('div');
        leagueColumn.className = 'league-column';

        const header = document.createElement('div');
        header.className = 'league-header';
        header.innerHTML = `<h3>${leagueData.league}</h3>`;
        leagueColumn.appendChild(header);

        leagueData.matches.forEach(match => {
            const matchCard = document.createElement('div');
            matchCard.className = 'match-card';

            const isLive = match.status === 'LIVE' ? 'live' : '';
            let statusText = match.status;

            if (match.status === 'LIVE') {
                statusText = match.time;
            } else if (match.status === 'Upcoming') {
                statusText = match.time;
            }

            matchCard.innerHTML = `
                <div class="match-teams">
                    <span class="team-name">${match.home}</span>
                    <span class="team-name">${match.away}</span>
                </div>
                <div class="match-info">
                    <span class="score">${match.score}</span>
                    <span class="status ${isLive}">${statusText}</span>
                </div>
            `;
            leagueColumn.appendChild(matchCard);
        });

        tickerContainer.appendChild(leagueColumn);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderDailyUpdates();
    renderFeaturedAnalysis();
});

// Function to render Featured Analysis (Graph & Table)
function renderFeaturedAnalysis() {
    // 1. Render Stats Table
    const tableElement = document.getElementById('match-stats-table');
    if (tableElement) {
        const { teams, metrics } = mockFeatureStats;

        let tableHTML = `
            <thead>
                <tr>
                    <th>${teams.home}</th>
                    <th>Metric</th>
                    <th>${teams.away}</th>
                </tr>
            </thead>
            <tbody>
        `;

        for (const [key, values] of Object.entries(metrics)) {
            // Capitalize first letter of key
            const metricName = key.charAt(0).toUpperCase() + key.slice(1);
            tableHTML += `
                <tr>
                    <td class="stat-home">${values[0]}</td>
                    <td class="stat-label">${metricName}</td>
                    <td class="stat-away">${values[1]}</td>
                </tr>
            `;
        }

        tableHTML += '</tbody>';
        tableElement.innerHTML = tableHTML;
    }

    // 2. Render Chart.js Graph
    const ctx = document.getElementById('momentumChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: mockFeatureStats.momentumData.labels,
                datasets: [
                    {
                        label: mockFeatureStats.teams.home,
                        data: mockFeatureStats.momentumData.home,
                        borderColor: '#4CAF50',
                        backgroundColor: 'rgba(76, 175, 80, 0.2)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: mockFeatureStats.teams.away,
                        data: mockFeatureStats.momentumData.away,
                        borderColor: '#FF5252',
                        backgroundColor: 'rgba(255, 82, 82, 0.2)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#fff' }
                    },
                    title: {
                        display: true,
                        text: 'Attack Momentum (Last Match)',
                        color: '#fff',
                        font: { size: 16 }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#333' },
                        ticks: { color: '#888' }
                    },
                    x: {
                        grid: { color: '#333' },
                        ticks: { color: '#888' }
                    }
                }
            }
        });
    }
}
