import { authApi } from "../api/authApi.js";

const STORAGE_KEY = "ecommerce-auth-session";

export const authService = {
  getStoredUser() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).user : null;
  },
  login(payload) {
    return authApi.login(payload);
  },
  registerCustomer(payload) {
    return authApi.registerCustomer(payload);
  },
  getUsers() {
    return authApi.getUsers();
  },
  createUser(payload) {
    return authApi.createUser(payload);
  },
  updateUser(id, payload) {
    return authApi.updateUser(id, payload);
  },
  deleteUser(id) {
    return authApi.deleteUser(id);
  },
  persist(session) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  },
  clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
