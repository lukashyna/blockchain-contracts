import React from "react";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Radio,
} from "@mui/material";

import { BlockchainContext } from "/src/context/BlockchainContext";
import VotingService from "/src/services/VotingService";
import {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} from "/src/components/constants/notificationMessage";
import useCustomStyles from "/src/hooks/useCustomStyles";

const VotingProposals = ({ proposals, fetchVotingData, setHasVoted }) => {
  const [voteIndex, setVoteIndex] = React.useState(null);
  const { setNotificationMessage, currentConnection, loading, setLoading } =
    React.useContext(BlockchainContext);
  const { theme } = useCustomStyles();

  const voting = currentConnection?.voting;
  const signer = currentConnection?.signer;
  const isVotingNotAvailable =
    voteIndex === null || !signer || !voting || loading;

  const voteText = loading ? "Voting..." : "Vote";

  const votingService = React.useMemo(
    () => new VotingService(voting, setNotificationMessage),
    [voting, setNotificationMessage]
  );

  const handleVoteChange = (index) => setVoteIndex(index);

  const handleVote = async () => {
    if (isVotingNotAvailable) return;

    try {
      setLoading(true);

      const isSuccessful = await votingService.submitVote(voteIndex);

      if (isSuccessful) {
        setHasVoted(true);
        fetchVotingData();
        setNotificationMessage(SUCCESS_MESSAGES.VOTING_SUCCESSFUL);
      }
    } catch {
      setNotificationMessage(ERROR_MESSAGES.FAILED_VOTING);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography variant="h3" gutterBottom color="primary" mb={2}>
        Choose a proposal to vote for:
      </Typography>
      <List>
        {proposals.map((proposal, index) => (
          <ListItem
            button="true"
            key={index}
            variant="active"
            onClick={() => handleVoteChange(index)}
          >
            <Radio checked={voteIndex === index} />
            <ListItemText primary={proposal.description} />
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        disabled={isVotingNotAvailable}
        onClick={handleVote}
        sx={theme.button}
      >
        {voteText}
      </Button>
    </>
  );
};

export default VotingProposals;
