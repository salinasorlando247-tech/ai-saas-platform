let failures = 0;

export function guardExternalCall(fn) {
  if (failures > 5) {
    throw new Error("Service temporarily disabled");
  }

  try {
    return fn();
  } catch {
    failures++;
    throw new Error("External service error");
  }
}
