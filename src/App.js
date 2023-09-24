import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import EconomicalBowler from './components/EconomicalBowler';
import ExtraRuns from './components/ExtraRuns';
import Navbar from './components/Navbar';
import MatchRecords from './components/MatchRecords';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/extras-conceded" element={<ExtraRuns />} />
          <Route path="/economical-bowler" element={<EconomicalBowler />} />
          <Route path="/win-record" element={<MatchRecords />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
