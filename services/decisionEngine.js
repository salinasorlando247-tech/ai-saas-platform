export function decisionGate({ simulation, confidence }) {
  if (confidence < 50) {
    return { allow: false, reason: "Confidence too low" };
  }

  if (simulation.floor < simulation.median * 0.35) {
    return { allow: false, reason: "Downside risk too high" };
  }

  return { allow: true };
}
