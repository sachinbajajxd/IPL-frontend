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

const EconomicalBowler = () => {
  const [year, setYear] = useState(0);
  const [bowlerData, setBowlerData] = useState([]);
  const [dataa, setData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true); // Add loading state
  const [fetchData, setFetch] = useState(false);
  const [disable, setDisable] = useState(false);

  const getRandomColor = () => {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  };

  useEffect(() => {
    axios.get(`https://iplstats-ot1c.onrender.com/economical-bowler/${year}`)
    .then((response) => {
      if (response.data.message === 'No match found') {
        setBowlerData([]);
        setLoading(false);
      } else{
        setBowlerData(response.data); 
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
    if (!loading && bowlerData && bowlerData.length > 0) { // Check if loading is false and data is available
        console.log(typeof(bowlerData));
      const labels = bowlerData.map((item) => `${item.team}  - ${item.bestBowler}` );
      
      console.log(typeof(labels));
    const temp = bowlerData.map((item) => item.economy);

    // // console.log(datasets);
      setData({
        labels,
        datasets: [
            {
                label: "Economy",
                data: temp,
                backgroundColor: getRandomColor(),
                barThickness: 30,
            },
        ],
      });
    console.log("called");
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
      )  : bowlerData.length === 0 && fetchData ? (
        <div className='text-center mt-10'>
          <p className='text-red-500 text-xl'>Invalid year/No data found</p>
        </div>
      ) : bowlerData && bowlerData.length>0 ? (
        // <h1>Foo</h1>
        <div className="w-1/2 h-3/4 m-auto mt-5">
          <h1 className='font-bold'>Best Economy</h1>
          <Bar options={options} data={dataa} />
        </div>
      ) : (
        <div>
        </div>
      )}
    </div>
  );
};

export default EconomicalBowler;
