import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Header from './components/Header';
import LeftMenu from './components/LeftMenu/LeftMenu';
import ExchangeCalculator from './components/ExchangeCalculator/ExchangeCalculator';
// import Orders from './components/Orders';
import Copyright from './components/Copyright';
import Loader from './components/Loader';
import exchangeRatesRequest from './api/exchangeRatesRequest';
import './App.css';

const mdTheme = createTheme();

export default function App() {
  const [headerCurrencies, setHeaderCurrencies] = useState(null);
  const [currencies, setCurrencies] = useState(null);
  const [currencyExchangeRates, setCurrencyExchangeRates] = useState(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    exchangeRatesRequest().then(currenсy => {
      let currencies = {};
      let exchangeRates = {};
      currenсy.map(item => {
        if (item.ccy === 'USD') {
          currencies.usd = item.ccy;
          exchangeRates.usd = item.buy;
        } else if (item.ccy === 'EUR') {
          currencies.eur = item.ccy;
          exchangeRates.eur = item.buy;
          currencies.uah = 'UAH';
          exchangeRates.uah = 1;
        }
        return item;
      });

      setCurrencies({ ...currencies });
      setCurrencyExchangeRates({ ...exchangeRates });
      setHeaderCurrencies(currenсy);
    });
  }, []);

  return currencies && currencyExchangeRates ? (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <Header
          open={open}
          setOpen={setOpen}
          headerCurrencies={headerCurrencies}
        />
        <LeftMenu open={open} setOpen={setOpen} />
        <Box
          component="main"
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <ExchangeCalculator
                    currencies={currencies}
                    currencyExchangeRates={currencyExchangeRates}
                  />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              {/* <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid> */}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  ) : (
    <Loader />
  );
}
