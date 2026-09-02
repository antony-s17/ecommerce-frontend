import api from './axios';

export const getCart = async() => {
    const response = await api.get("/cart");
    return response.data;
}

export const addToCart = async(product) => {
    const response = await api.post("/cart", product);
    return response.data;
}

export const updateCartItem = async(id, data) => {
    const response = await api.put(`/cart/${id}`, data );
    return response.data;
}

export const removeFromCart = async(id) => {
    const response = await api.delete(`/cart/${id}`);
    return response.data;
}

export const checkoutCart = async() => {
    const response = await api.post("/cart/checkout");
    return response.data;
}