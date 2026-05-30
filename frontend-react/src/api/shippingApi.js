import { request } from "./axiosClient.js";

export const shippingApi = {
  getAll: () => request("/api/deliveries"),
  updateStatus: (id, payload) => request(`/api/deliveries/${id}/status`, { method: "PUT", body: JSON.stringify(payload) }),
  health: () => request("/health/shipping")
};
