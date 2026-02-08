import crypto from "crypto";

export function verifySignature(req, res, next) {
  const signature = req.headers["x-forge-signature"];
  const payload = JSON.stringify(req.body);

  const expected = crypto
    .createHmac("sha256", process.env.FORGE_SECRET)
    .update(payload)
    .digest("hex");

  if (signature !== expected) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  next();
}
