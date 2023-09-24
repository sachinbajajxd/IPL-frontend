import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoaderComponent from './Loader';
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

const ExtraRuns = () => {
  const [year, setYear] = useState(0);
  const [runsData, setRunsData] = useState([]);
  const [dataa, setData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true); // Add loading state
  const [fetchData, setFetch] = useState(false);

  const getRandomColor = () => {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/get-extras/${year}`)
    .then((response) => {
      setRunsData(response.data); 
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }, [fetchData]);

  useEffect(() => {
    if (!loading && runsData && runsData.length > 0) { // Check if loading is false and data is available

      const labels = runsData.map((item) => item._id );
      
    const temp = runsData.map((item) => item.totalExtras);

    // // console.log(datasets);
      setData({
        labels,
        datasets: [
            {
                label: "Extra runs",
                data: temp,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
      });
    }
  }, [loading, runsData]);

  const handleClick = (e) => {
    e.preventDefault();
    setFetch(!fetchData);
    setLoading(!loading);
  }

  return (
    <div>

     <form>
        <input placeholder='Enter year' type='number' onChange={(e) => setYear(e.target.value)}/>
        <button onClick={handleClick}>Get Data</button>
     </form>


      {loading && fetchData ? (
        <LoaderComponent />
      ) : (
        <Bar options={options} data={dataa} />
      )}
    </div>
  );
};

export default ExtraRuns;
