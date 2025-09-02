import React from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { BlockchainContext } from "./BlockchainContext";
import votingContract from "../../../artifacts/contracts/Voting.sol/Voting.json";
import bookMarketplaceContract from "../../../artifacts/contracts/BookMarketplace.sol/BookMarketplace.json";

import { ERROR_MESSAGES } from "../components/constants/notificationMessage";

const NETWORK_ID = import.meta.env.VITE_APP_NETWORK_ID;
const VOTING_ADDRESS = import.meta.env.VITE_APP_VOTING_ADDRESS;
const BOOKSTORE_ADDRESS = import.meta.env.VITE_APP_BOOKSTORE_ADDRESS;

const defaultNotification = {
  message: "",
  type: "",
};

const BlockchainProvider = ({ children }) => {
  const [notificationMessage, setNotificationMessage] =
    React.useState(defaultNotification);
  const [currentConnection, setCurrentConnection] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const votingContractAbi = votingContract.abi;
  const bookMarketplaceContractAbi = bookMarketplaceContract.abi;

  const connectWallet = async () => {
    if (!window.ethereum) {
      setNotificationMessage(ERROR_MESSAGES.METAMASK_NOT_INSTALLED);
      return;
    }

    if (!(await checkNetwork())) return;

    const [selectedAccount] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    await initialize(selectedAccount);

    window.ethereum.on("accountsChanged", async ([newAccount]) => {
      if (!newAccount) return resetState();
      await initialize(newAccount);
    });

    window.ethereum.on("chainChanged", () => {
      resetState();
    });
  };

  const initialize = async (selectedAccount) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(selectedAccount);

    if (!signer) {
      setNotificationMessage(ERROR_MESSAGES.SIGNER_NOT_FOUND);
      return;
    }

    const voting = VOTING_ADDRESS
      ? new ethers.Contract(VOTING_ADDRESS, votingContractAbi, signer)
      : null;

    const bookMarketplace = BOOKSTORE_ADDRESS
      ? new ethers.Contract(
          BOOKSTORE_ADDRESS,
          bookMarketplaceContractAbi,
          signer
        )
      : null;

    setCurrentConnection({ provider, signer, voting, bookMarketplace });
  };

  const checkNetwork = async () => {
    const chosenChainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    if (chosenChainId === NETWORK_ID) return true;
    setNotificationMessage(ERROR_MESSAGES.WRONG_NETWORK);
    return false;
  };

  const resetState = () => {
    setNotificationMessage(defaultNotification);
    setCurrentConnection(null);
    navigate(`/crypto`);
  };

  const dismissNotification = () => {
    setNotificationMessage(defaultNotification);
  };

  const value = {
    notificationMessage,
    setNotificationMessage,
    currentConnection,
    loading,
    setLoading,
    connectWallet,
    dismissNotification,
  };

  return (
    <BlockchainContext.Provider value={value}>
      {children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainProvider;
