import { useTheme } from "@mui/material/styles";

const useCustomStyles = () => {
  const theme = useTheme();

  return { theme };
};

export default useCustomStyles;
