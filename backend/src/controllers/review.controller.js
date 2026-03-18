import Review from "../models/Review.model.js";

export const addReview = async (req, res) => {
  const review = await Review.create({
    ...req.body,
    user: req.user.id,
  });
  res.status(201).json(review);
};

export const getVendorReviews = async (req, res) => {
  const reviews = await Review.find({ vendor: req.params.vendorId });
  res.json(reviews);
};
