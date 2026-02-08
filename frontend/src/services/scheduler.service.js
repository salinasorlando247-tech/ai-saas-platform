import axios from "axios";

export async function scheduleFacelessVideo(userId, script, videoLength, scheduleTime) {
  // Verify limits and unlock
  const { data } = await axios.post("/api/faceless/schedule", {
    userId,
    script,
    videoLength,
    scheduleTime,
  });

  return data;
}
