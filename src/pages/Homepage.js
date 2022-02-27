import React from 'react';
import Hero from '../components/Hero';
import CryptoCards from '../components/CryptoCards';
import NewsCrypto from '../components/NewsCrypto';
import Table from '../components/Table';
import CryptoGuide from '../components/CryptoGuide';
const Homepage = () => {
  return (
    <>
      <Hero />
      <CryptoCards />
      <Table />
      <NewsCrypto />
      <CryptoGuide />
    </>
  );
};
export default Homepage;
