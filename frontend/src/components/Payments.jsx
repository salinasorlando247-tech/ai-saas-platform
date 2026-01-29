import axios from "axios";

export default function Payments() {

  const startCheckout = async () => {
    const res = await axios.post("http://localhost:5000/api/payments/create");
    window.location.href = res.data.url;
  };

  return (
    <div className="card">
      <h3>Upgrade Plan</h3>
      <button onClick={startCheckout}>
        Upgrade To Pro
      </button>
    </div>
  );
}
