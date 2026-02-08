export function allowPost(simulation, confidence) {
  if (confidence < 50) return false;
  if (simulation.floor < simulation.median * 0.35) return false;
  return true;
}
