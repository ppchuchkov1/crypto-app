import React from 'react';
import { Grid, Typography, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const Footer = props => {
  const useStyles = makeStyles(theme => ({
    mainContainer: {
      textAlign: 'center',
      borderTop: '1px solid #E6E8EC',
      paddingTop: '70px',
      paddingBottom: '50px',
      marginTop: '50px',
      ['@media (max-width:1024px)']: {
        paddingTop: '30px',
        paddingBottom: '30px',
      },
    },

    footerColLogo: {
      borderRight: '1px solid #E6E8EC',
      ['@media (max-width:600px)']: {
        borderRight: 0,
        borderBottom: '1px solid #E6E8EC',
      },
      ['@media (max-width:1024px)']: {
        borderRight: 0,
      },
    },
    form: {
      ['@media (max-width:600px)']: {
        display: 'none',
      },
    },

    logo: {
      flexGrow: 1,

      color: props.themeMode ? '#e6e6ff' : '#0052FF',
      fontWeight: 100,
      fontSize: '25px',
    },
    footerColOne: {
      borderRight: '1px solid #E6E8EC',

      ['@media (max-width:600px)']: {
        borderRight: 0,
        borderBottom: '1px solid #E6E8EC',
      },
      ['@media (max-width:1024px)']: {
        borderRight: 0,
      },
    },
    footerLink: {
      color: props.themeMode ? '#e6e6ff' : '#000',
    },
    spaceFooter: {
      marginTop: '10px',
      marginBottom: '10px',
    },
  }));
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.mainContainer} container>
        <Grid className={classes.footerColLogo} item sm={4} xs={12}>
          <Typography variant='h6' className={classes.logo}>
            coinbase
          </Typography>
          <Typography className={classes.spaceFooter}>
            Subscribe our newsletter to get <br /> more free design course and
            <br />
            resource.
          </Typography>

          <form className={classes.form} noValidate autoComplete='off'>
            <Input
              placeholder='your@email.com'
              inputProps={{ 'aria-label': 'description' }}
            />
          </form>
        </Grid>
        <Grid className={classes.footerColOne} item sm={4} md={4} xs={12}>
          <Typography className={classes.spaceFooter}>
            <Link to='/market' className={classes.footerLink}>
              Market
            </Link>
          </Typography>

          <Typography className={classes.spaceFooter}>
            <Link to='/market/ethereum' className={classes.footerLink}>
              Buy crypto
            </Link>
          </Typography>

          <Typography className={classes.spaceFooter}>
            <Link to='/market/ethereum' className={classes.footerLink}>
              Coin of the week
            </Link>
          </Typography>

          <Typography className={classes.spaceFooter}>
            <Link to='/market/ethereum' className={classes.footerLink}>
              Learn crypto
            </Link>
          </Typography>

          <Typography className={classes.spaceFooter}>
            <Link to='/market/ethereum' className={classes.footerLink}>
              Contact
            </Link>
          </Typography>
        </Grid>
        <Grid className={classes.footerColTwo} item sm={4} md={4} xs={12}>
          <Typography className={classes.spaceFooter}>Conctact</Typography>
          <Typography className={classes.spaceFooter}>
            43252 Borer Mountains
          </Typography>
          <Typography className={classes.spaceFooter}>
            Zackerychester
          </Typography>
          <Typography className={classes.spaceFooter}>Bahamas</Typography>
          <Typography className={classes.spaceFooter}>732-528-4945</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
