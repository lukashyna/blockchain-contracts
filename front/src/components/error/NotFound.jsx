import { Box, Container, Typography } from "@mui/material";
import useCustomStyles from "/src/hooks/useCustomStyles";

const NotFound = () => {
  const { theme } = useCustomStyles();

  return (
    <Container>
      <Box component="main" sx={theme.main}>
        <Typography variant="h1" color="primary">
          404 Not Found
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFound;
