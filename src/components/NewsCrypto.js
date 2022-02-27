import React, { useState } from 'react';

import Carousel from 'react-simply-carousel';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import globeImage from '../assets/globe.png';
const useStyles = makeStyles({
  newsSection: {
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'center',

    ['@media (max-width: 600px)']: {
      marginTop: '50px',
    },
    ['@media (max-device-width:1024px)']: {
      fontSize: '35px',
      textAlign: 'left',
    },
  },
  card: {
    width: '1000px',
    borderRadius: '20px',
    marginBottom: '100px',
    boxShadow: 'none',
    ['@media (max-width: 600px)']: {
      width: '100%',
      borderRadius: '0',
    },
  },
  media: {
    width: '500px',

    ['@media (max-width:600px)']: {
      width: '250px',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    ['@media (max-width:1024px)']: {
      width: '350px',
    },
  },
  cardPreHeading: {
    marginBottom: '10px',
    fontSize: '14px',
    lineHeight: 1,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#777E90',
    ['@media (max-width:600px)']: {
      textAlign: 'center',
    },
  },
  cardHeading: {
    marginBottom: '10px',
    fontSize: '30px',
    lineHeight: 1.33333,
    letterSpacing: '-.01em',
    fontWeight: '600',
    ['@media (max-width:600px)']: {
      textAlign: 'center',
      fontSize: '24px',
    },
  },
  cardParagraph: {
    fontSize: '18px',
    lineHeight: 1.5,
    color: '#777E90',
    marginBottom: '10px',
    ['@media (max-width:600px)']: {
      textAlign: 'center',
    },
  },
  cardButton: {
    ['@media (max-width:600px)']: {
      margin: '0 auto',
      display: 'flex',
    },
  },
  textNews: {
    textAlign: 'center',
    marginTop: '100px',
  },
  textNewsHeading: {
    fontWeight: '700',
    ['@media (max-width:600px)']: {
      fontSize: '24px',
    },
  },
  textNewsParagraph: {
    marginTop: '10px',
  },
});
const NewsCrypto = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.textNews}>
        <Typography className={classes.textNewsHeading} variant='h4'>
          Stay in the know on <br /> crypto with Coinbase
        </Typography>
        <Typography className={classes.textNewsParagraph}>
          A creative agency that lead and inspire
        </Typography>
      </div>
      <div className={classes.newsSection}>
        <Card className={classes.card}>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item xs={12} sm={6} style={{ padding: '30px' }}>
              <Typography className={classes.cardPreHeading}>
                Crypto News
              </Typography>
              <Typography className={classes.cardHeading}>
                Be Part of our Global <br /> Community
              </Typography>
              <Typography className={classes.cardParagraph}>
                Let's stay on touch. Join our communities to <br /> keep up with
                the Coinbase team and our <br /> traders from all over the
                world.
              </Typography>
              <Button
                className={classes.cardButton}
                variant='contained'
                color='primary'
              >
                Explore
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img className={classes.media} src={globeImage}></img>
            </Grid>
          </Grid>
        </Card>
      </div>
    </>
  );
};
export default NewsCrypto;
