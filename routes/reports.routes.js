// reports.routes.js
const express = require("express");
const router = express.Router();
const { enforceRole } = require("../auth.sso");
const { generateReport } = require("../controllers/reports.controller");

// Only Admin can access reports
router.get("/reports", enforceRole(3), generateReport);

module.exports = router;
