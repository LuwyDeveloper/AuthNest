import { useState, useEffect } from 'react';
import Chart from '../Chart';
import { type IChartOptions } from '../chart.interface';

// Tipado de producto
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
}

export const ChartBarAPI = () => {
  const [chartData, setChartData] = useState<IChartOptions | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const products: Product[] = await res.json();

        const topProducts = products
          .sort((a, b) => b.price - a.price)
          .slice(0, 5);

        const labels = topProducts.map(p => p.title);
        const series = [
          {
            name: 'Precio (USD)',
            data: topProducts.map(p => Math.round(p.price)),
          },
        ];

        setChartData({
          series,
          options: {
            chart: { type: 'bar', height: 350 },
            title: { text: 'Los 5 productos más vendidos', style: { color: '#fff' } },
            xaxis: { categories: labels },
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
      type="bar"
      height={chartData.options.chart?.height}
    />
  );
};
