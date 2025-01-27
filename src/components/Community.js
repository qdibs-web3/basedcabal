import React, { useEffect, useState } from 'react';
import './Community.css';
import trophy from '../assets/trophy.png';
import wwwIcon from '../assets/www.png';
import twitterIcon from '../assets/x.png';
import telegramIcon from '../assets/tg.png';
import API_URL from '../config';

const Community = () => {
  const [coinData, setCoinData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        // Step 1: Fetch coin addresses
        const response = await fetch("/basecoins.json");
        if (!response.ok) throw new Error("Failed to load basecoins.json");
        const coinAddresses = await response.json();

        // Step 2: Fetch Dexscreener data for each coin
        const coinDataPromises = coinAddresses.map(async (coinAddress) => {
          try {
            const apiUrl = `https://api.dexscreener.com/latest/dex/tokens/${coinAddress}`;
            const res = await fetch(apiUrl);
            if (!res.ok) return null;
            const data = await res.json();
            return data?.pairs && data.pairs[0] ? { ...data.pairs[0] } : null;
          } catch (error) {
            console.error(`Error fetching Dexscreener data for ${coinAddress}:`, error);
            return null;
          }
        });

        const coins = await Promise.all(coinDataPromises);
        const filteredCoins = coins.filter(Boolean);

        // Fetch and update votes from MongoDB
        const updateVotes = async () => {
          const updatedData = await Promise.all(
            filteredCoins.map(async (coin) => {
              try {
                const response = await fetch(`${API_URL}/api/votes/${coin.baseToken?.address}`);
                if (!response.ok) throw new Error(`Failed to fetch votes for ${coin.baseToken?.address}`);
                const coinVotes = await response.json();
                return { ...coin, votes: coinVotes.votes || 0 };
              } catch (error) {
                console.error(`Error fetching votes for ${coin.baseToken?.address}:`, error);
                return { ...coin, votes: 0 };
              }
            })
          );
          // Sort coins by votes in descending order and set state
          setCoinData(updatedData.sort((a, b) => b.votes - a.votes));
          setLoading(false);
        };

        updateVotes();

        // Refresh votes every second
        const interval = setInterval(updateVotes, 9000);
        return () => clearInterval(interval);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCoinData();
  }, []);

  if (loading) return <p>Loading Based Communities...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="community-container1">
      <h1>Communities ranked by user upvotes</h1>
      <div className="coin-logos1">
        {coinData.map((coin, index) => (
          <div key={index} className="coin-logo-item1">
            <span className="coin-rank1">#{index + 1}</span>
            <span className="coin-votes"><img src={trophy} alt="trophy" className="trophy-button"></img>{coin.votes}</span>
            <img
              src={coin.info?.imageUrl || '/path/to/default-logo.png'}
              alt={`Logo of ${coin.baseToken?.name || 'Unknown Coin'}`}
              className="coin-logo1"
            />
            <span className="coin-name1">{coin.baseToken?.name || 'N/A'}</span>
            <div className="social-icons">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
