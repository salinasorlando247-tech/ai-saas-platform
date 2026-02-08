// src/pages/UltimateDashboard.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UltimateDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/dashboard/metrics").then((res) => {
      setMetrics(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading ForgeAI Core…</div>;

  return (
    <div style={styles.container}>
      <h1>ForgeAI Command Center</h1>

      {/* USAGE */}
      <Section title="Faceless Usage">
        <Metric
          label="Videos Today"
          value={`${metrics.usage.facelessToday} / ${metrics.usage.facelessLimit}`}
        />
        <Metric
          label="Minutes Used"
          value={`${metrics.usage.minutesUsed} / ${metrics.usage.maxMinutes}`}
        />
      </Section>

      {/* PERFORMANCE */}
      <Section title="AI Performance Health">
        <Metric
          label="Avg Confidence"
          value={`${Math.round(metrics.performance.avgConfidence * 100)}%`}
        />
        <Metric
          label="Success Rate"
          value={`${Math.round(metrics.performance.successRate * 100)}%`}
        />
        <Metric
          label="Avg Retention"
          value={`${Math.round(metrics.performance.avgRetention * 100)}%`}
        />
      </Section>

      {/* SIMULATION TRUST */}
      <Section title="Simulation Trust System">
        <TrustBar
          label="Model Honesty"
          value={metrics.performance.avgConfidence}
        />
        <TrustBar
          label="Prediction Stability"
          value={metrics.performance.successRate}
        />
      </Section>

      {/* WHY THIS WORKS */}
      <Section title="Why Your Content Works">
        <ul>
          <li>Strong hook detection</li>
          <li>Platform-specific pacing</li>
          <li>Mobile-optimized audio clarity</li>
          <li>Trend-aligned structure</li>
        </ul>
      </Section>

      {/* REFERRALS */}
      <Section title="Referral Earnings">
        <Metric
          label="Total Earned"
          value={`$${metrics.referrals.earnings.toFixed(2)}`}
        />
        <Metric
          label="Active Referrals"
          value={metrics.referrals.activeReferrals}
        />
      </Section>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Section({ title, children }) {
  return (
    <div style={styles.section}>
      <h2>{title}</h2>
      <div style={styles.row}>{children}</div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div style={styles.card}>
      <span style={styles.label}>{label}</span>
      <strong style={styles.value}>{value}</strong>
    </div>
  );
}

function TrustBar({ label, value }) {
  return (
    <div style={styles.trust}>
      <span>{label}</span>
      <div style={styles.bar}>
        <div
          style={{
            ...styles.fill,
            width: `${Math.round(value * 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    padding: 24,
    color: "#fff",
    background: "#0b0f1a",
    minHeight: "100vh",
  },
  section: {
    marginBottom: 32,
  },
  row: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
  },
  card: {
    background: "#151a2d",
    padding: 16,
    borderRadius: 8,
    minWidth: 160,
  },
  label: {
    fontSize: 12,
    opacity: 0.7,
  },
  value: {
    fontSize: 20,
  },
  trust: {
    width: 240,
  },
  bar: {
    background: "#222",
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  fill: {
    background: "#4ade80",
    height: "100%",
    borderRadius: 4,
  },
};
