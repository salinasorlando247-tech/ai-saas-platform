export async function handleFacelessUnlock(user) {
  user.facelessUnlocked = true;
  user.facelessResetAt = Date.now() + 30 * 24 * 60 * 60 * 1000;
}
