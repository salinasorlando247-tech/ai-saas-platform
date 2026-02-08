import React from "react";

export default function SimulationPanel({ data }) {
  return (
    <div className="simulation-panel">
      <h2>AI Simulation Results</h2>

      <div className="ranges">
        <p><strong>Expected:</strong> {data.simulation.floor} – {data.simulation.ceiling}</p>
        <p><strong>Median:</strong> {data.simulation.median}</p>
      </div>

      <div className={`honesty ${data.honesty.toLowerCase()}`}>
        Honesty Level: {data.honesty}
      </div>

      <div className="confidence">
        Confidence Score: {data.confidence}%
      </div>

      <h3>Why This Will Work</h3>
      <ul>
        {data.explanation.map((reason, i) => (
          <li key={i}>{reason}</li>
        ))}
      </ul>
    </div>
  );
}
