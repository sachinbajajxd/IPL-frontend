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
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const MatchRecords = () => {
  const [year, setYear] = useState(2010);
  const [matchData, setMatchData] = useState([]);
  const [dataa, setData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true); // Add loading state
  const [fetchData, setFetch] = useState(false);

  const getRandomColor = () => {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  };

  useEffect(() => {
    if(year<2008 || year>2014){
        window.alert("Enter a valid year");
        setYear(2000);
        return;
    }
    axios.get(`http://localhost:3000/match-stats/${year}`)
    .then((response) => {
      setMatchData(response.data); 
      setLoading(false);
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
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: "Played",
                data: played,
                backgroundColor: 'rgba(25, 90, 32, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
      });
    // console.log(bowlerData, "called");
    }
  }, [loading, matchData]);

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
        <LoaderComponent />
        // <h1>Loading ...</h1>
      ) : (
        // <h1>Foo</h1>
        <Bar options={options} data={dataa} />
      )}
    </div>
  );
};

export default MatchRecords;
