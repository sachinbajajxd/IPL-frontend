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
  const [data, setData] = useState({});

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
      const matchResults = matchesData.map((item) => item.matchResults);
      // console.log(labels);
      // console.log(matchResults);
      // Perform any other data processing here

      const getRandomColor = () => {
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        return "#"+randomColor;
      };

      const datasets = matchResults.map((item, idx) => (

        // label: item[0].team,
        // data: item[.matchesWon,
        // backgroundColor: getRandomColor(),
        console.log(item)
     ))
      // console.log("FOO", matchResults);

      // const datasets = matchesData.map((item) => console.log(item.matchResults));
      // console.log(datasets);
      // setData({
      //   labels,
      //   datasets: datasets,
      // });
      // console.log(data);
    }
  }, [matchesData]);
//   const labels = matchData.map((item) => console.log(item));
//   const matchResults = matchesData.matchResults;


  

  return (
    <div>
      <h2>Matches Won By Each Team</h2>
      {data && data.labels && data.datasets && <Bar options={options} data={data}/>}
      {console.log(data)}
      {/* {matchesData && matchesData.map((yearData, index) => (
        <div key={index}>
          <h2>Year {yearData.year}</h2>
          <ul>
            {yearData.matchResults.map((matchResult, matchIndex) => (
              <li key={matchIndex}>
                {matchResult.team}: {matchResult.matchesWon} matches won
              </li>
            ))}
          </ul>
        </div>
      ))} */}
    </div>
  );
}

export default MatchesWonByEachTeam;
