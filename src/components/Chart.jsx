import { useContext, useEffect, useState } from "react";
import {
  convertDateToUnixTimestamp,
  convertUnixTimestampToDate,
  createDate,
} from "../utils/helpers/date-helper";
import Card from "./Card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartConfig } from "../constants/config";
import ChartFilter from "./ChartFilter";
import ThemeContext from "../context/ThemeContext";
import StockContest from "../context/StockContext";
import { fetchHistoricalData } from "../utils/api/stock-api";
import Spinner from "./Spinner";

function Chart() {
  const { darkMode } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("1W");
  const { stockSymbol } = useContext(StockContest);
  const [loading, setLoading] = useState(false);

  const formatData = (data) => {
    return data.c.map((item, index) => {
      return {
        value: item.toFixed(2),
        date: convertUnixTimestampToDate(data.t[index]),
      };
    });
  };

  useEffect(() => {
    const getDateRange = () => {
      const { days, weeks, months, years } = chartConfig[filter];
      const endDate = new Date();
      const startDate = createDate(endDate, -days, -weeks, -months, -years);
      const startTimeStampUnix = convertDateToUnixTimestamp(startDate);
      const endTimeStampUnix = convertDateToUnixTimestamp(endDate);
      return { startTimeStampUnix, endTimeStampUnix };
    };
    const updateChartData = async () => {
      setLoading(true);
      try {
        const { startTimeStampUnix, endTimeStampUnix } = getDateRange();
        const resolution = chartConfig[filter].resolution;
        console.log(resolution);
        const result = await fetchHistoricalData(
          stockSymbol,
          resolution,
          startTimeStampUnix,
          endTimeStampUnix
        );
        console.log(result);
        setData(formatData(result));
      } catch (e) {
        console.log(e);
        setData([]);
      }
      setLoading(false);
    };
    updateChartData();
  }, [stockSymbol, filter]);

  return (
    <Card>
      <ul className="flex absolute top-2 right-2 z-40">
        {Object.keys(chartConfig).map((item) => (
          <li key={item}>
            <ChartFilter
              text={item}
              active={filter === item}
              onClick={() => setFilter(item)}
            />
          </li>
        ))}
      </ul>
      {loading ? (
        <Spinner className="" />
      ) : (
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={
                    darkMode ? "rgb(131, 140, 178)" : "rgb(199 210 254)"
                  }
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={
                    darkMode ? "rgb(131, 140, 178)" : "rgb(199 210 254)"
                  }
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#312e81"
              fill="url(#chartColor)"
              fillOpacity={1}
              strokeWidth={0.5}
            ></Area>
            <Tooltip
              contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
              itemStyle={darkMode ? { color: "#818cf8" } : null}
            />
            <XAxis dataKey="date" />
            <YAxis domain={["dataMin", "dataMax"]} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

export default Chart;
