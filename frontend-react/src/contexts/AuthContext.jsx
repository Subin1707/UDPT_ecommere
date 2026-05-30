import { createContext, useMemo, useState } from "react";
import { authService } from "../services/authService.js";
import { landingScreenForRole } from "../utils/constants.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(authService.getStoredUser);

  async function login({ username, password, remember }) {
    const session = await authService.login({ username, password });
    if (remember) authService.persist(session);
    else authService.clear();
    setCurrentUser(session.user);
    return session.user;
  }

  async function registerCustomer(payload) {
    const session = await authService.registerCustomer(payload);
    authService.persist(session);
    setCurrentUser(session.user);
    return session.user;
  }

  function logout() {
    authService.clear();
    setCurrentUser(null);
  }

  const value = useMemo(() => ({
    currentUser,
    login,
    registerCustomer,
    logout,
    landingScreen: currentUser ? landingScreenForRole(currentUser.role) : "login"
  }), [currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
