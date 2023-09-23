import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
    plugins: {
      title: {
        display: true,
        text: "Chart.js Bar Chart - Stacked"
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
};

const MatchesWonByEachTeam = () => {
  const [matchesData, setMatchesData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/matches-won-by-each-team')
      .then((response) => {
        setMatchesData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
    console.log(matchesData);
// //   useEffect(() => {
// //     if (matchesData && matchesData.result) {
      const matchData = matchesData.result;
      const labels = matchData.map((item) => item.year);
//       const matchResults = matchData.matchResults;
//       // Perform any other data processing here
// //     }
// //   }, [matchesData]);
// //   const labels = matchData.map((item) => console.log(item));
// //   const matchResults = matchesData.matchResults;

//   const getRandomColor = () => {
//     const letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < matchResults.length; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

//   const datasets = matchResults.map((item) => ({
//     label: item.team,
//     data: item.matchesWon,
//     backgroundColor: getRandomColor(),
//   }))

// //   const data = {
// //     labels,
// //     datasets,
// //   };

  return (
    <div>
      <h2>Matches Won By Each Team</h2>
      {/* <Bar options={options} data={data}/> */}
    </div>
  );
}

export default MatchesWonByEachTeam;
