import React, { useState, useEffect } from 'react';
import bitcoinImage from '../assets/bitcoin.svg';

import { makeStyles } from '@material-ui/core/styles';
import { coinList } from '../config/api';
import { useCrypto } from '../context/cryptoContext';
import {
  Grid,
  Badge,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  cardsContainer: {
    padding: '50px',
    ['@media (max-width: 600px)']: {
      padding: '10px',
    },
  },
  root: {
    minWidth: 275,
    margin: '10px',
  },
  title: {
    fontSize: 14,
  },

  pos: {
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#FF6838',

    display: 'inline',
    padding: '5px',
    borderRadius: '10px',
    color: 'white',
    fontWeight: '600px',
  },
});
const CryptoCards = () => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cryptoCards, setCryptoCards] = useState([]);
  const { currency } = useCrypto();
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(coinList(currency, 4, 1))
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setCryptoCards(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [currency]);
  console.log(cryptoCards);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Grid container className={classes.cardsContainer}>
          {cryptoCards.map(coin => {
            return (
              <Grid key={coin.id} item xs={12} lg={3} md={6}>
                <Card className={classes.root}>
                  <CardContent>
                    <img src={coin.image} style={{ width: '40px' }} alt='' />

                    <Typography className={classes.pos} color='textSecondary'>
                      {coin.symbol.toUpperCase()}/USDT
                    </Typography>

                    <Typography className={classes.pos} variant='h5'>
                      {currency === 'usd' ? '$' : '€'}
                      {coin.current_price}
                    </Typography>
                    <Typography
                      className={classes.badge}
                      style={{
                        backgroundColor:
                          coin.price_change_percentage_24h < 0
                            ? '#FF6838'
                            : '#58BD7D',
                      }}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size='small'>
                      <Link to={`market/${coin.id}`}>Learn More</Link>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  }
};

export default CryptoCards;
