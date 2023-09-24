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
      display: false,
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
  const [disable, setDisable] = useState(false);

  const getRandomColor = () => {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/get-extras/${year}`)
    .then((response) => {
      if (response.data.message === 'No match found') {
        setRunsData([]);
        setLoading(false);
      } else{
        setRunsData(response.data); 
        setLoading(false);
        setFetch(false);
      }
      setDisable(false);
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
                backgroundColor: getRandomColor(),
                barThickness: 30,
            },
        ],
      });
    }
  }, [loading]);

  const handleClick = (e) => {
    e.preventDefault();
    setFetch(!fetchData);
    setLoading(!loading);
    setDisable(true);
  }

  return (
    <div className='min-h-screen'>

      <div>
      <form className="flex justify-center items-center space-x-4 mt-5">
        <input
          className="border rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-500"
          type="number"
          placeholder="Enter year"
          onChange={(e) => setYear(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          onClick={handleClick}
          disabled={disable}
        >
          Get Stats
        </button>
      </form>
      </div>

      {/* Display loading message while data is loading */}
      {loading  ? (
        <LoaderComponent />
        // <h1>Loading ...</h1>
      )  : runsData.length === 0 && fetchData ? (
        <div className='text-center mt-10'>
          <p className='text-red-500 text-xl'>Invalid year/No data found</p>
        </div>
      ) : runsData && runsData.length>0 ? (
        // <h1>Foo</h1>
        <div className="w-1/2 h-3/4 m-auto mt-5">
          <h1 className='font-bold'>Matches Won VS Matches Played</h1>
          <Bar options={options} data={dataa} />
        </div>
      ) : (
        <div>
        </div>
      )}
    </div>
  );
};

export default ExtraRuns;
