import { authApi } from "../api/authApi.js";

const STORAGE_KEY = "ecommerce-auth-session";

export const authService = {
  getStoredSession() {
    const saved = localStorage.getItem(STORAGE_KEY) ?? sessionStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  },
  getStoredUser() {
    return this.getStoredSession()?.user ?? null;
  },
  getAccessToken() {
    return this.getStoredSession()?.accessToken ?? null;
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
  persist(session, remember = true) {
    const target = remember ? localStorage : sessionStorage;
    const other = remember ? sessionStorage : localStorage;
    other.removeItem(STORAGE_KEY);
    target.setItem(STORAGE_KEY, JSON.stringify(session));
  },
  clear() {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  }
};
