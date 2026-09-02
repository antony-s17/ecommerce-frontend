import api from "./axios";

export const getReviews = async (productId) => {
  const response = await api.get(`/product/${productId}/reviews`);
  return response.data;
};

export const createReview = async (productId, reviewData) => {
  const response = await api.post(
    `/product/${productId}/reviews`,
    reviewData
  );
  return response.data;
};