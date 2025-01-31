import { useEffect, useState } from "react";
import { ThirdwebProvider, ConnectWallet, useAddress, useContract } from "@thirdweb-dev/react";
import "./Gpt.css";

function GptContent() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Check if the wallet is connected
  const address = useAddress();

  // Initialize the contract for the $BABAL token (contract address)
  const tokenContractAddress = "0x940181a94A35A4569E4529A3CDfB74e38FD98631";
  const { contract: tokenContract, isLoading: isTokenContractLoading } = useContract(tokenContractAddress, "token");

  // State for token balance
  const [tokenBalance, setTokenBalance] = useState(0);
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);

  // Fetch token balance when wallet is connected
  useEffect(() => {
    if (address && tokenContract) {
      const getBalance = async () => {
        setIsBalanceLoading(true);
        try {
          const balance = await tokenContract.balanceOf(address);
          setTokenBalance(balance.displayValue); // Use displayValue for user-friendly output
        } catch (error) {
          console.error("Error fetching token balance:", error);
        } finally {
          setIsBalanceLoading(false);
        }
      };
      getBalance();
    }
  }, [address, tokenContract]);

  // Countdown timer logic
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

  // Copy to clipboard logic
  const [copyButtonText, setCopyButtonText] = useState("Copy CA");
  const copyToClipboard = () => {
    navigator.clipboard.writeText(tokenContractAddress);
    setCopyButtonText("Copied!");
    setTimeout(() => setCopyButtonText("Copy CA"), 3000); // Revert after 3 seconds
  };

  // Handle undefined token contract
  if (!tokenContract && !isTokenContractLoading) {
    return <div>Error: Token contract not found or invalid token address.</div>;
  }

  return (
    <div className="gems-container">
      <div className="top-section" style={{ display: 'flex', width: '100%' }}>
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
              <button className="copy-button">Stake $BABAL</button>
              <button className="copy-button" onClick={copyToClipboard}>
                {copyButtonText}
              </button>
              <button className="copy-button">Clank.fun</button>
            </div>
          </div>
        </div>

        {/* Vertical Blue Line */}
        <div className="vertical-line"></div>

        {/* Embed Section */}
        <div className="image-column">
          <style>
            {`
              #dexscreener-embed{
                position:relative;
                width:90%;
              }
              @media(min-width:1400px){
                #dexscreener-embed{
                  padding-bottom:65%;
                }
              }
              #dexscreener-embed iframe{
                position:absolute;
                width:100%;
                height:100%;
                top:0;
                left:0;
                border:0;
                border-radius: 20px
              }
            `}
          </style>
          <div id="dexscreener-embed">
            <iframe
              src="https://dexscreener.com/base/0x20CB8f872ae894F7c9e32e621C186e5AFCe82Fd0?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15"
              title="Dexscreener Embed"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Second Container Below the First */}
      <div className="gems-container second-container">
        <div className="wallet-connect-button" style={{ position: 'absolute', top: 10, right: 10 }}>
          <ConnectWallet />
        </div>

        <div className="header-message" style={{ textAlign: 'center', width: '100%' }}>
          {address ? (
            isBalanceLoading ? (
              <h1>Loading $BABAL balance...</h1>
            ) : tokenBalance > 0 ? (
              <h1>Welcome, {address}</h1>
            ) : (
              <h1>You need $BABAL to view this Page</h1>
            )
          ) : (
            <h1>Please Connect Wallet</h1>
          )}
        </div>
      </div>
    </div>
  );
}

function Gpt() {
  return (
    <ThirdwebProvider
      activeChain="base" // Ensure this matches the chain of your token
      clientId="dd0039cdda061eefc600ead89d21880f" // Replace with your actual client ID
    >
      <GptContent />
    </ThirdwebProvider>
  );
}

export default Gpt;
