export function enforceOwnership(data) {
  return {
    ...data,
    clientAccess: "derived_only",
    rawAccess: false
  };
}
