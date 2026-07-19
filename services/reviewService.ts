import { API_URL } from "../constants/api";
import { getToken } from "./storage";

// ─────────────────────────────────────────
// GET REVIEWS FOR A CONSTRUCTION
// Thinking: no token needed
// ─────────────────────────────────────────
export const getReviews = async (constructionId: string) => {
  const response = await fetch(`${API_URL}/reviews/${constructionId}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch reviews");
  }

  return data;
};

// ─────────────────────────────────────────
// SUBMIT A REVIEW
// Thinking: logged in user only, needs token
// ─────────────────────────────────────────
export const submitReview = async (
  constructionId: string,
  reviewData: object,
) => {
  const token = await getToken();

  const response = await fetch(`${API_URL}/reviews/${constructionId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to submit review");
  }

  return data;
};
