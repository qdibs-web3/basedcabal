// src/components/PromoBox.js
import React from 'react';
import './PromoBox.css';
import logobd from '../assets/promo.png';

const PromoBox = ({ setPage }) => {
  const handleAllClick = () => {
    setPage("all");
  };

  const handleRankClick = () => {
    setPage("community");
  };

  const handleFeatClick = () => {
    setPage("featured");
  };

  return (
    <div className="promo-box">
      <img src={logobd} alt="Promo Logo" className="promo-logo" />
      <div className="promo-divider"></div> {/* Vertical divider */}
      <div className="promo-content">
        <p>Welcome to the Den Discovery App—your ultimate hub for uncovering 
          the most active and trending coins on Base, as chosen by the Based Den
          community! Empower your project and let your community demonstrate their 
          strength through votes. With Den Discovery, your project has the chance 
          to gain the exposure and recognition it truly deserves. Join the Based Den, lets win together.</p>
        <div className="promo-buttons">
          <button onClick={handleAllClick}>All Listings</button>
          <button onClick={handleRankClick}>Rankings</button>
          <button onClick={handleFeatClick}>Featured</button>
        </div>
      </div>
    </div>
  );
};

export default PromoBox;
