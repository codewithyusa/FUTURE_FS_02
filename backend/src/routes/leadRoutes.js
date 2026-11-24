const router = require("express").Router();
const auth = require("../middleware/auth");
const c = require("../controllers/leadController");
const { leadLimiter } = require("../middleware/rateLimiter");
const {
  validateLead,
  validateUpdate,
  validateNote,
} = require("../middleware/validate");

router.post("/", leadLimiter, validateLead, c.createLead); // public contact form
router.get("/", auth, c.getLeads);
router.get("/:id", auth, c.getLead);
router.patch("/:id", auth, validateUpdate, c.updateLead);
router.post("/:id/notes", auth, validateNote, c.addNote);
router.delete("/:id", auth, c.deleteLead);

module.exports = router;
