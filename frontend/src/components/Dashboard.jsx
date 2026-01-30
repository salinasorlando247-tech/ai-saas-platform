import React from "react";
import VideoEditor from "./VideoEditor";
import Scheduler from "./Scheduler";
import Analytics from "./Analytics";
import ViralScore from "./ViralScore";
import Payments from "./Payments.jsx"; // <-- Corrected import

export default function Dashboard() {
  return (
    <div className="dashboard-container" style={{ padding: "20px" }}>

      <h1 style={{ marginBottom: "30px" }}>AI Control Center</h1>

      {/* AI Video Editor */}
      <VideoEditor />

      {/* Scheduler */}
      <Scheduler />

      {/* Analytics Panel */}
      <Analytics />

      {/* Viral Score Checker */}
      <ViralScore />

      {/* Payments / Upgrade */}
      <Payments />

    </div>
  );
}
