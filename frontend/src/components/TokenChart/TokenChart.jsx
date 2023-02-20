import { useQuery } from "react-query";
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
    const params = ticker.trim().replace(/\s+/g, "-").toLowerCase();
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${params}/market_chart?vs_currency=usd&days=1&interval=1h`
    );
    const data = await response.json();

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
          borderColor: "#10b981",
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 470);
            gradient.addColorStop(0, "rgba(217,238,203,1)");
            gradient.addColorStop(1, "rgba(217,238,203,0)");
            return gradient;
          },
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
    setTicker(e.target.ticker.value);
    refetch();
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
      customCanvasBackgroundColor: {
        color: 'white',
      }
    },
    elements: {
      point: {
        pointStyle: "none",
        radius: 0,
      },
    },
    scales: {
      y: {
        display: true,
      },
      x: {
        display: false,
      },
    },
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.header}>Please insert full cryptocurrency name</h1>
      <form onSubmit={handleSubmit}>
        <input name="ticker" id="ticker" type="text" className={styles.input} placeholder="BTC"></input>
        <button type="submit" className={styles.button}>Draw chart</button>
      </form>
      {status === "loading" && <div className={styles.status}>Loading...</div>}
      {status === "error" && (
        <div className={styles.status}>Error occurred while fetching data</div>
      )}
      {status === "success" && data && 
      <>
      <h2>{ticker.trim().replace("-"," ").toUpperCase()}</h2>
      <Line data={data} options={options} />
      </>}
    </section>
  );
};

export default TokenChart;
