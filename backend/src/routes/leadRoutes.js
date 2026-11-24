const router = require("express").Router();
const auth = require("../middleware/auth");
const c = require("../controllers/leadController");

router.post("/", c.createLead); // public contact form
router.get("/", auth, c.getLeads);
router.get("/:id", auth, c.getLead);
router.patch("/:id", auth, c.updateLead);
router.post("/:id/notes", auth, c.addNote);
router.delete("/:id", auth, c.deleteLead);

module.exports = router;