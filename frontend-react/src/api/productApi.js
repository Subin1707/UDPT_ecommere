import { request } from "./axiosClient.js";

export const productApi = {
  getAll: () => request("/api/products"),
  create: (payload) => request("/api/products", { method: "POST", body: JSON.stringify(payload) }),
  update: (id, payload) => request(`/api/products/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  delete: (id) => request(`/api/products/${id}`, { method: "DELETE" }),
  health: () => request("/health/product")
};
