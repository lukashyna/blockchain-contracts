import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  LinearProgress,
  Chip,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

import useCustomStyles from "/src/hooks/useCustomStyles";

const VotingResults = ({ votingEnded, totalVotes, proposals }) => {
  const { theme } = useCustomStyles();

  const progress = (proposal) =>
    totalVotes > 0 ? (Number(proposal.voteCount) / totalVotes) * 100 : 0;

  return (
    <>
      {votingEnded ? (
        <Chip label="Voting is completed!" />
      ) : (
        <Typography variant="h4" component="p" color="primary" mb={1}>
          You already voted. Thank you for voting!
        </Typography>
      )}
      <Box sx={theme.flexRowContainer}>
        <Typography variant="h3" color="primary">
          Voting Results:
        </Typography>
        <Box sx={theme.addressContainer}>
          <PeopleIcon color="primary" />
          <Typography variant="h2" color="primary">
            {totalVotes}
          </Typography>
        </Box>
      </Box>
      <List>
        {proposals.map((proposal, index) => (
          <ListItem key={index} sx={theme.flexColumnContainer}>
            <Box sx={theme.flexRowContainer}>
              <ListItemText primary={proposal.description} />
              <Typography variant="body2" color="textSecondary">
                {progress(proposal).toFixed(2)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              color="primary"
              value={progress(proposal)}
              sx={[theme.fullWidth, { mt: 1 }]}
            />
            <Typography variant="body2" color="textSecondary">
              {`Votes: ${Number(proposal.voteCount)}`}
            </Typography>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default VotingResults;
