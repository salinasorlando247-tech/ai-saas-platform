import {
  createApproval,
  getPendingApprovals,
  updateApprovalStatus
} from "../models/Approval.js";

export const proposeAction = async (userId, actionType, payload) => {

  // placeholder AI confidence score (later real model)
  const confidence = Math.random().toFixed(2);

  await createApproval(userId, actionType, payload, confidence);

  return {
    message: "Action submitted for approval",
    confidence
  };
};

export const fetchApprovals = async (userId) => {
  return await getPendingApprovals(userId);
};

export const resolveApproval = async (id, decision) => {

  if (!["approved", "rejected"].includes(decision)) {
    throw new Error("Invalid decision");
  }

  await updateApprovalStatus(id, decision);

  return {
    message: `Action ${decision}`
  };
};
