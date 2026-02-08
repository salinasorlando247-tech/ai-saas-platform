import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js';
import api from '../../utils/api';

export default function TrendHeatmap({ platform }) {
  const [data,setData] = useState([]);

  useEffect(() => {
    api.get(`/analytics/trends/${platform}`).then(res => setData(res.data));
  }, [platform]);

  return <canvas id="heatmap" />;
}
