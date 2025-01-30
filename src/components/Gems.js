import React, { useEffect, useState } from "react";
import "./Gems.css";
import spin from "../assets/spin.gif";
import logo from "../assets/logoicon.png";
import dexs from "../assets/dexs.png";
import dt from "../assets/dt.png";
import us from "../assets/us.png";
import x from "../assets/x.png";
import warp from "../assets/warp.png";

const cards = [
  {
    id: 1,
    image: logo,
    header: "$BABALNOMICS",
    content: [
      "0% Taxes / LP Burned",
      "1,000,000,000 Supply",
      "Contract Renounced",
    ],
  },
  {
    id: 2,
    image: logo,
    header: "Join the Based Cabal",
    content: [
      "Create and fund a Base compatible wallet with Base ETH",
      "Swap Base $ETH for $BABAL on your favorite dex",
      "CA: 0xCOMINGSOONBABALBASECABAL",
    ],
  },
  {
    id: 3,
    image: logo,
    header: "Babal Discovery",
    content: [
      "The Based Cabal will vote on new BABAL discovery listings weekly",
      "Users can upvote their favorite Base coin listing once per day",
      "The discovery app lets users find Cabal voted gems on Base, all while showcasing the strength of our own, $BABAL!",
    ],
  },
];

function Gems() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
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

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const previousCard = () => {
    setCurrentCardIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };

  const activeCard = cards[currentCardIndex];

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
          <h1>The Base Cabal</h1>
          <p>
            $BABAL on Base is a meme coin marking the launch of the Babal Cabal
            and Babal Discovery. A tool intended to scale along side $Babal
            coin, the coin discovery will launch with 20 top Base meme coins.
            Each week, Base Cabal holders will have the chance to vote for 3 new
            projects to be listed on our Base Discovery tool. $BABAL is the
            foundation for our growing ecosystem built on Base. Join the journey
            today, BABAL the Based Cabal to billions!
          </p>
          <div className="countdown-container">
            <span className="countdown-label">$BABAL Launch:</span>
            <span className="countdown-timer">
              {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
            </span>
          </div>
          <div className="countdown-container">
            <div className="swap-icons">
              <button
                onClick={() => window.open("", "_blank")}
                aria-label="Warp"
              >
                <img src={warp || "/placeholder.svg"} alt="Warp" />
              </button>
              <button onClick={() => window.open("", "_blank")} aria-label="X">
                <img src={x || "/placeholder.svg"} alt="X" />
              </button>
              <button
                onClick={() => window.open("", "_blank")}
                aria-label="DexScreener"
              >
                <img src={dexs || "/placeholder.svg"} alt="DexScreener" />
              </button>
              <button
                onClick={() => window.open("", "_blank")}
                aria-label="DexTools"
              >
                <img src={dt || "/placeholder.svg"} alt="DexTools" />
              </button>
              <button
                onClick={() => window.open("", "_blank")}
                aria-label="UniSwap"
              >
                <img src={us || "/placeholder.svg"} alt="UniSwap" />
              </button>
            </div>
          </div>
          <div className="countdown-container">
            <div className="swap-icons">
              <button className="copy-button" onClick={copyToClipboard}>
                {copyButtonText}
              </button>
              <button
                className="copy-button"
                onClick={() => window.open("https://clank.fun", "_blank")}
              >
                Clank.fun
              </button>
              <button
                className="copy-button"
                onClick={() => window.open("https://#", "_blank")}
              >
                Stake $BABAL
              </button>
            </div>
          </div>
        </div>
        <div className="image-column">
          <img src={spin || "/placeholder.svg"} alt="Spinning logo" />
        </div>
      </div>

      <div className="card-slider">
        <div className="card">
          <img src={activeCard.image || "/placeholder.svg"} alt="Card Icon" />
          <div className="card-details">
            <h2 className="card-header">{activeCard.header}</h2>
            <ul className="bullet-points">
              {activeCard.content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="arrows-container">
            <button
              className="arrow left-arrow"
              onClick={previousCard}
              aria-label="Previous card"
            >
              &#8592;
            </button>
            <button
              className="arrow right-arrow"
              onClick={nextCard}
              aria-label="Next card"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gems;
