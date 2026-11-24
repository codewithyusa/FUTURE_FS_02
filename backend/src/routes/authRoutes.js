const router = require("express").Router();
const { login } = require("../controllers/authController");
const { loginLimiter } = require("../middleware/rateLimiter");
const { validateLogin } = require("../middleware/validate");

router.post("/login", loginLimiter, validateLogin, login);

module.exports = router;
