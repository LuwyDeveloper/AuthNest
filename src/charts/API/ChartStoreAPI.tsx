import { useState, useEffect } from 'react';
import Chart from '../Chart';
import { type IChartOptions } from '../chart.interface';

// 1️⃣ Tipar los productos de FakeStore
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  // otros campos los ignoramos
}

export const ChartStoreAPI = () => {
  const [chartData, setChartData] = useState<IChartOptions | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const products: Product[] = await res.json();

        const categoryTotals: Record<string, number> = {};
        products.forEach(product => {
          if (!categoryTotals[product.category]) {
            categoryTotals[product.category] = 0;
          }
          categoryTotals[product.category] += product.price;
        });

        const labels = Object.keys(categoryTotals);
        const series = Object.values(categoryTotals).map(v => Math.round(v));

        setChartData({
          series,
          options: {
            chart: { type: 'donut', height: 350 },
            labels,
            title: { text: 'Ventas por categoría (USD)', style: { color: '#fff' } },
            legend: { position: 'bottom', labels: { colors: '#71717b' } },
            tooltip: {
              y: { formatter: (val: number) => `$${val}` },
            },
          },
        });
      } catch (err) {
        console.error('Error fetching FakeStore data', err);
      }
    };

    fetchData();
  }, []);

  if (!chartData) return <p>Loading...</p>;

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="donut"
      height={chartData.options.chart?.height}
    />
  );
};
