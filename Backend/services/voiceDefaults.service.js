export function getIndustryVoice(industry) {
  const map = {
    fitness: "cinematic_human",
    finance: "deep_authority",
    gaming: "genz_animated",
    education: "friendly_explainer",
    tech: "robot_ai"
  };

  return map[industry] || "cinematic_human";
}
