const rateLimit = require("express-rate-limit");

const make = (windowMs, limit, message) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message },
  });

exports.loginLimiter = make(
  15 * 60 * 1000,
  10,
  "Too many login attempts, try again in 15 minutes",
);
exports.leadLimiter = make(
  60 * 60 * 1000,
  20,
  "Too many submissions, try again later",
);
