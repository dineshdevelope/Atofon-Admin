import API from "./api";

export const register = async (userData) => {
  const response = await API.post("api/auth/register", userData);
  localStorage.setItem("token", response.data.token);
  return getCurrentUser();
};

export const login = async (credentials) => {
  const response = await API.post("api/auth/login", credentials);
  localStorage.setItem("token", response.data.token);
  return getCurrentUser();
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    // In a real app, you might want to verify the token or fetch user data from the backend
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
