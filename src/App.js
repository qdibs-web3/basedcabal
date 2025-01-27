// src/App.js
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PromoBox from './components/PromoBox';
import CoinTable from './components/CoinTable';
import FeaturedCoins from './components/Featured';
import Community from './components/Community'; 
import Learn from './components/Learn';
import Movers from './components/Movers';
import Gems from './components/Gems'; // Import Gems component
import Gpt from './components/Gpt'; // Import Gems component
import './App.css';
import ParticlesComponent from './components/ParticlesComponent'; // Import the particles component


function App() {
  const [page, setPage] = useState("gems");
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/basecoins.json");
      const tokens = await response.json();
      const tokenDataPromises = tokens.map(token => fetch(`https://api.dexscreener.com/latest/dex/tokens/${token}`));
      const resolvedData = await Promise.all(tokenDataPromises);
      setData(resolvedData);
    }
    fetchData();
  }, [page]);

  return (
    <div className="app">
      <ParticlesComponent id="tsparticles" /> {/* Add the particles component */}
      <Navbar setPage={setPage} currentPage={page} />
      <div className="main-content">
        <Sidebar setPage={setPage} currentPage={page} />
        <div className="content">
          {page !== "gems" && page !== "gpt" && <Movers />}
          {page !== "gems" && page !== "gpt" && <PromoBox setPage={setPage} />}
          {page === "all" && <CoinTable data={data} />}
          {page === "featured" && <FeaturedCoins data={data} />} 
          {page === "community" && <Community data={data} />}
          {page === "learn" && <Learn data={data} />}
          {page === "gems" && <Gems data={data} />}
          {page === "gpt" && <Gpt data={data} />}
        </div>
      </div>
    </div>
  );
}

export default App;
