import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { getToken } from '..src/utils/auth.js';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    fetch('/api/analytics', {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    .then(res => res.json())
    .then(data => setAnalytics(data));
  }, []);

  return (
    <div className="dashboard-page">
      <h1>ForgeAI Dashboard</h1>
      <div className="analytics-grid">
        {analytics.map((a,i)=>(
          <div key={i} className="analytics-card">
            <h3>{a.event}</h3>
            <p>{a.count}</p>
          </div>
        ))}
      </div>
      <Canvas style={{ height: 400 }}>
        <ambientLight />
        <pointLight position={[10,10,10]} />
        <OrbitControls />
        {analytics.map((a,i)=>(
          <mesh key={i} position={[i*2, a.count/50, 0]}>
            <boxGeometry args={[1, a.count/50, 1]} />
            <meshStandardMaterial color="orange"/>
          </mesh>
        ))}
      </Canvas>
    </div>
  );
};

export default Dashboard;
