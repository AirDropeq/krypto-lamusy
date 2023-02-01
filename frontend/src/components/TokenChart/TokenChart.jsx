import { useMutation, useQuery } from "react-query";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import styles from "./tokenChart.module.css";
import { useState } from "react";

const TokenChart = () => {
  const [ticker, setTicker] = useState("bitcoin");
  const { data, status, refetch } = useQuery(["token-price", ticker], () =>
    fetchTokenPrice(ticker)
  );

  const fetchTokenPrice = async (ticker) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${ticker
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase()}/market_chart?vs_currency=usd&days=1&interval=1h`
    );
    const data = await response.json();
    console.log(data);

    let timeStamp = [];
    let cryptoHistoricPrices = [];

    data.prices.forEach((price) => {
      timeStamp.push(price[0]);
    });

    data.prices.forEach((price) => {
      cryptoHistoricPrices.push(price[1]);
    });

    const chartData = {
      labels: timeStamp,
      datasets: [
        {
          data: cryptoHistoricPrices,
          fill: true,
          borderColor: "green",
          backgroundColor: "rgba(255,255,255,0.5)",
          borderWidth: 2,
          tension: 0.4,
          drawActiveElementsOnTop: false,
        },
      ],
    };

    return chartData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  const onChangeHandler = (e) => {
    setTicker(e.target.value);
  };

  const options = {
    events: [],
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
    elements: {
      point: {
        pointStyle: "none",
        radius: 0,
      },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
      },
    },
  };

  return (
    <>
      <h1>Please insert full cryptocurrency name</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="ticker"
          id="ticker"
          type="text"
          value={ticker}
          onChange={onChangeHandler}
        ></input>
        <button type="submit">Re-draw a chart</button>
      </form>
      {status === "loading" && <div className={styles.status}>Loading...</div>}
      {status === "error" && (
        <div className={styles.status}>Error occurred while fetching data</div>
      )}
      {status === "success" && data && <Line data={data} options={options} />}
    </>
  );
};

export default TokenChart;
