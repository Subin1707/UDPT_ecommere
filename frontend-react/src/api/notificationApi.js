import { request } from "./axiosClient.js";

export const notificationApi = {
  getAll: () => request("/api/notifications"),
  health: () => request("/health/notification")
};
