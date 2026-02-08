import { checkPermission } from "./roleService.js";

export const manageUser = (req, res) => {

  const { role, action } = req.body;

  const allowed = checkPermission(role, action);

  res.json({
    allowed
  });
};
