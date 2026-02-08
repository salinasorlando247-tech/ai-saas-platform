export const roles = {
  admin: ["ALL"],
  editor: ["EDIT", "UPLOAD"],
  viewer: ["VIEW"]
};

export const checkPermission = (role, action) => {
  return roles[role]?.includes("ALL") || roles[role]?.includes(action);
};
