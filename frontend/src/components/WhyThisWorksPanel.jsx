export default function WhyThisWorksPanel({ reasons }) {
  return (
    <div className="explain-panel">
      <h3>Why This Will Work</h3>
      <ul>
        {reasons.map((r, i) => (
          <li key={i}>✔ {r}</li>
        ))}
      </ul>
    </div>
  );
}
