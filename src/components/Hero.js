import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cardImage from '../assets/card-hero.png';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
  heroSection: {
    paddingLeft: '50px',
    paddingRight: '50px',
    height: '100vh',

    ['@media (max-width: 600px)']: {
      marginTop: '50px',
      textAlign: 'center',
      height: '100%',
    },
    ['@media ( max-device-width:1024px)']: {
      paddingTop: '50px',
      height: '100%',
    },
  },
  heroImage: {
    position: 'absolute',
    top: '-145px',
    right: 'calc(50% - 750px)',
    width: '913px',
    pointerEvents: 'none',
    ['@media (max-width: 600px)']: {
      width: '100%',
      position: 'static',
    },
    ['@media ( max-device-width:1024px)']: {
      width: '100%',
      position: 'static',
    },
  },
  heroHeading: {
    fontWeight: '700',
    lineHeight: '1',
    fontSize: '64px',
    letterSpacing: '-.02em',
    marginBottom: '20px',

    ['@media (max-device-width:1024px)']: {
      fontSize: '35px',
    },
    ['@media (max-width: 600px)']: {
      fontSize: '40px',
    },
  },

  heroParagraph: {
    fontWeight: '100',

    marginBottom: '20px',
    fontSize: '16px',
    lineHeight: 1.5,
    color: '#777E90',
    ['@media (max-device-width:1024px)']: {
      fontSize: '18px',
    },
    ['@media (max-width: 600px)']: {
      fontSize: '20px',
    },
  },
});
const Hero = () => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        className={classes.heroSection}
        justifyContent='center'
        alignItems='center'
      >
        <Grid item xs={12} sm={6}>
          <Typography className={classes.heroHeading}>
            Buy & Sell <br />
            crypto in minutes
          </Typography>
          <Typography className={classes.heroParagraph}>
            Trade Bitcoin, Ethereum, USDT, and the top altcoins on the legendary
            crypto asset exchange.
          </Typography>
          <Button variant='contained' color='primary'>
            <Link to='/market' style={{ color: 'white' }}>
              Get started now
            </Link>
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img className={classes.heroImage} src={cardImage}></img>
        </Grid>
      </Grid>
    </>
  );
};

export default Hero;
