import React, { useEffect } from 'react';
import './Learn.css';

const Learn = () => {
  useEffect(() => {
    const image = document.querySelector('.sliding-image');
    let position = 0;
    const moveImage = () => {
      position += 1;
      if (position > window.innerWidth) {
        position = -200; // Reset to the left side
      }
      image.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(moveImage); // Repeating the animation
    };

    moveImage();
  }, []);

  return (
    <div className="learn-more">
      
      <div className="text-content">
        <h1>About Den Discovery</h1>
        <p> - Supporting Meme Coin Projects <br></br>
        The Den Discovery App was developed to provide coin creators with a platform that amplifies visibility and helps meme coin projects gain the spotlight they often need. Listing your project on Den Discovery ensures that it stands out to a larger audience of serious investors who actively search for promising Base projects. This platform, built by Base users for Base users, is designed to foster growth and recognition for projects that demonstrate genuine effort and potential.</p>
        <p> - Intuitive User Interface and Filtering Options <br></br>
        Den Discovery offers a clean and user-friendly interface, enabling seamless navigation through its listed coins. The platform includes a variety of filtering tools that enhance the user experience by allowing investors to sort listings based on specific criteria, such as Name, MarketCap, Volume, Price Change, and more. This functionality ensures that users can quickly find the projects that best align with their investment strategies or interests.</p>
        <p> - Featured Coins for Enhanced Visibility <br></br>
        To further promote visibility, the platform highlights the five most recent Base coins added to Den Discovery in a Featured Coins section. This feature not only helps newer projects gain immediate attention but also offers another avenue for these coins to stand out to potential investors and the wider Based Den community.</p>
        <p> - Community Rankings: Empowering Users <br></br>
        What sets Den Discovery apart is its unique Community Ranking system, which gives users the ability to cast votes for their favorite listed projects. The platform includes a Community Rankings page, where all coins are sorted based on the power and support of their communities. Projects with the most votes are showcased at the top of the rankings, while those with fewer votes appear lower on the list. This system creates a sense of competition and community engagement, encouraging project teams to actively rally their supporters.</p>
        <p> - Transparency and Responsibility <br></br>
        Den coin and Den Discovery emphasizes that $Den and the Based Den do not provide financial advice, urging users to conduct thorough research before making any investment decisions. Additionally, Den Discovery does not facilitate direct token swaps, ensuring a focus on discovery and information. The Based Den explicitly disclaims responsibility for any financial decisions users make, reinforcing the importance of personal accountability in the investment process.</p>
      </div>
      <div className="sliding-image-container">
        <img
          src={require('../assets/learn.png')} // Ensure the image path is correct
          alt="Sliding"
          className="sliding-image"
        />
      </div>
    </div>
  );
};

export default Learn;
