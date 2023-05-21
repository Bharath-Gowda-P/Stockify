const basePath = "https://finnhub.io/api/v1";

export async function searchSymbol(query) {
  const url = `${basePath}/search?q=${query}&token=${process.env.REACT_APP_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = response.json();
    return await data;
  } catch (e) {
    console.log(e);
    console.log("Error occured while fethcing data");
  }
}

export async function fetchStockDetails(stockSymbol) {
  const url = `${basePath}/stock/profile2?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = response.json();
    return await data;
  } catch (e) {
    console.log(e);
    console.log("Error occured while fethcing data");
  }
}

export async function fetchQuote(stockSymbol) {
  const url = `${basePath}/quote?symbol=${stockSymbol}&token=${process.env.REACT_APP_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = response.json();
    return await data;
  } catch (e) {
    console.log(e);
    console.log("Error occured while fethcing data");
  }
}

export async function fetchHistoricalData(stockSymbol, resolution, from, to) {
  const url = `${basePath}/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.REACT_APP_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    console.log(url);
    return await data;
  } catch (e) {
    console.log(e);
    console.log("Error occured while fethcing data");
  }
}
