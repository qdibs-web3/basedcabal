import React, { useEffect, useState } from 'react';
import './Featured.css';
import wwwIcon from '../assets/www.png';
import twitterIcon from '../assets/x.png';
import telegramIcon from '../assets/tg.png';

const Featured = () => {
  const [coinData, setCoinData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await fetch("/basecoins.json");
        const coinAddresses = await response.json();

        // Get only the last 5 addresses
        const lastFiveAddresses = coinAddresses.slice(-5);

        const coinDataPromises = lastFiveAddresses.map(async (coinAddress) => {
          const apiUrl = `https://api.dexscreener.com/latest/dex/tokens/${coinAddress}`;
          const res = await fetch(apiUrl);
          const data = await res.json();
          return data?.pairs[0];
        });

        const coins = await Promise.all(coinDataPromises);
        setCoinData(coins.filter(Boolean));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coin data:", error);
        setLoading(false);
      }
    };

    fetchCoinData();
  }, []);

  if (loading) return <p>Loading featured listings...</p>;

  return (
    <div className="featured-container">
      <h1>Featured Based Den Listings</h1>
      <div className="featured-cards">
        {coinData.map((coin, index) => (
          <div key={index} className="featured-card">
            <img
              src={coin.info?.imageUrl || '/path/to/default-logo.png'}
              alt={`Logo of ${coin.baseToken?.name || 'Unknown Coin'}`}
              className="featured-logo"
            />
            <h2 className="featured-name">{coin.baseToken?.name || 'N/A'}</h2>
            <h2 className="featured-symbol">${coin.baseToken?.symbol || 'N/A'}</h2>
            <h2 className="featured-24change" style={{ color: coin.priceChange?.h24 > 0 ? '#00ff00' : '#E10600' }}>24h Change {coin.priceChange?.h24}%</h2>
            <div className="social-icons1">
              {coin.info?.websites?.find(site => site.label === "Website")?.url && (
                <a href={coin.info.websites.find(site => site.label === "Website").url} target="_blank" rel="noopener noreferrer">
                  <img src={wwwIcon} alt="Website" className="social-icon1" />
                </a>
              )}
              {coin.info?.socials?.find(social => social.type === "twitter")?.url && (
                <a href={coin.info.socials.find(social => social.type === "twitter").url} target="_blank" rel="noopener noreferrer">
                  <img src={twitterIcon} alt="Twitter" className="social-icon1" />
                </a>
              )}
              {coin.info?.socials?.find(social => social.type === "telegram")?.url && (
                <a href={coin.info.socials.find(social => social.type === "telegram").url} target="_blank" rel="noopener noreferrer">
                  <img src={telegramIcon} alt="Telegram" className="social-icon1" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="sliding-image-container1">
        <img
          src={require('../assets/featured.png')} // Ensure the image path is correct
          alt="Sliding"
          className="sliding-image1"
        />
      </div>
    </div>
  );
};

export default Featured;
