// frontend/src/components/CompetitorAnalysis.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CompetitorAnalysis() {
  const [competitors, setCompetitors] = useState([]);
  const [selected, setSelected] = useState(null);
  const [insights, setInsights] = useState(null);

  // Fetch top competitors
  useEffect(() => {
    axios.get("http://localhost:5000/competitors/top")
      .then(res => setCompetitors(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch insights for selected competitor
  const fetchInsights = (id) => {
    axios.get(`http://localhost:5000/competitors/${id}/insights`)
      .then(res => setInsights(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Top Competitors</h2>
      <div className="flex gap-4">
        <div className="w-1/3">
          {competitors.map(c => (
            <div
              key={c.id}
              className={`p-2 border rounded cursor-pointer ${selected?.id === c.id ? "bg-blue-100" : ""}`}
              onClick={() => {
                setSelected(c);
                fetchInsights(c.id);
              }}
            >
              {c.name} - Engagement: {c.engagement}
            </div>
          ))}
        </div>

        <div className="w-2/3 border p-4 rounded">
          {insights ? (
            <>
              <h3 className="font-bold mb-2">Insights for {selected.name}</h3>
              <p><strong>Hashtags:</strong> {JSON.stringify(insights.hashtags)}</p>
              <p><strong>CTAs:</strong> {JSON.stringify(insights.ctas)}</p>
              <p><strong>Video Structure:</strong> {insights.videoStructure}</p>
              <p><strong>Posting Times:</strong> {JSON.stringify(insights.postingTimes)}</p>
              <p><strong>Effects:</strong> {JSON.stringify(insights.effects)}</p>
            </>
          ) : (
            <p>Select a competitor to see insights.</p>
          )}
        </div>
      </div>
    </div>
  );
}
