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
import Gems from './components/Gems';
import Gpt from './components/Gpt';
import Chad from './components/Chad'; // Import Chad component
import './App.css';
import ParticlesComponent from './components/ParticlesComponent';

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
      <ParticlesComponent id="tsparticles" />
      <Navbar setPage={setPage} currentPage={page} />
      <div className="main-content">
        <Sidebar setPage={setPage} currentPage={page} />
        <div className="content">
          {page !== "gems" && page !== "gpt" && page !== "chad" && <Movers />}
          {page !== "gems" && page !== "gpt" && page !== "chad" && <PromoBox setPage={setPage} />}
          {page === "all" && <CoinTable data={data} />}
          {page === "featured" && <FeaturedCoins data={data} />} 
          {page === "community" && <Community data={data} />}
          {page === "learn" && <Learn data={data} />}
          {page === "gems" && <Gems data={data} />}
          {page === "gpt" && <Gpt data={data} />}
          {page === "chad" && <Chad data={data} />}
        </div>
      </div>
    </div>
  );
}

export default App;
