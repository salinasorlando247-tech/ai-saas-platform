import { useEffect,useState } from "react";
import axios from "axios";

export default function ReferralBox(){

  const [code,setCode] = useState("");

  useEffect(()=>{

    const load = async ()=>{
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/referral/code",{
        headers:{Authorization:`Bearer ${token}`}
      });

      setCode(res.data.referral_code);
    };

    load();

  },[]);

  return (
    <div>
      <h3>Your Referral Link</h3>

      <input
        value={`https://yoursite.com/signup?ref=${code}`}
        readOnly
      />
    </div>
  );
}
