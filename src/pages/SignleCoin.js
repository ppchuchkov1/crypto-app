import { Grid } from '@material-ui/core';
import CoinInfo from '../components/CoinInfo';
import CoinChart from '../components/CoinChart';
import CoinDescription from '../components/CoinDescription';
const SingleCoin = () => {
  return (
    <>
      <CoinInfo />

      <CoinDescription />

      <CoinChart />
    </>
  );
};

export default SingleCoin;
