import api from './axios';

export const getCart = async() => {
    const response = await api.get("/cart");
    return response.data;
}

export const addToCart = async(product) => {
    const response = await api.post("/cart", product);
    return response.data;
}

export const checkout = async() => {
    const response = await api.post("/cart/checkout");
    return response.data;
}

export const confirmCheckout = async (sessionId) => {
  const response = await api.post("/cart/checkout/confirm", { sessionId }
  );

  return response.data;
};