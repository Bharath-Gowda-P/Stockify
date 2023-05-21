import Header from "./Header";
import Details from "./Details";
import Overview from "./Overview";
import Chart from "./Chart";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import StockContest from "../context/StockContext";
import { fetchQuote, fetchStockDetails } from "../utils/api/stock-api";

function Dashboard() {
  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContest);
  const [stockDetails, setStockDetails] = useState({});
  const [quote, setQuote] = useState({});

  useEffect(() => {
    async function updateStockDetails() {
      try {
        const result = await fetchStockDetails(stockSymbol);
        setStockDetails(result);
      } catch (e) {
        console.log(e);
        setStockDetails({});
      }
    }

    async function updateStockOverview() {
      try {
        const result = await fetchQuote(stockSymbol);
        setQuote(result);
      } catch (e) {
        console.log(e);
        setQuote({});
      }
    }
    updateStockDetails();
    console.log(stockDetails);
    updateStockOverview();
  }, [stockSymbol]);

  return (
    <div
      className={`h-screen grid gird-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand ${
        darkMode ? "bg-gray-900 text-gray-300" : "light-mode-bg"
      } `}
    >
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        <Header name={stockDetails.name} />
      </div>
      <div className="md:col-span-2 row-span-4">
        <Chart />
      </div>
      <div>
        <Overview
          symbol={stockSymbol}
          price={quote.pc}
          change={quote.d}
          changePercent={quote.dp}
          currency={stockDetails.currency}
        />
      </div>
      <div className="row-span-2 xl:row-span-3">
        <Details details={stockDetails} />
      </div>
    </div>
  );
}

export default Dashboard;
