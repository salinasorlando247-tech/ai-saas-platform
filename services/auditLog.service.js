export function logAction(userId, action, meta = {}) {
  console.log(JSON.stringify({
    userId,
    action,
    meta,
    timestamp: Date.now()
  }));
}
