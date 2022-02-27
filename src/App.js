import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import CryptoProvider from './context/cryptoContext';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import SingleCoin from './pages/SignleCoin';
import Market from './pages/Market';
import Footer from './components/Footer';
function App() {
  const [themeMode, setThemeMode] = useState(false);
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: themeMode ? 'dark' : 'light',
        },
      }),
    [themeMode]
  );
  return (
    <>
      <CryptoProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header themeMode={themeMode} setThemeMode={setThemeMode} />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/market' element={<Market />} />
            <Route path='/market/:id' element={<SingleCoin />} />
          </Routes>
          <Footer themeMode={themeMode} />
        </ThemeProvider>
      </CryptoProvider>
    </>
  );
}

export default App;
