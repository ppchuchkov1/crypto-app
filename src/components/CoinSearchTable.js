import React, { useState, useEffect } from 'react';
import { coinList } from '../config/api';
import { useCrypto } from '../context/cryptoContext';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
  tableContainer: {
    margin: '50px',
    marginTop: '20px',
    ['@media (max-width: 600px)']: {
      margin: '5px',
      marginTop: '10px',
    },
  },
  table: {
    minWidth: '100%',
  },
  loadingBar: {
    width: '100%',
  },
  cryptoName: {
    fontWeight: '600',
    fontSize: '15px',
  },
  rowMobileDisable: {
    ['@media (max-width: 600px)']: {
      display: 'none',
    },
  },
});
const CoinSearchTable = props => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [coins, setCoins] = useState([]);
  const { currency } = useCrypto();

  const usdCurrency = currency === 'usd';
  let formatCurrency = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  });

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(coinList(currency, 100, 1))
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setCoins(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div className={classes.loadingBar}>
        <LinearProgress />
      </div>
    );
  } else {
    return (
      <div className={classes.tableContainer}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell className={classes.rowMobileDisable} align='center'>
                  Rank
                </TableCell>
                <TableCell align='center'>Name</TableCell>
                <TableCell align='center'>Price</TableCell>
                <TableCell align='center'>24h change</TableCell>
                <TableCell align='center'>Market cap</TableCell>
                <TableCell align='center'>Supply limit</TableCell>
                <TableCell align='center'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coins
                .filter(crypto => {
                  if (props.searchValue == '') {
                    return crypto;
                  } else if (
                    crypto.name
                      .toLowerCase()
                      .includes(props.searchValue.toLowerCase())
                  ) {
                    return crypto;
                  }
                })
                .map(crypto => {
                  return (
                    <TableRow hover key={crypto.id}>
                      <TableCell
                        className={classes.rowMobileDisable}
                        align='center'
                      >
                        #{crypto.market_cap_rank}
                      </TableCell>
                      <TableCell align='center'>
                        <img src={crypto.image} alt='' width='20px' />
                        <Typography className={classes.cryptoName}>
                          {crypto.name}
                        </Typography>
                      </TableCell>

                      <TableCell align='center'>
                        {usdCurrency ? '$' : '€'}
                        {crypto.current_price}
                      </TableCell>
                      <TableCell
                        align='center'
                        style={{
                          backgroundColor:
                            crypto.price_change_percentage_24h > 0
                              ? '#e6ffe6'
                              : '#ffe6e6',
                          color: 'black',
                        }}
                      >
                        {crypto.price_change_percentage_24h}%
                      </TableCell>

                      <TableCell align='center'>
                        {formatCurrency.format(crypto.market_cap)}
                      </TableCell>
                      <TableCell align='center'>
                        {crypto.max_supply ? (
                          crypto.max_supply
                        ) : (
                          <Typography style={{ fontSize: '30px' }}>
                            ∞
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align='center'>
                        <Link to={`/market/${crypto.id}`}>
                          <Button variant='outlined'>Trade</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
};

export default CoinSearchTable;
