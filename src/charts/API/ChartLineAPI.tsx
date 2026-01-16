import { useState, useEffect } from "react";
import Chart from "../Chart";
import { type IChartOptions } from "../chart.interface";

export const ChartLineAPI = () => {
  const [chartData, setChartData] = useState<IChartOptions | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=7"
        );
        const data = await res.json();

        const prices = data.prices.map((item: [number, number]) => item[1]);
        const dates = data.prices.map((item: [number, number]) =>
          new Date(item[0]).toISOString()
        );

        setChartData({
          series: [{ name: "ETH Precio", data: prices }],
          options: {
            chart: { height: 350, type: "line" },
            xaxis: { type: "datetime", categories: dates },
            stroke: { curve: "smooth" },
            title: { text: "ETH Últimos 7 días", style: { color: "#fff" } },
            tooltip: { x: { format: "dd MMM yyyy" } },
            yaxis: {
              labels: {
                  style: { colors: "#71717b" },
                  formatter: (value: number) => value.toFixed(1),
              },
              title: {
                text: "Precio (USD)",
                style: { color: "#71717b" },
              },
            },
          },
        });
      } catch (err) {
        console.error("Error fetching chart data", err);
      }
    };

    fetchData();
  }, []);

  if (!chartData) return <p>Loading...</p>;

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="area"
      height={chartData.options.chart?.height}
    />
  );
};
