"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-dm-sans), 'Helvetica Neue', Helvetica, sans-serif",
  },
  palette: {
    primary: {
      main: "#26547c",
    },
    secondary: {
      main: "#ff5e29",
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: "rgba(253, 250, 243, 0.8)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid var(--border-color)",
        },
      },
    },
  },
});

export default theme;
