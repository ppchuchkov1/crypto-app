import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { coinSingle } from '../config/api';
import { Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useCrypto } from '../context/cryptoContext';
import Loading from './Loading';
const useStyles = makeStyles({
  buyCoinParagrph: {
    position: 'relative',

    textAlign: 'center',

    padding: '1.5rem',
    borderRadius: '2px',
    maxWidth: '55rem',
    color: 'rgb(51, 51, 51)',
    background: 'rgb(232, 232, 252)',
  },
  description: {
    paddingLeft: '50px',
    paddingRight: '50px',
    ['@media (max-width: 600px)']: {
      paddingLeft: '40px',
      paddingRight: '40px',
      textAlign: 'center',
    },
  },
  coinDesc: {
    fontWeight: '500',
  },
});
const CoinDescription = () => {
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <p className={classes.buyCoinParagrph}>
            Want to buy some{' '}
            <a
              href={coin.links ? coin.links.subreddit_url : '#'}
              target='blank'
            >
              {coin.name ? coin.name : '???'}
            </a>
            ? It's common to mix up {coin.name ? coin.name : '???'} and{' '}
            {coin.symbol ? coin.symbol.toUpperCase() : '???'}.{' '}
            {coin.name ? coin.name : '???'} is the blockchain and{' '}
            {coin.symbol ? coin.symbol.toUpperCase() : '???'} is the primary
            asset of {coin.name ? coin.name : '???'}.{' '}
            {coin.symbol ? coin.symbol.toUpperCase() : '???'} is what you're
            probably looking to buy.
            <a
              href={coin.links ? coin.links.subreddit_url : '#'}
              target='blank'
            >
              More on {coin.name ? coin.name : '???'}
            </a>
            .
          </p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h1>
            What's unique about{' '}
            {coin.symbol ? coin.symbol.toUpperCase() : '???'}?
          </h1>
          <p>
            There are many cryptocurrencies and lots of other tokens on
            {coin.name ? coin.name : '???'},
            <br /> but there are some things that only{' '}
            {coin.symbol ? coin.symbol.toUpperCase() : '???'} can do.
          </p>
          <img src={coin.image ? coin.image.large : '???'} />
        </div>
        <div className={classes.description}>
          <h1>
            What is {coin.name ? coin.name : '???'} (
            {coin.symbol ? coin.symbol.toUpperCase() : '???'})
          </h1>
          <h3
            className={classes.coinDesc}
            dangerouslySetInnerHTML={{
              __html: coin.description ? coin.description.en : 'lorem',
            }}
          />
        </div>
      </>
    );
  }
};
export default CoinDescription;
