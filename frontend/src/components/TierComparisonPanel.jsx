export default function TierComparisonPanel({ userTier }) {
  const tiers = [
    { name: "Free", faceless: false, avatars: false, maxMinutes: 120, referral: true, insights: "Basic" },
    { name: "Starter", faceless: true, avatars: true, maxMinutes: 500, referral: true, insights: "Advanced" },
    { name: "Pro", faceless: true, avatars: true, maxMinutes: 1000, referral: true, insights: "Pro" },
    { name: "Elite", faceless: true, avatars: true, maxMinutes: Infinity, referral: true, insights: "All-in" },
  ];

  const getCheck = (condition) => condition ? "✔️" : "❌";

  return (
    <div style={{marginBottom:"30px"}}>
      <h2>Compare Your Tier</h2>
      <table style={{width:"100%", borderCollapse:"collapse"}}>
        <thead>
          <tr style={{backgroundColor:"#333", color:"#fff"}}>
            <th>Feature</th>
            {tiers.map((tier,i)=>(
              <th key={i} style={{padding:"4px", backgroundColor: tier.name === userTier ? "#4caf50" : "#555"}}>
                {tier.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Faceless Video Access</td>
            {tiers.map((tier,i)=>(
              <td key={i} style={{textAlign:"center"}}>{getCheck(tier.faceless)}</td>
            ))}
          </tr>
          <tr>
            <td>Ultra-realistic Avatars</td>
            {tiers.map((tier,i)=>(
              <td key={i} style={{textAlign:"center"}}>{getCheck(tier.avatars)}</td>
            ))}
          </tr>
          <tr>
            <td>Max Faceless Minutes / Month</td>
            {tiers.map((tier,i)=>(
              <td key={i} style={{textAlign:"center"}}>{tier.maxMinutes === Infinity ? "Unlimited" : tier.maxMinutes}</td>
            ))}
          </tr>
          <tr>
            <td>Referral Earnings</td>
            {tiers.map((tier,i)=>(
              <td key={i} style={{textAlign:"center"}}>{getCheck(tier.referral)}</td>
            ))}
          </tr>
          <tr>
            <td>AI Insights Level</td>
            {tiers.map((tier,i)=>(
              <td key={i} style={{textAlign:"center"}}>{tier.insights}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
