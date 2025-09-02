import React from "react";
import { Typography, CircularProgress, Box } from "@mui/material";

import CountdownTimer from "../CountDownTimer/CountdownTimer";
import VotingResults from "../VotingResults/VotingResults";
import VotingProposals from "../VotingProposals/VotingProposals";

import { BlockchainContext } from "/src/context/BlockchainContext";
import VotingService from "/src/services/VotingService";
import { ERROR_MESSAGES } from "/src/components/constants/notificationMessage";
import useCustomStyles from "/src/hooks/useCustomStyles";

const Voting = () => {
  const [proposals, setProposals] = React.useState([]);
  const [hasVoted, setHasVoted] = React.useState(false);
  const [votingEnded, setVotingEnded] = React.useState(false);
  const [startTime, setStartTime] = React.useState(null);
  const [duration, setDuration] = React.useState(null);

  const { setNotificationMessage, currentConnection, loading, setLoading } =
    React.useContext(BlockchainContext);
  const { theme } = useCustomStyles();

  const voting = currentConnection?.voting;
  const signer = currentConnection?.signer;
  const isConnectionInvalid = !signer || !voting;
  const isResultsVisible = votingEnded || hasVoted;

  const votingService = React.useMemo(
    () => new VotingService(voting, setNotificationMessage),
    [voting, setNotificationMessage]
  );

  const totalVotes = proposals?.reduce(
    (sum, proposal) => sum + Number(proposal.voteCount),
    0
  );

  const fetchVotingData = React.useCallback(async () => {
    try {
      if (isConnectionInvalid) return;

      setLoading(true);

      const contractProposals = await votingService.getProposals();
      setProposals(contractProposals);

      const isEnded = await votingService.hasVotingEnded();
      setVotingEnded(isEnded);

      if (!isEnded) {
        const startTime = await votingService.getStartTime();
        const duration = await votingService.getDuration();
        setStartTime(startTime);
        setDuration(duration);
      }

      const hasUserVoted = await votingService.hasUserVoted(signer.address);

      setHasVoted(hasUserVoted);
    } catch {
      setNotificationMessage(ERROR_MESSAGES.FAILED_FETCHING_VOTES);
    } finally {
      setLoading(false);
    }
  }, [
    signer,
    votingService,
    isConnectionInvalid,
    setProposals,
    setVotingEnded,
    setStartTime,
    setDuration,
    setNotificationMessage,
    setLoading,
  ]);

  const votingProps = {
    totalVotes,
    proposals,
    votingEnded,
    fetchVotingData,
    setHasVoted,
  };

  React.useEffect(() => {
    if (voting) fetchVotingData();
  }, [fetchVotingData, voting]);

  if (loading)
    return (
      <Box sx={theme.generalContainer}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={theme.generalContainer}>
      <Typography variant="h1" color="primary">
        What will become the foundation of the new world order?
      </Typography>
      <CountdownTimer startTime={startTime} duration={duration} />
      {isResultsVisible ? (
        <VotingResults {...votingProps} />
      ) : (
        <VotingProposals {...votingProps} />
      )}
    </Box>
  );
};

export default Voting;
