import "../styles/Sidebar.css";

export default function Sidebar({ setActivePanel }) {
  return (
    <div className="sidebar">
      <h2>AI Dashboard</h2>

      <button onClick={() => setActivePanel("analytics")}>📊 Analytics</button>

      <button onClick={() => setActivePanel("askai")}>🤖 Ask AI</button>

      <button onClick={() => setActivePanel("create")}>✍ Create Post</button>

      <button onClick={() => setActivePanel("engagement")}>
        🚀 Engagement Predictor
      </button>

      <button onClick={() => setActivePanel("besttime")}>
        ⏰ Best Time To Post
      </button>
    </div>
  );
}
