export default function UsagePanel({ usage }) {
  return (
    <div className="usage-panel">
      <h3>Usage</h3>
      <p>AI Seconds: {usage.aiSeconds}</p>
      <p>GPU Seconds: {usage.gpuSeconds}</p>
      <p>Videos Created: {usage.videosCreated}</p>
      <p>Platforms Posted: {usage.platformsPosted}</p>
    </div>
  )
}
