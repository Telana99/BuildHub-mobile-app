const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Construction = require("../models/Construction");
const auth = require("../middleware/auth");

//get all reviews for a construction
router.get("/:constructionId", async (req, res) => {
  try {
    const reviews = await Review.find({
      construction: req.params.constructionId,
    }).sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//add a review to a construction
router.post("/:constructionId", auth, async (req, res) => {
  try {
    const construction = await Construction.findById(req.params.constructionId);
    if (!construction) {
      return res.status(404).json({ message: "Construction not found" });
    }

    if (construction.owner.toString() === req.user.id) {
      return res
        .status(403)
        .json({ message: "You cannot review your own company" });
    }

    const alreadyReviewed = await Review.findOne({
      construction: req.params.constructionId,
      user: req.user.id,
    });
    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this company" });
    }

    // Step 4 — Create the review
    const { rating, comment, projectType } = req.body;

    const review = new Review({
      construction: req.params.constructionId,
      user: req.user.id,
      userName: req.user.name,
      rating,
      comment,
      projectType,
    });

    await review.save();

    const allReviews = await Review.find({
      construction: req.params.constructionId,
    });

    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / allReviews.length;

    await Construction.findByIdAndUpdate(req.params.constructionId, {
      averageRating: Math.round(averageRating * 10) / 10, // round to 1 decimal
      totalReviews: allReviews.length,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
