import React, { useState } from "react";
import { runVideoSimulation, autoCreateBestVideo } from "../services/simulationService";
import { upgradeFacelessUnlock } from "../services/paymentService";

export default function VideoCreator({ user, setUser }) {
  const [script, setScript] = useState("");
  const [videoLength, setVideoLength] = useState(2);
  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [upgrading, setUpgrading] = useState(false);
  const [bestVideoUrl, setBestVideoUrl] = useState(null);

  const handleSimulate = async () => {
    if (!script) return alert("Enter a script");
    setLoading(true);

    try {
      const result = await runVideoSimulation(user._id, script, { videoLength, platform: "all" });
      setSimulation(result);
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  const handleAutoCreate = async () => {
    if (!simulation?.bestVariation) return;
    const url = await autoCreateBestVideo(user._id, simulation.bestVariation);
    setBestVideoUrl(url);
    alert("Auto-optimized video created!");
  };

  const handleUpgrade = async () => {
    setUpgrading(true);
    try {
      const upgradedUser = await upgradeFacelessUnlock(user._id, 5);
      setUser(upgradedUser);
      alert("Upgrade successful! Full features unlocked.");
    } catch (err) {
      alert("Upgrade failed: " + err.message);
    }
    setUpgrading(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2>ForgeAI Faceless Video Creator + Simulation</h2>
      <textarea placeholder="Enter your script..." value={script} onChange={e => setScript(e.target.value)} style={{ width: "100%", height: "100px" }} />
      <div style={{ margin: "10px 0" }}>
        Video Length:
        <select value={videoLength} onChange={e => setVideoLength(Number(e.target.value))} style={{ marginLeft: "10px" }}>
          <option value={1}>1 min</option>
          <option value={2}>2 min</option>
          <option value={5}>5 min</option>
        </select>
      </div>
      <button onClick={handleSimulate} style={{ marginRight: "10px", padding: "10px 20px" }}>{loading ? "Simulating..." : "Run Simulation"}</button>
      {!user.facelessUnlocked && <button onClick={handleUpgrade} style={{ padding: "10px 20px", background: "green", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>{upgrading ? "Upgrading..." : "Unlock Full Features ($5/month)"}</button>}
      
      {simulation && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "15px", borderRadius: "5px" }}>
          <h3>Simulation Results</h3>
          <p><strong>Best Variation:</strong> Avatar: {simulation.bestVariation.avatar}, Voice: {simulation.bestVariation.voice}, Thumbnail: {simulation.bestVariation.thumbnail}</p>
          <p><strong>Predicted Success:</strong> {simulation.bestVariation.successProbability}%</p>
          <p><strong>Emotion Score:</strong> {simulation.bestVariation.emotionScore}</p>
          <button onClick={handleAutoCreate} style={{ padding: "10px 20px", marginTop: "10px" }}>Auto-Create Best Video</button>
        </div>
      )}

      {bestVideoUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>Auto-Optimized Video</h3>
          <a href={bestVideoUrl} target="_blank" rel="noopener noreferrer">View Video</a>
        </div>
      )}
    </div>
  );
}
