import api from "./axios";

export const getProducts = async () => {
  const response = await api.get("/product");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/product/${id}`);
  return response.data;
};

export const createProduct = async ({ product, image }) => {
  const formData = new FormData();

  formData.append("product", JSON.stringify(product));

  if (image) {
    formData.append("image", image);
  }

  const response = await api.post("/product", formData);

  return response.data;
};

export const updateProduct = async (id, { data, image }) => {
  const formData = new FormData();

  formData.append("data", JSON.stringify(data));

  if (image) {
    formData.append("image", image);
  }

  const response = await api.put(`/product/${id}`, formData);

  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/product/${id}`);

  return response.data;
};