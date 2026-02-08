import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

const AIApprovalPanel = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch AI-generated videos pending approval
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("/api/ai/pending");
        setVideos(res.data.videos || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching AI videos:", err);
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const handleApprove = async (id) => {
    setActionLoading(true);
    try {
      await axios.post(`/api/ai/approve/${id}`);
      setVideos(videos.filter((v) => v.id !== id));
    } catch (err) {
      console.error("Approve failed:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (id) => {
    setActionLoading(true);
    try {
      await axios.post(`/api/ai/reject/${id}`);
      setVideos(videos.filter((v) => v.id !== id));
    } catch (err) {
      console.error("Reject failed:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleOverride = async (id) => {
    const newUrl = prompt("Enter new video URL to override AI output:");
    if (!newUrl) return;

    setActionLoading(true);
    try {
      await axios.post(`/api/ai/override/${id}`, { url: newUrl });
      setVideos(videos.filter((v) => v.id !== id));
    } catch (err) {
      console.error("Override failed:", err);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div>Loading AI videos...</div>;
  if (videos.length === 0) return <div>No AI videos pending approval.</div>;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">AI Approval Panel</h2>
      {videos.map((video) => (
        <div
          key={video.id}
          className="border p-4 rounded-lg shadow-sm flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0"
        >
          <div className="w-full md:w-1/2">
            <ReactPlayer
              url={video.url}
              controls
              width="100%"
              height="200px"
            />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
            <button
              disabled={actionLoading}
              onClick={() => handleApprove(video.id)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Approve
            </button>
            <button
              disabled={actionLoading}
              onClick={() => handleReject(video.id)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reject
            </button>
            <button
              disabled={actionLoading}
              onClick={() => handleOverride(video.id)}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Override
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AIApprovalPanel;
