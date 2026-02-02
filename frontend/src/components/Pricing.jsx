import axios from "axios";

export default function Pricing(){

  const subscribe = async (priceId)=>{

    const token = localStorage.getItem("token");

    const res = await axios.post("/api/billing/checkout",
      { priceId },
      { headers:{ Authorization:`Bearer ${token}` } }
    );

    window.location.href = res.data.url;
  };

  return (
    <div style={{padding:40}}>

      <h1>Pricing Plans</h1>

      <h2>$49 Starter</h2>
      <ul>
        <li>AI Video Editor</li>
        <li>Image Generator</li>
        <li>30 Videos/Month</li>
        <li>Captions</li>
      </ul>
      <button onClick={()=>subscribe("price_starter_id")}>
        Subscribe Starter
      </button>

      <h2>$99 Pro</h2>
      <ul>
        <li>Bulk Generation</li>
        <li>Depth Editing</li>
        <li>Trend AI</li>
        <li>150 Videos/Month</li>
      </ul>
      <button onClick={()=>subscribe("price_pro_id")}>
        Subscribe Pro
      </button>

      <h2>$199 Enterprise</h2>
      <ul>
        <li>Unlimited Videos</li>
        <li>Auto Posting</li>
        <li>Motion AI Pro</li>
        <li>White Label</li>
      </ul>
      <button onClick={()=>subscribe("price_enterprise_id")}>
        Subscribe Enterprise
      </button>

    </div>
  );
}
