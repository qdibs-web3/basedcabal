import { useEffect, useState } from "react";
import {
  ThirdwebProvider,
  ConnectWallet,
  useAddress,
  useContract,
} from "@thirdweb-dev/react";
import { ThirdwebSDKProvider } from '@thirdweb-dev/react'; 
import "./Gpt.css";

function GptContent() {
  const [copyButtonText, setCopyButtonText] = useState("Copy CA");
  const tokenContractAddress = "0x940181a94A35A4569E4529A3CDfB74e38FD98631";

  const address = useAddress();
  const { contract: tokenContract, isLoading: isTokenContractLoading } =
    useContract(tokenContractAddress, "token");

  const [tokenBalance, setTokenBalance] = useState(0);
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);
  const [claimableRewards, setClaimableRewards] = useState(0);
  const [stakedBalance, setStakedBalance] = useState(0);

  // Fetch token balance
  useEffect(() => {
    if (address && tokenContract) {
      const fetchBalances = async () => {
        setIsBalanceLoading(true);
        try {
          const balance = await tokenContract.balanceOf(address);
          setTokenBalance(Number(balance.displayValue)); // Ensure tokenBalance is a number
        } catch (error) {
          console.error("Error fetching balance:", error);
        } finally {
          setIsBalanceLoading(false);
        }
      };
      fetchBalances();
    }
  }, [address, tokenContract]);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(tokenContractAddress);
    setCopyButtonText("Copied!");
    setTimeout(() => setCopyButtonText("Copy CA"), 3000);
  };

  const handleStake = (amount) => {
    console.log(`Stake ${amount} $BABAL`);
  };

  const handleUnstake = (amount) => {
    console.log(`Unstake ${amount} $BABAL`);
  };

  const handleClaimRewards = () => {
    console.log("Claiming rewards");
  };

  const fillStakeInput = (percentage) => {
    const input = document.getElementById("stakeInput");
    const value = percentage === 0.5 ? tokenBalance / 2 : tokenBalance;
    input.value = value.toFixed(2); // Use .value instead of .placeholder
  };

  const fillUnstakeInput = (percentage) => {
    const input = document.getElementById("unstakeInput");
    const value = percentage === 0.5 ? stakedBalance / 2 : stakedBalance;
    input.value = value.toFixed(2); // Use .value instead of .placeholder
  };

  if (!tokenContract && !isTokenContractLoading) {
    return <div>Error: Token contract not found or invalid token address.</div>;
  }

  return (
    <div className="gems-container">
      <div className="top-section" style={{ display: "flex", width: "98%" }}>
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
        </div>
      </div>

      <div className="second-container">
        <div className="wallet-connect-button">
          <ConnectWallet />
        </div>
        {address ? (
          isBalanceLoading ? (
            <h1>Loading your holdings...</h1>
          ) : tokenBalance > 0 ? (
            <>
              <h1>Welcome, {address}</h1>
              <div className="staking-box-container">
                {/* Box 1 */}
                <div className="staking-box">
                  <p>Your $BABAL Balance: {tokenBalance || "0.00"}</p>
                </div>
                {/* Box 2 */}
                <div
                  className={`staking-box ${
                    stakedBalance === 0 ? "disabled-box" : ""
                  }`}
                >
                  <p>Claimable Rewards: {claimableRewards || "0.00"}</p>
                  <button onClick={handleClaimRewards}>Claim Rewards</button>
                </div>
                {/* Box 3 */}
                <div className="staking-box">
                  <p>Staked Balance: {stakedBalance || "0.00"}</p>
                  <label>
                    Amount to Stake:
                    <button
                      className="half-max-button"
                      onClick={() => fillStakeInput(0.5)}
                    >
                      Half
                    </button>
                    <button
                      className="half-max-button"
                      onClick={() => fillStakeInput(1)}
                    >
                      Max
                    </button>
                  </label>
                  <input type="number" id="stakeInput" placeholder="0.00" />
                  <button
                    onClick={() =>
                      handleStake(document.querySelector("#stakeInput").value)
                    }
                  >
                    Stake
                  </button>
                </div>
                {/* Box 4 */}
                <div
                  className={`staking-box ${
                    stakedBalance === 0 ? "disabled-box" : ""
                  }`}
                >
                  <p>Unstaked Balance: {stakedBalance || "0.00"}</p>
                  <label>
                    Amount to Unstake:
                    <button
                      className="half-max-button"
                      onClick={() => fillUnstakeInput(0.5)}
                    >
                      Half
                    </button>
                    <button
                      className="half-max-button"
                      onClick={() => fillUnstakeInput(1)}
                    >
                      Max
                    </button>
                  </label>
                  <input type="number" id="unstakeInput" placeholder="0.00" />
                  <button
                    onClick={() =>
                      handleUnstake(document.querySelector("#unstakeInput").value)
                    }
                  >
                    Unstake
                  </button>
                </div>
              </div>
            </>
          ) : (
            <h1>You need $BABAL to view this Page</h1>
          )
        ) : (
          <h1>Connect Wallet Holding $BABAL</h1>
        )}
      </div>
    </div>
  );
}

function Gpt() {
  const clientId = process.env.THIRDWEB_ID; // Replace this with your actual client ID

  return (
    <ThirdwebSDKProvider clientId={clientId}>
      <ThirdwebProvider activeChain="base">
        <GptContent />
      </ThirdwebProvider>
    </ThirdwebSDKProvider>
  );
}

export default Gpt;