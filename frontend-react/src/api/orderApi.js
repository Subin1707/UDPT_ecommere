import { request } from "./axiosClient.js";

export const orderApi = {
  getAll: () => request("/api/orders"),
  create: (payload) => request("/api/orders", { method: "POST", body: JSON.stringify(payload) }),
  update: (id, payload) => request(`/api/orders/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  delete: (id) => request(`/api/orders/${id}`, { method: "DELETE" }),
  health: () => request("/health/order")
};
