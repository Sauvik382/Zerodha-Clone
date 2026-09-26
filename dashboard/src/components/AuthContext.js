import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext({
  isAuthenticated: false,
  isLoading: true,
  user: null,
});

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // If we just arrived from the login app, it attaches the token as a
    // query param — grab it, save it, then clean it out of the URL.
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      params.delete("token");
      const cleanUrl =
        window.location.pathname +
        (params.toString() ? `?${params.toString()}` : "");
      window.history.replaceState({}, "", cleanUrl);
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/login`;
      return;
    }

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("token");
        // no valid token — send the user back to the login page
        window.location.href = `${process.env.REACT_APP_FRONTEND_URL}/login`;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;