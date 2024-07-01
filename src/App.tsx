import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "@/state/theme";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "@/pages/navbar";
import Dashboard  from "@/pages/dashboards";
import Predictions from "./pages/predictions";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box height="100%" width="100%" padding="1rem 2rem">
              <NavBar/>
              <Routes>
                <Route path="/"  element={<Dashboard/>}/>
                <Route path="/predictions"  element={<Predictions/>}/>
              </Routes>
            </Box>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
