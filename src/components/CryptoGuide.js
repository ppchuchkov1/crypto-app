import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import stepOne from '../assets/step-1.png';
import stepTwo from '../assets/step-2.png';
import stepThree from '../assets/step-3.png';
import stepFour from '../assets/step-4.png';
const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function CryptoGuide() {
  const classes = useStyles();

  return (
    <Grid container className={classes.cardsContainer}>
      <Grid item xs={6} lg={3} md={6}>
        <Card className={classes.root}>
          <CardContent>
            <img src={stepOne} />
            <Typography
              className={classes.title}
              color='textSecondary'
              gutterBottom
            >
              Download
            </Typography>

            <Typography variant='body2' component='p'>
              Lorem ipsum dolor sit amet <br /> consectetur adipisicing elit.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} lg={3} md={6}>
        <Card className={classes.root}>
          <CardContent>
            <img src={stepTwo} />
            <Typography
              className={classes.title}
              color='textSecondary'
              gutterBottom
            >
              Learn crypto
            </Typography>

            <Typography variant='body2' component='p'>
              Lorem ipsum dolor sit amet <br /> consectetur adipisicing elit.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} lg={3} md={6}>
        <Card className={classes.root}>
          <CardContent>
            <img src={stepThree} />
            <Typography
              className={classes.title}
              color='textSecondary'
              gutterBottom
            >
              Connect wallet
            </Typography>

            <Typography variant='body2' component='p'>
              Lorem ipsum dolor sit amet <br /> consectetur adipisicing elit.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} lg={3} md={6}>
        <Card className={classes.root}>
          <CardContent>
            <img src={stepFour} />
            <Typography
              className={classes.title}
              color='textSecondary'
              gutterBottom
            >
              Earn money
            </Typography>

            <Typography variant='body2' component='p'>
              Lorem ipsum dolor sit amet <br /> consectetur adipisicing elit.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
export default CryptoGuide;
