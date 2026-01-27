export default function PlatformBreakdown() {
  const platforms = [
    { name: "Instagram", views: 42000 },
    { name: "TikTok", views: 61000 },
    { name: "YouTube", views: 21000 },
    { name: "X (Twitter)", views: 4400 }
  ];

  return (
    <div className="card">
      <h2>Platform Performance</h2>
      <ul>
        {platforms.map(p => (
          <li key={p.name}>
            {p.name}: {p.views.toLocaleString()} views
          </li>
        ))}
      </ul>
    </div>
  );
}
