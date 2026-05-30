import { request } from "./axiosClient.js";

export const categoryApi = {
  getAll: () => request("/api/categories"),
  create: (payload) => request("/api/categories", { method: "POST", body: JSON.stringify(payload) }),
  update: (id, payload) => request(`/api/categories/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  delete: (id) => request(`/api/categories/${id}`, { method: "DELETE" })
};
