export const coinList = (currency, perPage, page) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`;

export const coinSingle = name =>
  `https://api.coingecko.com/api/v3/coins/${name}`;

export const chartCoin = (id, currency, days) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
