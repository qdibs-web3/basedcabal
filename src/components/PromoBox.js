// src/components/PromoBox.js
import React from 'react';
import './PromoBox.css';
import discovery from '../assets/navhead.png';

const PromoBox = ({ setPage }) => {
  const handleRankingsClick = () => {
    // Set page to "rankings" when Rankings button is clicked
    setPage("community");
  };

  const handleLearnMoreClick = () => {
    // Set page to "learn" when Learn More button is clicked
    setPage("learn");
  };

  return (
    <div className="promo-box">
      <img src={discovery} alt="Promo Logo" className="promo-logo" />
      <div className="promo-divider"></div> {/* Vertical divider */}
      <div className="promo-content">
        <p>Welcome to the Babal Discovery App—your ultimate hub for uncovering 
          the most active and trending coins on Base, as chosen by the Cabal 
          community! Empower your project and let your community demonstrate their 
          strength through votes. With Babal Discovery, your project has the chance 
          to gain the exposure and recognition it truly deserves. Join the Base Cabal, lets win together.</p>
        <div className="promo-buttons">
          <button onClick={handleRankingsClick}>Communities</button>
          <button onClick={handleLearnMoreClick}>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default PromoBox;
