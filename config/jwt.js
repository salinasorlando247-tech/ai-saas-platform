import jwt from "jsonwebtoken";
import config from "./config.js";

export const signAccessToken = (payload) =>
  jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.accessTTL });

export const signRefreshToken = (payload) =>
  jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshTTL,
  });

export const verifyRefreshToken = (token) =>
  jwt.verify(token, config.jwt.refreshSecret);
