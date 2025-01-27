import React, { useEffect, useState } from 'react';
import './CoinTable.css';
import trophyIcon from '../assets/trophy.png';
import wwwIcon from '../assets/www.png';
import twitterIcon from '../assets/x.png';
import telegramIcon from '../assets/tg.png';
import dexIcon from '../assets/dexs.png';
import API_URL from '../config';

const CoinTable = () => {
  const [data, setData] = useState([]);
  const [sortMethod, setSortMethod] = useState("votes");
  const [cooldownMessage, setCooldownMessage] = useState(null); // Updated for structured message

  // Fetch coin data and API information
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/basecoins.json");
        const tokens = await response.json();

        const tokenDataPromises = tokens.map(async (token) => {
          const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${token}`);
          const data = await res.json();
          const matchedPair = data?.pairs?.find(pair => pair.baseToken?.address === token);

          return matchedPair ? { ...matchedPair, tokenAddress: token } : null;
        });

        const tokenData = (await Promise.all(tokenDataPromises)).filter(Boolean);
        setData(tokenData);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchData();
  }, []);

  // Fetch the vote count for each coin from the backend
  useEffect(() => {
    const fetchVotes = async () => {
      const updatedData = await Promise.all(
        data.map(async (coin) => {
          const response = await fetch(`${API_URL}/api/votes/${coin.baseToken?.address}`);
          const coinData = await response.json();
          return { ...coin, votes: coinData.votes }; // Make sure to add votes directly here
        })
      );
      setData(updatedData);
    };
  
    const interval = setInterval(fetchVotes, 1000); // Update vote count every second
  
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [data]);

  

  // Sort data based on selected sorting method
  const sortData = () => {
    let sortedData = [...data];
    switch (sortMethod) {
      case "name":
        sortedData.sort((a, b) => (a.baseToken?.name || '').localeCompare(b.baseToken?.name || ''));
        break;
      case "votes":
        sortedData.sort((a, b) => (b.votes || 0) - (a.votes || 0));  // Fix: access coin.votes directly
        break;
      case "volume":
        sortedData.sort((a, b) => (b.volume?.h24 || 0) - (a.volume?.h24 || 0));
        break;
      case "marketCap":
        sortedData.sort((a, b) => (b.marketCap || 0) - (a.marketCap || 0));
        break;
      case "priceChange":
        sortedData.sort((a, b) => (b.priceChange?.h24 || 0) - (a.priceChange?.h24 || 0));
        break;
      default:
        break;
    }
    return sortedData;
  };

  // Handle upvote button click
  const handleUpvote = async (coinAddress, coinName) => {
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const { ip } = await ipResponse.json();

      const voteData = JSON.parse(localStorage.getItem('coinVotes')) || {};
      const lastVote = voteData[ip]?.[coinAddress];

      const now = Date.now();
      const cooldownTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (lastVote && now - lastVote < cooldownTime) {
        const timeLeft = cooldownTime - (now - lastVote);
        const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000));
        const minutesLeft = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
        setCooldownMessage({ coinName, hoursLeft, minutesLeft });
        return;
      }

      const response = await fetch(`${API_URL}/api/votes/${coinAddress}`, {
        method: 'POST',
      });

      if (response.ok) {
        const updatedCoin = await response.json();

        voteData[ip] = { ...voteData[ip], [coinAddress]: now };
        localStorage.setItem('coinVotes', JSON.stringify(voteData));

        setData((prevData) =>
          prevData.map((coin) =>
            coin.tokenAddress === coinAddress
              ? { ...coin, votes: updatedCoin.votes }
              : coin
          )
        );

        setCooldownMessage(null); // Reset cooldown message after successful vote
      } else {
        console.error('Failed to update vote count');
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  };
  
  return (
    <div className="coinTable-container">
      <h1>All Babal Listings</h1>
      {cooldownMessage && (
        <h1 style={{ color: 'white', fontSize: '1.2em', margin: '10px 0' }}>
          You already voted for {cooldownMessage.coinName} today, vote again in {cooldownMessage.hoursLeft}h {cooldownMessage.minutesLeft}m.
        </h1>
      )}
      <p className="filter-buttons">
        Filter: 
        <button className={`filter-button ${sortMethod === "votes" ? 'active' : ''}`} onClick={() => setSortMethod("votes")}>Upvotes</button>
        <button className={`filter-button ${sortMethod === "name" ? 'active' : ''}`} onClick={() => setSortMethod("name")}>Name (A-Z)</button>
        <button className={`filter-button ${sortMethod === "volume" ? 'active' : ''}`} onClick={() => setSortMethod("volume")}>Volume</button>
        <button className={`filter-button ${sortMethod === "marketCap" ? 'active' : ''}`} onClick={() => setSortMethod("marketCap")}>MCap</button>
        <button className={`filter-button ${sortMethod === "priceChange" ? 'active' : ''}`} onClick={() => setSortMethod("priceChange")}>24h %</button>
      </p>
  
      <table className="coinTable">
        <thead>
          <tr>
            <th>Upvote</th>
            <th>All Listings</th>
            <th>Symbol</th>
            <th>Price (USD)</th>
            <th>5m</th>
            <th>1h</th>
            <th>6h</th>
            <th>24h</th>
            <th>Volume 24h</th>
            <th>Market Cap</th>
            <th>Dex</th>
            <th>Socials</th>
          </tr>
        </thead>
        <tbody>
          {sortData().map((coin) => (
            <tr key={coin.baseToken?.address}>
              <td>
                <button onClick={() => handleUpvote(coin.baseToken?.address, coin.baseToken?.name)}>
                  <img src={trophyIcon} alt="Upvote" className="vote-icon" />
                </button>
                <span>{coin.votes || 0}</span>
              </td>
              <td>
                <img src={coin.info?.imageUrl || ''} alt="Logo" className="coin-logo" />
                <span className="coin-name">{coin.baseToken?.name || 'N/A'}</span>
              </td>
              <td>{coin.baseToken?.symbol ? `$${coin.baseToken.symbol}` : 'N/A'}</td>
              <td>${parseFloat(coin.priceUsd).toFixed(8)}</td>
              <td className="price-change" style={{ color: coin.priceChange?.m5 > 0 ? '#00ff00' : '#ff3e39' }}>{coin.priceChange?.m5}%</td>
              <td className="price-change" style={{ color: coin.priceChange?.h1 > 0 ? '#00ff00' : '#ff3e39' }}>{coin.priceChange?.h1}%</td>
              <td className="price-change" style={{ color: coin.priceChange?.h6 > 0 ? '#00ff00' : '#ff3e39' }}>{coin.priceChange?.h6}%</td>
              <td className="price-change" style={{ color: coin.priceChange?.h24 > 0 ? '#00ff00' : '#ff3e39' }}>{coin.priceChange?.h24}%</td>
              <td>{coin.volume?.h24 ? `$${coin.volume.h24.toLocaleString()}` : '$0'}</td>
              <td>{coin.marketCap ? `$${coin.marketCap.toLocaleString()}` : 'N/A'}</td>
              <td>
                <a href={coin.url} target="_blank" rel="noopener noreferrer">
                  <img src={dexIcon} alt="DEX" className="social-icon" />
                </a>
              </td>
              <td>
                {coin.info?.websites?.find(site => site.label === "Website")?.url && (
                  <a href={coin.info.websites.find(site => site.label === "Website").url} target="_blank" rel="noopener noreferrer">
                    <img src={wwwIcon} alt="Website" className="social-icon" />
                  </a>
                )}
                {coin.info?.socials?.find(social => social.type === "twitter")?.url && (
                  <a href={coin.info.socials.find(social => social.type === "twitter").url} target="_blank" rel="noopener noreferrer">
                    <img src={twitterIcon} alt="Twitter" className="social-icon" />
                  </a>
                )}
                {coin.info?.socials?.find(social => social.type === "telegram")?.url && (
                  <a href={coin.info.socials.find(social => social.type === "telegram").url} target="_blank" rel="noopener noreferrer">
                    <img src={telegramIcon} alt="Telegram" className="social-icon" />
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;