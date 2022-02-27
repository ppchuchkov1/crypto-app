import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';

import List from '@material-ui/core/List';

import Divider from '@material-ui/core/Divider';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { useCrypto } from '../context/cryptoContext';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  MenuItem,
  FormControl,
  Select,
  IconButton,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
const drawerWidth = 240;

function Header(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    logo: {
      flexGrow: 1,

      color: props.themeMode ? '#e6e6ff' : '#0052FF',
      fontWeight: 100,
      fontSize: '25px',
    },

    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },

    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }));
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { currency, setCurrency } = useCrypto();
  const getCurrency = e => {
    setCurrency(e.target.value);
  };
  console.log(currency);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar color='transparent' position='static'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <Link to='/' className={classes.logo}>
            coinbase
          </Link>

          <FormControl>
            <Select value={currency} onChange={getCurrency}>
              <MenuItem value={'usd'}>USD</MenuItem>
              <MenuItem value={'eur'}>EURO</MenuItem>
            </Select>
          </FormControl>
          <IconButton
            onClick={() => props.setThemeMode(!props.themeMode)}
            color='inherit'
          >
            {props.themeMode ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemText
              primary={
                <Link to='/market'>
                  {/* <Typography>Market</Typography> */}
                  <img src='https://img.icons8.com/external-flat-wichaiwi/64/000000/external-cryptocurrency-non-fungible-token-flat-wichaiwi-2.png' />{' '}
                </Link>
              }
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary={
                <Link to='/market/ethereum'>
                  {/* <Typography>Market</Typography> */}

                  <img src='https://img.icons8.com/external-flat-wichaiwi/64/000000/external-cryptocurrency-metaverse-flat-wichaiwi.png' />
                </Link>
              }
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary={
                <Link to='/market'>
                  {/* <Typography>Market</Typography> */}

                  <img src='https://img.icons8.com/external-flat-wichaiwi/64/000000/external-cryptocurrency-non-fungible-token-flat-wichaiwi.png' />
                </Link>
              }
            />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}

export default Header;
