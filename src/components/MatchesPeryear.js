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
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const MatchesPerYear = () => {
  const [matchesData, setMatchesData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/matches-per-year')
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
        label: 'Dataset 1',
        data: numMatches,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
  
    ],
  };

  return (
    <div>
      <h2>Matches Played Per Year</h2>
      <Bar options={options} data={data}/>
    </div>
  );
}

export default MatchesPerYear;
