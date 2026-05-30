import { request } from "./axiosClient.js";

function unwrap(response) {
  return response?.data ?? response;
}

function normalizeUser(user) {
  return {
    ...user,
    displayName: user.fullName ?? user.username,
    status: user.status ?? (user.enabled ? "ACTIVE" : "LOCKED")
  };
}

export const authApi = {
  async login({ username, password }) {
    const response = await request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ usernameOrEmail: username, password })
    });
    const data = unwrap(response);
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      tokenType: data.tokenType,
      user: normalizeUser(data.user)
    };
  },
  async registerCustomer(payload) {
    const response = await request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    const data = unwrap(response);
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      tokenType: data.tokenType,
      user: normalizeUser(data.user)
    };
  },
  async getUsers() {
    const response = await request("/api/auth/users");
    return unwrap(response).map(normalizeUser);
  },
  async createUser(payload) {
    const response = await request("/api/auth/users", {
      method: "POST",
      body: JSON.stringify(payload)
    });
    return normalizeUser(unwrap(response));
  },
  async updateUser(id, payload) {
    const response = await request(`/api/auth/users/${id}/status`, {
      method: "PUT",
      body: JSON.stringify(payload)
    });
    return normalizeUser(unwrap(response));
  },
  async deleteUser(id) {
    await request(`/api/auth/users/${id}`, { method: "DELETE" });
    return true;
  },
  forgotPassword() {
    return { message: "Chức năng quên mật khẩu đang được mô phỏng ở frontend." };
  }
};
