import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { coinSingle } from '../config/api';
import { Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useCrypto } from '../context/cryptoContext';
const useStyles = makeStyles({
  infoTextMain: {
    lineHeight: '0.5',
    fontSize: '24px',
    fontWeight: 600,
    letterSpacing: '-.01em',
    ['@media (max-width: 600px)']: {
      fontSize: '17px',
    },
  },

  infoTextSecondary: {
    fontSize: '12px',

    fontWeight: '600',
    color: '#777E90',
  },
});
const CoinInfo = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [coin, setCoin] = useState([]);
  let { id } = useParams();
  const classes = useStyles();
  const { currency } = useCrypto();

  console.log(currency);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(coinSingle(id))
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setCoin(result);
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
  console.log(coin);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <></>;
  } else if (coin.error) {
    return <h1>No coin</h1>;
  } else {
    return (
      <>
        <Grid container style={{ marginTop: '50px', textAlign: 'center' }}>
          <Grid
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
            }}
            item
            sm={12}
            xs={12}
          >
            <div>
              <h1 className={classes.infoTextMain}>
                {coin.symbol ? coin.symbol.toUpperCase() : 'NO'}/USD
              </h1>
              <p className={classes.infoTextSecondary}>{coin.name}</p>
            </div>
            <div>
              <h1 style={{ color: '#FF6838' }} className={classes.infoTextMain}>
                {coin.market_data
                  ? currency === 'usd'
                    ? coin.market_data.current_price.usd
                    : coin.market_data.current_price.eur
                  : 'NO'}
              </h1>
              <p className={classes.infoTextSecondary}>
                {coin.market_data
                  ? currency === 'usd'
                    ? `$${coin.market_data.current_price.usd}`
                    : ` €${coin.market_data.current_price.eur}`
                  : 'NO'}
              </p>
            </div>
            <div>
              <h1 className={classes.infoTextMain}>Rank</h1>
              <p className={classes.infoTextSecondary}>
                #{coin.market_data ? coin.market_data.market_cap_rank : 'No'}
              </p>
            </div>
            <div>
              <h1 className={classes.infoTextMain}>24 Hours</h1>
              <p
                style={{
                  backgroundColor: coin.market_data
                    ? coin.market_data.price_change_percentage_24h > 0
                      ? '#E6FFE6'
                      : '#FFE6E6'
                    : '??',
                }}
                className={classes.infoTextSecondary}
              >
                {coin.market_data
                  ? coin.market_data.price_change_percentage_24h
                  : 'No'}
                %
              </p>
            </div>
          </Grid>
        </Grid>
      </>
    );
  }
};
export default CoinInfo;
