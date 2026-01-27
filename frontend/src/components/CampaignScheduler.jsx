import React, { useState } from "react";
import axios from "axios";

export default function CampaignScheduler() {
  const [campaignName, setCampaignName] = useState("");
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [interval, setInterval] = useState(10);

  const addPost = () => {
    if (!content) return;
    setPosts([...posts, { client: "BulkClient", content, platform: "Instagram" }]);
    setContent("");
  };

  const scheduleCampaign = async () => {
    if (!campaignName || posts.length === 0) return alert("Fill campaign details");
    try {
      await axios.post("http://localhost:5000/api/campaign", {
        campaignName,
        posts,
        startTime: new Date(),
        intervalMinutes: interval,
      });
      alert("Campaign scheduled!");
      setPosts([]);
      setCampaignName("");
    } catch (err) {
      console.error(err);
      alert("Failed to schedule campaign");
    }
  };

  return (
    <div>
      <h3>Bulk Campaign Scheduler</h3>
      <input
        placeholder="Campaign Name"
        value={campaignName}
        onChange={(e) => setCampaignName(e.target.value)}
      />
      <input
        placeholder="Post Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="button" onClick={addPost}>Add Post</button>
      <div>
        <p>Posts to schedule: {posts.length}</p>
      </div>
      <input
        type="number"
        value={interval}
        onChange={(e) => setInterval(parseInt(e.target.value))}
        placeholder="Interval minutes"
      />
      <button type="button" onClick={scheduleCampaign}>Schedule Campaign</button>
    </div>
  );
}
