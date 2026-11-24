const { body, validationResult } = require("express-validator");

const check = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });
  next();
};

const validateLead = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }).withMessage("Name is too long"),
  body("email").trim().isEmail().withMessage("A valid email is required"),
  body("phone").optional({ values: "falsy" }).trim().isLength({ max: 30 }).withMessage("Phone is too long"),
  body("source").optional().trim().isLength({ max: 50 }).withMessage("Source is too long"),
  check,
];

const validateLogin = [
  body("email").trim().isEmail().withMessage("A valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
  check,
];

const validateUpdate = [
  body("status").optional().isIn(["new", "contacted", "converted"]).withMessage("Invalid status"),
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
  body("email").optional().trim().isEmail().withMessage("A valid email is required"),
  check,
];

const validateNote = [
  body("text").trim().notEmpty().withMessage("Note cannot be empty").isLength({ max: 500 }).withMessage("Note is too long"),
  check,
];

module.exports = { validateLead, validateLogin, validateUpdate, validateNote };