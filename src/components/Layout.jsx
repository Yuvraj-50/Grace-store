import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { green, purple } from "@mui/material/colors";
const theme = createTheme({
  palette: {
    mode: "light",
  },
});

function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </ThemeProvider>
  );
}

export default Layout;
