const express = require("express");
const router = express.Router();
const Construction = require("../models/Construction");
const auth = require("../middleware/auth");

// GET ALL CONSTRUCTIONS
router.get("/", async (req, res) => {
  try {
    const constructions = await Construction.find().select("-__v");

    res.json(constructions);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ─────────────────────────────────────────
// GET OWNER'S OWN CONSTRUCTION PROFILE
// Thinking: owner checks if they have a profile
// URL: GET /api/constructions/my-profile
// IMPORTANT: must be before /:id route
// ─────────────────────────────────────────
router.get("/my-profile", auth, async (req, res) => {
  try {
    const construction = await Construction.findOne({ owner: req.user.id });

    if (!construction) {
      return res.status(404).json({ message: "No profile found" });
    }

    res.json(construction);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET CONSTRUCTION BY ID
router.get("/:id", async (req, res) => {
  try {
    const construction = await Construction.findById(req.params.id).select(
      "-__v",
    );

    if (!construction) {
      return res.status(404).json({ message: "Construction not found" });
    }

    res.json(construction);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// CREATE NEW CONSTRUCTION
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res
        .status(403)
        .json({ message: "Only construction owners can create a profile" });
    }

    const existing = await Construction.findOne({ owner: req.user.id });
    if (existing) {
      return res
        .status(400)
        .json({ message: "You already have a construction profile" });
    }

    const {
      companyName,
      ownerName,
      location,
      phone,
      email,
      description,
      speciality,
      experience,
    } = req.body;

    // Create new construction
    const construction = new Construction({
      owner: req.user.id,
      companyName,
      ownerName,
      location,
      phone,
      email,
      description,
      speciality,
      experience,
    });

    await construction.save();

    res.status(201).json(construction);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// UPDATE CONSTRUCTION
router.put("/:id", auth, async (req, res) => {
  try {
    const construction = await Construction.findById(req.params.id);

    if (!construction) {
      return res.status(404).json({ message: "Construction not found" });
    }

    if (construction.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this profile" });
    }

    const updated = await Construction.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
//add project to construction
router.post("/:id/projects", auth, async (req, res) => {
  try {
    const construction = await Construction.findById(req.params.id);

    if (!construction) {
      return res.status(404).json({ message: "Construction not found" });
    }

    if (construction.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, description, location, category } = req.body;

    construction.projects.push({
      title,
      description,
      location,
      category,
    });

    await construction.save();

    res.status(201).json(construction);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
