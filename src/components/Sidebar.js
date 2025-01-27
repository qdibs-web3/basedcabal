// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';
import flameIcon from '../assets/flame.png';
import logo from '../assets/logoicon.png';
import trophyIcon from '../assets/trophy.png';
import paperIcon from '../assets/paper.png';
import q from '../assets/q.png';
import xIcon from '../assets/x.png';
import coin from '../assets/coins.png';


const Sidebar = ({ setPage, currentPage }) => {
  return (
    <aside className="sidebar">
      <h1>The Based Cabal</h1>
      <button onClick={() => setPage("gems")} className={currentPage === "gems" ? "active" : ""}><img src={logo} alt="Learn More" className="sidebar-icon" /> $BABAL</button> <hr />
      <button onClick={() => setPage("gpt")} className={currentPage === "gpt" ? "active" : ""}><img src={q} alt="Learn More" className="sidebar-icon" /> Stake $BABAL</button> <hr />
      <button onClick={() => setPage("learn")} className={currentPage === "learn" ? "active" : ""}><img src={paperIcon} alt="Learn More" className="sidebar-icon" /> Learn More</button>
      
      {/* Bottom 30%: Text section */}
      <br></br>

      <h1>Babal Discovery</h1>
      <button onClick={() => setPage("all")} className={currentPage === "all" ? "active" : ""}><img src={coin} alt="All Coins" className="sidebar-icon" /> All Listings</button><hr />
      <button onClick={() => setPage("community")} className={currentPage === "community" ? "active" : ""}><img src={trophyIcon} alt="Community Ranking" className="sidebar-icon" /> Rankings</button><hr />
      <button onClick={() => setPage("featured")} className={currentPage === "featured" ? "active" : ""}><img src={flameIcon} alt="Featured" className="sidebar-icon" /> Babal List</button>

      {/* Footer section */}
      <div className="sidebar-footer">
        <div className="footer-item">
          <img src={xIcon} alt="Icon" className="footer-icon" />
          <a href="https://x.com/based_cabal" target="_blank" rel="noopener noreferrer" className="footer-text">
            Babal 2025
          </a>
        </div>
        <div className="footer-item">
          <img src={xIcon} alt="Icon" className="footer-icon" />
          <a href="https://x.com/qdibs_eth" target="_blank" rel="noopener noreferrer" className="footer-text">
            qdibs
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
