import React, { useEffect, useState } from "react";
import "./Gems.css";
import spin from "../assets/spin.gif";
import dexs from "../assets/dexs.png";
import dt from "../assets/dt.png";
import us from "../assets/us.png";
import x from "../assets/x.png";
import warp from "../assets/warp.png";

function Gems({ setPage }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });

  useEffect(() => {
    const countdownDate = 1738007600 * 1000; // Convert epoch to milliseconds
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const [copyButtonText, setCopyButtonText] = useState("Copy CA");

  const copyToClipboard = () => {
    navigator.clipboard.writeText("0xCOMINGSOONBABAL");
    setCopyButtonText("Copied!");
    setTimeout(() => setCopyButtonText("Copy CA"), 2000); // Revert after 3 seconds
  };

  const handleStakeBabalClick = () => {
    setPage("gpt");
  };

  return (
    <>
    <div className="gems-container">
      <div className="top-section">
        <div className="text-column">
          <h1>The Based Den</h1>
          <p>
            $DEN on Base is a meme coin marking the launch of the Den Discovery. A tool intended to scale along side $DEN
            coin, Den Discovery will launch with 20 top Base meme coins.
            Each week, $DEN holders will have the chance to vote for 3 new
            projects to be listed on our Base Discovery tool. $DEN is the
            foundation for our growing ecosystem built on Base. Join the journey
            today, Based Den to billions!
          </p>
          <div className="countdown-container">
            <span className="countdown-label">$DEN Launch:</span>
            <span className="countdown-timer">
              {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
            </span>
          </div>
          <div className="countdown-container">
            <div className="swap-icons">
              <button onClick={() => window.open("", "_blank")} aria-label="Warp"><img src={warp || "/placeholder.svg"} alt="Warp" /></button>
              <button onClick={() => window.open("", "_blank")} aria-label="X"><img src={x || "/placeholder.svg"} alt="X" /></button>
              <button onClick={() => window.open("", "_blank")} aria-label="DexScreener"><img src={dexs || "/placeholder.svg"} alt="DexScreener" /></button>
              <button onClick={() => window.open("", "_blank")} aria-label="DexTools"><img src={dt || "/placeholder.svg"} alt="DexTools" /></button>
              <button onClick={() => window.open("", "_blank")} aria-label="UniSwap"><img src={us || "/placeholder.svg"} alt="UniSwap" /></button>
            </div>
          </div>
          <div className="countdown-container">
            <div className="swap-icons">
              <button className="copy-button" onClick={copyToClipboard}>{copyButtonText}</button>
              <button className="copy-button" onClick={() => window.open("https://clank.fun", "_blank")}>Clank.fun</button>
              <button className="copy-button" onClick={handleStakeBabalClick}>Stake $DEN</button>
            </div>
          </div>
        </div>
        <div className="image-column">
          <img src={spin || "/placeholder.svg"} alt="Spinning logo" />
        </div>
      </div>
    </div>

    <div className="gems-container1">
      <h1>Join the $DEN Ecosystem</h1>
      <div className="gems-grid">
        <div className="gem-box">
          <h1>Bridge to Base:</h1>
          <div className="bullet-container">
            <span className="bullet">•</span>
            <p>Bridge your ETH to Base Chain using the Base Bridge.</p>
          </div>
        </div>
        <div className="gem-box">
          <h1>Connect to UniSwap</h1>
          <div className="bullet-container">
            <span className="bullet">•</span>
            <p>Visit Uniswap on Base and connect your wallet.</p>
          </div>
        </div>
        <div className="gem-box">
          <h1>Import $DEN</h1>
          <div className="bullet-container">
            <span className="bullet">•</span>
            <p>Import $DEN token using the contract address.</p>
          </div>
        </div>
        <div className="gem-box">
          <h1>Swap for $DEN</h1>
          <div className="bullet-container">
            <span className="bullet">•</span>
            <p>Swap your ETH for $DEN tokens on Uniswap.</p>
          </div>
        </div>
        <div className="gem-box">
          <h1>Earn More $DEN</h1>
          <div className="bullet-container">
            <span className="bullet">•</span>
            <p>Swap your $DEN to compound your tokens.</p>
          </div>
        </div>
        <div className="gem-box">
          <h1>Be Heard</h1>
          <div className="bullet-container">
            <span className="bullet">•</span>
            <p>Holders vote on new Base coins to list on our tool weekly.</p>
          </div>
        </div>
      </div>
    </div>
  </>
);}

export default Gems;
