import { createTheme } from "@mui/material/styles";

const colorVariables = {
  primaryMain: "#000000",
  secondaryMain: "#000000",
  backgroundDefault: "#F2F7FC",
  textDisabled: "#64748B",
  errorDefault: "#EA192A",
  inverseDefault: "#ffffff",
  boxShadow: "#8f97b280",
  transparent: "#00000000",
};

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: colorVariables.primaryMain,
    },
    secondary: {
      main: colorVariables.secondaryMain,
    },
    background: {
      default: colorVariables.backgroundDefault,
    },
    text: {
      primary: colorVariables.primaryMain,
      secondary: colorVariables.secondaryMain,
      disabled: colorVariables.textDisabled,
      inverse: colorVariables.inverseDefault,
    },
    error: {
      main: colorVariables.errorDefault,
    },
    info: {
      main: colorVariables.backgroundDefault,
    },
    divider: colorVariables.primaryMain,
  },
  typography: {
    fontFamily: "Inter",
    fontWeightLight: 400,
    fontSize: 16,
    htmlFontSize: 18,
    letterSpacing: "-0.02em",
    h1: {
      fontSize: "27px",
      fontWeight: 600,
      "@media (max-width:900px)": {
        fontSize: "25px",
      },
      "@media (max-width:600px)": {
        fontSize: "22px",
      },
    },
    h2: {
      fontSize: "24px",
      fontWeight: 500,
      "@media (max-width:900px)": {
        fontSize: "22px",
      },
      "@media (max-width:600px)": {
        fontSize: "18px",
      },
    },
    h3: {
      fontSize: "22px",
      fontWeight: 500,
      lineHeight: 1.3,
      "@media (max-width:900px)": {
        fontSize: "20px",
      },
      "@media (max-width:600px)": {
        fontSize: "18px",
      },
    },
    h4: {
      fontSize: "20px",
      fontWeight: 500,
      "@media (max-width:900px)": {
        fontSize: "18px",
      },
    },
    h5: {
      fontSize: "18px",
      fontWeight: 500,
      lineHeight: 1.5,
      "@media (max-width:900px)": {
        fontSize: "16px",
      },
    },
    h6: {
      fontSize: "16px",
      fontWeight: 500,
      "@media (max-width:900px)": {
        fontSize: "14px",
      },
    },
    subtitle1: {
      fontSize: "18px",
      fontWeight: 500,
      lineHeight: 1.2,
      "@media (max-width:600px)": {
        fontSize: "14px",
        lineHeight: 1.4,
      },
    },
    subtitle2: {
      fontSize: "20px",
      fontWeight: 400,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "14px",
    },
    body2: {
      fontSize: "16px",
    },
    button: {
      fontSize: "14px",
      lineHeight: 1.2,
      textTransform: "none",
      borderRadius: "12px",
      backgroundColor: colorVariables.secondary,
      color: `${colorVariables.inverseDefault} !important`,
    },
    caption: {
      fontSize: "12px",
    },
    overline: {
      fontSize: "13px",
    },
  },
  addressContainer: {
    maxWidth: "max-content",
    wordBreak: "break-word",
    margin: "14px 0",
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  button: {
    display: "block",
    margin: "0 auto",
    mt: 2,
  },
  flexColumnContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  flexRowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
  },
  fullWidth: {
    width: "100%",
  },
  iconButton: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  loading: {
    maxWidth: "100%",
    height: "auto",
    margin: "0 auto",
    position: "relative",
  },
  loginContainer: {
    mt: 8,
    p: { xs: "4em 2em", sm: "5em" },
    borderRadius: "10px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    alignItems: "center",
    gap: 5,
  },
  main: {
    flexGrow: 1,
    boxSizing: "border-box",
    margin: "0 auto",
    position: "relative",
    padding: "60px 15px",
    maxWidth: "100%",
  },
  modalContainer: {
    marginTop: "0px",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "75%", md: "70%", lg: "40%" },
    maxHeight: "99%",
    overflow: "auto",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    "& .MuiFormLabel-root": {
      fontSize: "1rem",
      top: "-8px",
    },
  },
  generalContainer: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "40px 15px",
    textAlign: "center",
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: colorVariables.backgroundDefault,
          marginTop: "64px",
          padding: "20px",
          color: colorVariables.primaryMain,
          alignItems: "center",
          gap: "10px",
        },
        icon: {
          margin: 0,
        },
        action: {
          padding: 0,
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        root: {
          maxWidth: "100%",
          color: colorVariables.primaryMain,
          border: `1px solid ${colorVariables.secondaryMain}`,
          borderRadius: "20px",
          marginBottom: "12px",
          "&:hover": {
            backgroundColor: colorVariables.backgroundDefault,
          },
        },
        badge: {
          left: "50%",
          padding: "0 18px",
          height: "32px",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: `${colorVariables.textDisabled} !important`,
            backgroundColor: `${colorVariables.primaryMain}1a !important`,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          lineHeight: 1.2,
          textTransform: "none",
          borderRadius: "20px",
          backgroundColor: colorVariables.primaryMain,
          padding: "10px 20px",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: `${colorVariables.primaryMain} !important`,
          },
        },
        text: {
          backgroundColor: `${colorVariables.transparent} !important`,
          padding: 0,
          margin: "10px 0",
        },
        outlined: {
          color: `${colorVariables.textDisabled} !important`,
          backgroundColor: `transparent !important`,
          border: `1px solid ${colorVariables.textDisabled} !important`,
          "&:hover": {
            color: `${colorVariables.inverseDefault} !important`,
            borderColor: `${colorVariables.secondaryMain} !important`,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          variants: [
            {
              props: { variant: "hidden" },
              style: {
                clip: "rect(0 0 0 0)",
                clipPath: "inset(50%)",
                height: 1,
                overflow: "hidden",
                position: "absolute",
                bottom: 0,
                left: 0,
                whiteSpace: "nowrap",
                width: 1,
              },
            },
          ],
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 10,
          borderRadius: 5,
        },
        bar: {
          borderRadius: 5,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: "18px",
          height: "36px",
          padding: "0 12px",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          width: "auto",
          alignItems: "center",
          padding: "0",
          "&:not(:last-child)": {
            marginBottom: "12px",
          },
          color: colorVariables.primaryMain,
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
      variants: [
        {
          props: { variant: "active" },
          style: {
            transition: "padding-left 0.3s ease",
            "&:hover": {
              paddingLeft: "15px",
              backgroundColor: "transparent",
              cursor: "pointer",
              transition: "padding-left 0.3s ease",
            },
          },
        },
      ],
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "0",
          marginRight: "15px",
          marginTop: "3px",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          margin: "0",
          ".MuiTypography-root": {
            fontSize: "18px",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: "20px",
          padding: "20px 10px",
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: colorVariables.secondaryMain,
          padding: "0px",
          marginRight: "10px",
          "&.Mui-checked": {
            color: colorVariables.secondaryMain,
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeLarge: {
          fontSize: "46px",
        },
        fontSizeMedium: {
          fontSize: "30px",
        },
        fontSizeSmall: {
          fontSize: "18px",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "16px 0",
          fontSize: "18px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          margin: "0",
        },
        button: {
          backgroundColor: "transparent",
        },
      },
    },
  },
});

export default theme;
