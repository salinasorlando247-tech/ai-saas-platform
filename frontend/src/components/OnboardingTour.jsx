import { useState } from "react";

export default function OnboardingTour(){

  const [step,setStep] = useState(0);

  const steps = [
    "Welcome! Click Create Video to start.",
    "Upload or enter a prompt.",
    "Click Generate.",
    "Upgrade to unlock bulk tools."
  ];

  if(step >= steps.length) return null;

  return (
    <div style={{
      position:"fixed",
      bottom:20,
      right:20,
      background:"#111",
      color:"#fff",
      padding:15,
      borderRadius:10
    }}>

      <p>{steps[step]}</p>

      <button onClick={()=>setStep(step+1)}>
        Next
      </button>

    </div>
  );
}
