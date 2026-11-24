const Lead = require("../models/Lead");

exports.createLead = async (req, res, next) => {
  try { res.status(201).json(await Lead.create(req.body)); } catch (e) { next(e); }
};

exports.getLeads = async (req, res, next) => {
  try {
    const filter = req.query.status ? { status: req.query.status } : {};
    res.json(await Lead.find(filter).sort("-createdAt"));
  } catch (e) { next(e); }
};

exports.getLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (e) { next(e); }
};

exports.updateLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (e) { next(e); }
};

exports.addNote = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    lead.notes.push({ text: req.body.text });
    await lead.save();
    res.json(lead);
  } catch (e) { next(e); }
};

exports.deleteLead = async (req, res, next) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted" });
  } catch (e) { next(e); }
};