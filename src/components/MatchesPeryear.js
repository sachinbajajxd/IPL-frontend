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
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const MatchesPerYear = () => {
  const [matchesData, setMatchesData] = useState([]);

  const getRandomColor = () => {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  };

  useEffect(() => {
    axios.get('https://iplstats-ot1c.onrender.com/matches-per-year')
      .then((response) => {
        setMatchesData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const labels = matchesData.map((item) => item._id);
  const numMatches = matchesData.map((item)=> item.totalMatches);

  const data = {
    labels,
    datasets: [
      {
        label: 'Number of matches',
        data: numMatches,
        backgroundColor: getRandomColor(),
        barThickness: 30,
      },
  
    ],
  };

  return (
    <div className="w-1/2 h-2/5 m-auto mt-5">
      <h1 className='font-bold'>Matches Played Per Year</h1>
      <Bar options={options} data={data}/>
    </div>
  );
}

export default MatchesPerYear;
