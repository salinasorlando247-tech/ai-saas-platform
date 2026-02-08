import axios from "axios";

export async function scheduleFacelessVideo(userId, script, videoLength, scheduleTime) {
  const { data } = await axios.post("/api/faceless/schedule", {
    userId,
    script,
    videoLength,
    scheduleTime,
  });

  // Enforce editing power based on unlock
  data.editingPower = data.facelessUnlocked ? "FullForgeAIQuality" : "FreeTierQuality";

  return data;
}
