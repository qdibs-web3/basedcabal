import React, { useEffect, useState } from "react";
import "./Gpt.css";
import spin from "../assets/spin.gif";

function Gpt() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countdownDate = 1739007600 * 1000; // Convert epoch to milliseconds
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
    setTimeout(() => setCopyButtonText("Copy CA"), 3000); // Revert after 3 seconds
  };

  return (
    <div className="gems-container">
      <div className="top-section">
        <div className="text-column">
          <h1>Stake with the Base Cabal</h1>
          <p>
            $BABAL, the meme coin inspired by the legendary Base Cabal, offers
            holders more than just a token – it's a key to a thriving and
            rewarding ecosystem. By staking their $BABAL coins, holders can
            unlock compounding rewards in the form of additional $BABAL tokens.
            This staking mechanism not only benefits the individual investor by
            growing their holdings over time but also strengthens the $BABAL
            ecosystem as a whole. Staking helps to reduce market volatility,
            encourage long-term commitment, and create a sustainable cycle of
            growth. As the Base Cabal community grows, $BABAL staking is a
            win-win for everyone involved. Hold, stake, and watch your $BABAL
            stack grow while supporting the coin's mission of building a strong,
            vibrant community supporting Base projects!
          </p>
          <div className="countdown-container">
            <span className="countdown-label">Staking Launch:</span>
            <span className="countdown-timer">
              {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
            </span>
          </div>

          <div className="countdown-container">
            <div className="swap-icons">
              <button
                className="copy-button"
                onClick={() => window.open("https://#", "_blank")}
              >
                Stake $BABAL
              </button>
              <button className="copy-button" onClick={copyToClipboard}>
                {copyButtonText}
              </button>
              <button
                className="copy-button"
                onClick={() => window.open("https://clank.fun", "_blank")}
              >
                Clank.fun
              </button>
            </div>
          </div>
        </div>
        <div className="image-column">
          <img src={spin || "/placeholder.svg"} alt="Spinning logo" />
        </div>
      </div>
    </div>
  );
}

export default Gpt;
