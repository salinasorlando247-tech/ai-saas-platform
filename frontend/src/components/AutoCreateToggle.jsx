import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AutoCreateToggle = ({ userTier, industry, userId }) => {
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState('Idle');
  const [predictedEngagement, setPredictedEngagement] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`/api/aiVideo/auto-create-status/${userId}`);
        setEnabled(res.data.enabled);
        setStatus(res.data.enabled ? 'ON' : 'OFF');
      } catch (err) {
        console.error(err);
      }
    };
    fetchStatus();
  }, [userId]);

  useEffect(() => {
    if (enabled && userTier !== 'Free') {
      const fetchPrediction = async () => {
        try {
          const res = await axios.get(`/api/aiVideo/predict-engagement/${userId}`);
          setPredictedEngagement(res.data.predictedIncrease); // e.g., +12%
        } catch (err) {
          console.error(err);
        }
      };
      fetchPrediction();
    }
  }, [enabled, userId, userTier]);

  const toggleAutoCreate = async () => {
    const newState = !enabled;
    setEnabled(newState);
    setStatus(newState ? 'ON' : 'OFF');
    try {
      await axios.post('/api/aiVideo/auto-create-toggle', { userId, enabled: newState });
    } catch (err) {
      console.error(err);
      setStatus('Error');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
      <button
        onClick={toggleAutoCreate}
        className={`px-4 py-2 rounded font-bold ${enabled ? 'bg-green-600' : 'bg-gray-500'} text-white`}
      >
        Auto-Create: {status}
      </button>

      {enabled && userTier !== 'Free' && predictedEngagement !== null && (
        <div className="text-sm text-gray-700 dark:text-gray-200">
          Predicted Engagement Increase: <span className="font-bold">{predictedEngagement}%</span>
        </div>
      )}
    </div>
  );
};

export default AutoCreateToggle;
