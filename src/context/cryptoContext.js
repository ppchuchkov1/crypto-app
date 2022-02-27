import React, { useState, useEffect, createContext, useContext } from 'react';
const CryptoContext = createContext();
const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState('usd');

  const value = {
    currency,
    setCurrency,
  };
  return (
    <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>
  );
};

export default CryptoProvider;
export const useCrypto = () => {
  return useContext(CryptoContext);
};
