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
  const [data, setData] = useState({ labels: [], datasets: [] });

  const getRandomColor = () => {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#"+randomColor;
  };

  useEffect(() => {
    axios.get('http://localhost:3000/matches-won-by-each-team')
      .then((response) => {
        setMatchesData(response.data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  useEffect(() => {
    if (matchesData && matchesData.length > 0) {
      const labels = matchesData.map((item) => item.year);
      // console.log(labels);
      const matchResults = matchesData.map((item) => item.matchResults);

        // Initialize an object to store results for each team
      const teamResults = {};

      // Loop through the result array
      matchesData.forEach((yearResult) => {
        const year = yearResult.year;
        yearResult.matchResults.forEach((match) => {
          const team = match.team;
          const matchesWon = match.matchesWon;

          // Initialize the team's array if it doesn't exist
          if (!teamResults[team]) {
            teamResults[team] = Array(matchesData.length).fill(0);
          }

          // Set the number of matches won for the corresponding year
          teamResults[team][year - 2008] = matchesWon;
        });
      });

      // Convert the teamResults object to an array of objects with team and data properties
      const teamResultsArray = Object.keys(teamResults).map((team) => ({
        team: team,
        data: teamResults[team],
      }));

      console.log(teamResultsArray);


      const datasets = teamResultsArray.map((teamResult, idx) => ({
        label: teamResult.team,
        data: teamResult.data,
        backgroundColor: getRandomColor(),
      }))
    
      setData({
        labels,
        datasets,
      });
      // console.log(data);
    }
  }, [matchesData]);

  return (
    <div>
      <h2>Matches Won By Each Team</h2>
      {data && data.labels && data.datasets && <Bar options={options} data={data}/>}
    </div>
  );
}

export default MatchesWonByEachTeam;
