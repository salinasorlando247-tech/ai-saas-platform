import React, { useEffect, useState } from 'react';
import { getToken } from '..src/utils/auth.js';

const Marketplace = () => {
  const [reports, setReports] = useState([]);

  useEffect(()=>{
    fetch('/api/marketplace/reports', {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    .then(res=>res.json())
    .then(data=>setReports(data));
  }, []);

  return (
    <div className="marketplace-page">
      <h1>ForgeAI Marketplace Reports</h1>
      {reports.map((r,i)=>(
        <div key={i} className="report-card">
          <h3>{r.event}</h3>
          <p>{r.count}</p>
        </div>
      ))}
    </div>
  );
};

export default Marketplace;
