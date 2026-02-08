import { scoreAction } from "./scoringEngine.js";

export const decideNextAction = (actions) => {

  let best = null;
  let bestScore = -Infinity;

  actions.forEach(action => {

    const score = scoreAction(action);

    const total =
      score.engagement +
      score.growth -
      score.risk;

    if (total > bestScore) {
      bestScore = total;
      best = action;
    }

  });

  return best;
};
