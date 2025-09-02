import { CircularProgress, Box } from "@mui/material";

import useCustomStyles from "/src/hooks/useCustomStyles";

const Loading = () => {
  const { theme } = useCustomStyles();

  return (
    <Box sx={theme.generalContainer}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
