import React, { useState, useEffect } from 'react';
import { chartCoin } from '../config/api';
import { useCrypto } from '../context/cryptoContext';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { chartDays } from '../config/data';
import { Button, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Loading from './Loading';
const useStyles = makeStyles({
  coinChart: {
    padding: '50px',
    ['@media (max-width: 600px)']: {
      padding: '15px',
    },
  },
});
const CoinChart = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [historyCryptoPrice, setHistoryCryptoPrice] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = useCrypto();
  const classes = useStyles();
  let { id } = useParams();

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(chartCoin(id, currency, days))
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setHistoryCryptoPrice(result.prices);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [days, currency]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loading />;
  } else if (!historyCryptoPrice) {
    return <h1>No coin</h1>;
  } else {
    return (
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '30px',
          }}
        >
          {chartDays.map(day => (
            <Button
              onClick={() => setDays(day.value)}
              key={day.value}
              variant='outlined'
              selected={day.value === days}
            >
              {day.label}
            </Button>
          ))}
        </div>

        <Line
          className={classes.coinChart}
          data={{
            labels: historyCryptoPrice.map(coin => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: historyCryptoPrice.map(coin => coin[1]),
                label: `Price ( Past ${days} Days ) in ${currency}`,
                borderColor: '#EEBC1D',
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
              responsive: true,
              maintainAspectRatio: false,
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </>
    );
  }
};

export default CoinChart;
