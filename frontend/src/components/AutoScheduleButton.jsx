import React from "react";
import axios from "axios";

export default function AutoScheduleButton({ onPostScheduled }) {
  const handleClick = async () => {
    await axios.post("http://localhost:5000/api/auto-schedule", {
      topic: "Auto-scheduled post"
    });
    onPostScheduled();
  };

  return <button onClick={handleClick}>Auto-Schedule Post</button>;
}
