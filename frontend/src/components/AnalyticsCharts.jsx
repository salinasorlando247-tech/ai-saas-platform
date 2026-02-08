import { Line } from 'react-chartjs-2';

const AnalyticsCharts = ({ data }) => {
  const chartData = {
    labels: data?.dates || [],
    datasets: [
      { label: 'Views', data: data?.views || [], borderColor: 'blue', fill: false },
      { label: 'Likes', data: data?.likes || [], borderColor: 'green', fill: false },
      { label: 'Shares', data: data?.shares || [], borderColor: 'orange', fill: false },
    ],
  };

  return <Line data={chartData} />;
};

export default AnalyticsCharts;
