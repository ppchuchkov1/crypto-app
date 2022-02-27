import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography, Grid } from '@material-ui/core';
import CoinSearchTable from '../components/CoinSearchTable';
import CryptoCards from '../components/CryptoCards';
import NewsCrypto from '../components/NewsCrypto';
import CryptoGuild from '../components/CryptoGuide';
const useStyles = makeStyles(theme => ({
  formSection: {
    paddingLeft: '60px',
    paddingRight: '60px',
    marginTop: '50px',
  },
  searchInput: {
    width: '100%',
  },
}));
const Market = () => {
  const [searchValue, setSearchValue] = useState('');
  const getSearchValue = e => {
    setSearchValue(e.target.value);
  };
  const classes = useStyles();
  return (
    <>
      <form
        className={classes.formSection}
        onSubmit={e => e.preventDefault()}
        noValidate
        autoComplete='off'
      >
        <TextField
          className={classes.searchInput}
          onChange={getSearchValue}
          label='Search crypto here'
          variant='outlined'
        />
      </form>
      <CoinSearchTable searchValue={searchValue} />
      <NewsCrypto />
      <CryptoGuild />
    </>
  );
};
export default Market;
