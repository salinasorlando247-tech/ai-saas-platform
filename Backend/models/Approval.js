import db from "../config/db.js";

export const createApproval = async (userId, actionType, payload, confidence) => {
  const [result] = await db.execute(
    "INSERT INTO approvals (user_id, action_type, payload, ai_confidence) VALUES (?, ?, ?, ?)",
    [userId, actionType, JSON.stringify(payload), confidence]
  );
  return result;
};

export const getPendingApprovals = async (userId) => {
  const [rows] = await db.execute(
    "SELECT * FROM approvals WHERE user_id = ? AND status = 'pending'",
    [userId]
  );
  return rows;
};

export const updateApprovalStatus = async (id, status) => {
  const [result] = await db.execute(
    "UPDATE approvals SET status = ? WHERE id = ?",
    [status, id]
  );
  return result;
};
