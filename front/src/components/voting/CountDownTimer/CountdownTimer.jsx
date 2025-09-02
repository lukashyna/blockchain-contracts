import { Typography, Box } from "@mui/material";
import Countdown from "react-countdown";

import { normalizedTime, formatNumber, calculateEndTime } from "./helpers";

const CountdownTimer = ({ startTime, duration }) => {
  const normalizedStartTime = normalizedTime(startTime);
  const normalizedDuration = normalizedTime(duration);
  const endTime = calculateEndTime(normalizedStartTime, normalizedDuration);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    const isDaysVisible = days > 0;
    const isHoursVisible = days > 0 || hours > 0;
    const isMinutesVisible = hours > 0 || minutes > 0;

    if (completed) return null;

    return (
      <Typography component="div" variant="h4" color="primary">
        Voting will end in
        <Typography component="p" variant="h1" color="primary">
          {isDaysVisible && `${formatNumber(days)} : `}
          {isHoursVisible ? `${formatNumber(hours)} : ` : ""}
          {isMinutesVisible ? `${formatNumber(minutes)} : ` : ""}
          {`${formatNumber(seconds)}`}
        </Typography>
      </Typography>
    );
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" my={2}>
      {endTime && <Countdown date={endTime} renderer={renderer} />}
    </Box>
  );
};

export default CountdownTimer;
