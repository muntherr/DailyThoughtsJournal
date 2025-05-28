import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#670D2F",
      light: "#A53860",
      dark: "#3A0519",
    },
    secondary: {
      main: "#A53860",
      light: "#EF88AD",
      dark: "#670D2F",
    },
    background: {
      default: "#faf9f9",
      paper: "#ffffff",
    },
    text: {
      primary: "#3A0519",
      secondary: "#670D2F",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, #3A0519 0%, #670D2F 100%)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          background: "linear-gradient(135deg, #670D2F 0%, #A53860 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #3A0519 0%, #670D2F 100%)",
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, #A53860 0%, #EF88AD 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #670D2F 0%, #A53860 100%)",
          },
        },
      },
    },
  },
});
