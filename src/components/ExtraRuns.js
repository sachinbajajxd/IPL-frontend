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
      
    //   console.log(typeof(labels));
    //   const datasets = bowlerData.map((item) => ({
    //     // console.log((item))
    //     label: `${item.bestBowler} - Economy`,
    //     data: item.economy,
    //     backgroundColor: getRandomColor(),
    // }));
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
    // console.log(bowlerData, "called");
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

      {/* Display loading message while data is loading */}
      {loading && fetchData ? (
        <p>Loading...</p>
      ) : (
        // <h1>Foo</h1>
        <Bar options={options} data={dataa} />
      )}
    </div>
  );
};

export default ExtraRuns;
