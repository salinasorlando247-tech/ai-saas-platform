import useAIStore from "../../store/aiStore";

export default function ReasoningPanel() {

  const decisions = useAIStore(s => s.decisions);

  return (
    <div>
      <h2>AI Reasoning Engine</h2>

      {decisions.map((d, i) => (
        <div key={i}>
          {d}
        </div>
      ))}
    </div>
  );
}
