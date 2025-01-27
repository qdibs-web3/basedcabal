// src/components/Movers.js
import React, { useState, useEffect } from 'react';
import './Movers.css';
import dexIcon from '../assets/dexs.png'; // Assuming you have a dexIcon image

const Movers = () => {
  const [moversData, setMoversData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/basecoins.json");
        const tokens = await response.json();

        // Get the last 5 coin addresses from basecoins.json
        const lastFiveTokens = tokens.slice(-5);

        // Fetch token data from the API for each address
        const tokenDataPromises = lastFiveTokens.map(async (token) => {
          const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${token}`);
          const data = await res.json();
          return data?.pairs[0] || null; // Handle null if no data is found
        });

        const resolvedData = await Promise.all(tokenDataPromises);
        const sortedData = resolvedData
          .filter(Boolean) // Remove any null responses
          .sort((a, b) => b.priceChange?.h24 - a.priceChange?.h24); // Sort by price change (highest first)

        // Set the token data, sorted by price change
        setMoversData(sortedData);
      } catch (error) {
        console.error("Error fetching movers data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="movers-container">
      <div className="movers-slider">
        {moversData.map((coin, index) => (
          <div key={index} className="mover-item">
            <div className="coin-content">
              <img src={coin.info?.imageUrl || ''} alt={coin.baseToken?.name} className="coin-logo" />
              <span className="coin-name">{coin.baseToken?.name || 'N/A'}</span>
              <span className="price-change" style={{ color: coin.priceChange?.h24 > 0 ? '#00ff00' : '#E10600' }}>
                {coin.priceChange?.h24}%
              </span>
              <a href={coin.url || '#'} target="_blank" rel="noopener noreferrer">
                <img src={dexIcon} alt="Dex" className="dex-icon" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movers;
