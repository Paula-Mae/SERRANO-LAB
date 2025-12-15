
const playerRoster = [
  {
    player: "SARAH", 
    role: "Striker", 
    apps: 10,       
    points: [20, 22, 3, 65, 9] 
  },
  {
    player: "John",
    role: "Midfield",
    apps: 12,
    points: [8, 14, 10, 16, 11]
  },
  {
    player: "Eli",
    role: "Striker",
    apps: 8,
    points: [25, 30, 28, 22]
  }
];


class TeamAnalyzer {
  constructor(roster) {
    this.initialRoster = roster;
  }

  
  static computeAvg(dataPoints) {
    const total = dataPoints.reduce((sum, score) => sum + score, 0);
   
    return dataPoints.length > 0 ? total / dataPoints.length : 0;
  }

  
  generateStats() {
    return this.initialRoster.map(player => ({
      ...player,
      avgPoints: TeamAnalyzer.computeAvg(player.points) 
    }));
  }

 
  findTopPerformer(rosterWithStats) {
    
    if (rosterWithStats.length === 0) return null; 

    return rosterWithStats.reduce((best, current) =>
      current.avgPoints > best.avgPoints ? current : best
    );
  }

  
  getPlayersByRole(rosterWithStats, role) {
    return rosterWithStats.filter(player => player.role === role);
  }

  
  segmentByAppearances(rosterWithStats) {
    return {
      
      minimal: rosterWithStats.filter(p => p.apps < 10),
      standard: rosterWithStats.filter(p => p.apps >= 10 && p.apps <= 15),
      frequent: rosterWithStats.filter(p => p.apps > 15)
    };
  }
}


function retrieveExternalData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        player: "Ben",
        role: "Defense",
        apps: 9,
        points: [14, 19, 17, 21]
      });
    }, 1200); 
  });
}


const analyzer = new TeamAnalyzer(playerRoster);

const teamStats = analyzer.generateStats();
console.log("Team Roster with Averages:", teamStats);

const MVP = analyzer.findTopPerformer(teamStats);
console.log("Top Performer (by Avg Points):", MVP);

const strikers = analyzer.getPlayersByRole(teamStats, "Striker");
console.log("Strikers only:", strikers);

const segmentedRoster = analyzer.segmentByAppearances(teamStats);
console.log("Segmented by Apps:", segmentedRoster);

retrieveExternalData().then(newPlayer => {
  console.log("Fetched new external player data:", newPlayer);
});