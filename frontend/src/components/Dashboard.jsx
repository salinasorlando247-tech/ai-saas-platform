import React from "react";
import Scheduler from "./Scheduler";
import Analytics from "./Analytics";
import Payments from "../payments";

export default function Dashboard() {

  return (
    <div>

      <h1>AI Control Center</h1>

      <Scheduler />

      <Analytics />

      <Payments />

    </div>
  );
}
