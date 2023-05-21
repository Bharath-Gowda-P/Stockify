import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import ThemeContext from "./context/ThemeContext";
import StockContest from "./context/StockContext";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [stockSymbol, setStockSymbol] = useState("AAPL");
  return (
    <StockContest.Provider value={{ stockSymbol, setStockSymbol }}>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <Dashboard />
      </ThemeContext.Provider>
    </StockContest.Provider>
  );
}

export default App;
