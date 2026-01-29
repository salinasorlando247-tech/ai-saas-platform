export default function BuyCreditsModal(){
  return (
    <div style={{ border:"1px solid #0ff", padding:"1rem", borderRadius:"10px" }}>
      <h3>Buy Credits</h3>
      <button style={{ margin:"0.5rem", background:"#0ff", border:"none", padding:"0.5rem 1rem" }}>Stripe</button>
      <button style={{ margin:"0.5rem", background:"#0ff", border:"none", padding:"0.5rem 1rem" }}>PayPal</button>
      <button style={{ margin:"0.5rem", background:"#0ff", border:"none", padding:"0.5rem 1rem" }}>Venmo</button>
      <button style={{ margin:"0.5rem", background:"#0ff", border:"none", padding:"0.5rem 1rem" }}>Cash App</button>
    </div>
  )
}
