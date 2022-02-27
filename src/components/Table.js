import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TableHead,
  Paper,
  Button,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { useCrypto } from '../context/cryptoContext';
import TablePaginationActions from './TablePagination';
import { coinList } from '../config/api';
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  tableSection: {
    margin: '50px',
    ['@media (max-width: 600px)']: {
      margin: '5px',
    },
  },
  table: {
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
  loadingBar: {
    width: '100%',
  },
  percentBg: {
    backgroundColor: 'red',
  },
});

export default function CustomPaginationActionsTable(props) {
  const { currency } = useCrypto();
  console.log(currency);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cryptoList, setCryptoList] = useState([]);
  const usdCurrency = currency === 'usd';
  let formatCurrency = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  });
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(coinList(currency, rowsPerPage, page + 1))
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setCryptoList(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [page, rowsPerPage, currency]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  console.log(page);
  console.log(rowsPerPage);
  console.log(cryptoList);
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
      <div className={classes.tableSection}>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table
              stickyHeader
              aria-label='sticky table'
              style={{ width: '100%' }}
            >
              <TableHead>
                <TableRow>
                  <TableCell align='center' style={{ minWidth: 100 }}>
                    Name
                  </TableCell>
                  <TableCell align='center' style={{ minWidth: 100 }}>
                    Price
                  </TableCell>

                  <TableCell align='center' style={{ minWidth: 100 }}>
                    24h change
                  </TableCell>
                  <TableCell
                    className={classes.rowMobileDisable}
                    align='center'
                    style={{ minWidth: 100 }}
                  >
                    Market cap
                  </TableCell>
                  <TableCell
                    align='center'
                    className={classes.rowMobileDisable}
                    style={{ minWidth: 100 }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cryptoList.map(crypto => {
                  return (
                    <TableRow hover key={crypto.id}>
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
                      <TableCell
                        className={classes.rowMobileDisable}
                        align='center'
                      >
                        {formatCurrency.format(crypto.market_cap)}
                      </TableCell>
                      <TableCell
                        className={classes.rowMobileDisable}
                        align='center'
                      >
                        <Link to={`/market/${crypto.id}`}>
                          <Button variant='outlined'>Trade </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[7, 11, 15]}
            component='div'
            count={100}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
}
