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
import LoaderComponent from './Loader';

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

const MatchRecords = () => {
  const [year, setYear] = useState(0);
  const [matchData, setMatchData] = useState([]);
  const [dataa, setData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true); // Add loading state
  const [fetchData, setFetch] = useState(false);
  const [disable, setDisable] = useState(false);

  const getRandomColor = () => {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  };

  useEffect(() => {
    // if(year<2008 || year>2014){
    //     window.alert("Enter a valid year");
    //     setYear(2000);
    //     return;
    // }
    axios.get(`http://localhost:3000/match-stats/${year}`)
    .then((response) => {
      if (response.data.message === 'No match found') {
        setMatchData([]);
        setLoading(false);
      } else{
        setMatchData(response.data); 
        setLoading(false);
        setFetch(false);
      }
      setDisable(false);
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }, [fetchData]);

  useEffect(() => {
    if (!loading && matchData && matchData.length > 0) { // Check if loading is false and data is available

      const labels = matchData.map((item) => item.team );
      
    //   console.log(typeof(labels));
    //   const datasets = bowlerData.map((item) => ({
    //     // console.log((item))
    //     label: `${item.bestBowler} - Economy`,
    //     data: item.economy,
    //     backgroundColor: getRandomColor(),
    // }));
    const played = matchData.map((item) => item.matchesPlayed);
    const won = matchData.map((item) => item.matchesWon);

    // // console.log(datasets);
      setData({
        labels,
        datasets: [
            {
                label: "Won",
                data: won,
                backgroundColor: getRandomColor(),
                borderColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: "Played",
                data: played,
                backgroundColor: getRandomColor(),
                borderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
      });
    // console.log(bowlerData, "called");
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
      )  : matchData.length === 0 && fetchData ? (
        <div className='text-center mt-10'>
          <p className='text-red-500 text-xl'>Invalid year/No data found</p>
        </div>
      ) : matchData && matchData.length>0 ? (
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

export default MatchRecords;
