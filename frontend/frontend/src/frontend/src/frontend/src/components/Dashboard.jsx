import React, { useState, useEffect } from "react";

function Dashboard() {
  const [industry, setIndustry] = useState("");
  const [topic, setTopic] = useState("");
  const [posts, setPosts] = useState([]);
  const [rawFile, setRawFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all posts from backend
  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  const handleGenerate = async () => {
    if (!industry || (!topic && !rawFile)) return alert("Enter all fields");

    setLoading(true);

    let formData = new FormData();
    formData.append("industry", industry);
    formData.append("topic", topic || "");
    if (rawFile) formData.append("rawFile", rawFile);

    try {
      const res = await fetch("http://localhost:3000/generate", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setPosts((prev) => [data, ...prev]);
      alert("Post generated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error generating post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Create / Import Post</h2>
        <div className="flex flex-col space-y-2">
          <input
            className="border p-2 rounded"
            placeholder="Industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            placeholder="Topic (optional if importing raw content)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <input
            type="file"
            accept="video/*,audio/*"
            onChange={(e) => setRawFile(e.target.files[0])}
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Generate / Import Post"}
          </button>
        </div>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Posts</h2>
        {posts.length === 0 && <p>No posts yet.</p>}
        <ul className="space-y-4">
          {posts.map((post, index) => (
            <li key={index} className="border p-2 rounded">
              <p>
                <strong>Industry:</strong> {post.industry}
              </p>
              <p>
                <strong>Topic:</strong> {post.topic}
              </p>
              <p>{post.content}</p>
              {post.simulated && (
                <span className="text-orange-600 font-bold">[SIMULATED]</span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;
