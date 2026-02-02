import { useState } from "react";
import axios from "axios";

export default function Waitlist(){

  const [email,setEmail] = useState("");

  const submit = async ()=>{

    await axios.post("/api/waitlist",{email});
    alert("You're on the list.");
  };

  return (
    <div style={{padding:50}}>

      <h2>Early Access</h2>

      <input
        placeholder="Email"
        onChange={e=>setEmail(e.target.value)}
      />

      <button onClick={submit}>
        Join Waitlist
      </button>

    </div>
  );
}
