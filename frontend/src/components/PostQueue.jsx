import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoEditor from "./VideoEditor";

export default function PostQueue() {
  const [queue, setQueue] = useState([]);

  const loadQueue = async () => {
    const res = await axios.get("http://localhost:5000/api/queue");
    setQueue(res.data);
  };

  const approve = async (id) => {
    await axios.post(`http://localhost:5000/api/queue/approve/${id}`);
    loadQueue();
  };

  const recreate = async (id) => {
    const res = await axios.post(`http://localhost:5000/api/queue/recreate/${id}`);
    alert(`New improved video created: ${res.data.newFile}`);
    loadQueue();
  };

  useEffect(() => { loadQueue(); }, []);

  return (
    <div>
      {queue.map(item => (
        <div key={item.id} className="queue-item">
          <h3>{item.title}</h3>
          <p>Status: {item.status}</p>
          <button onClick={() => approve(item.id)}>Approve & Schedule</button>
          <button onClick={() => recreate(item.id)}>Recreate AI Version</button>
          <VideoEditor videoPath={item.filePath} refreshQueue={loadQueue} />
        </div>
      ))}
    </div>
  );
}
