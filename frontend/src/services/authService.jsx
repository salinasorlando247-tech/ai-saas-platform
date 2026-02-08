import API from "./api";

export const loginUser = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const signupUser = async (email, password) => {
  const res = await API.post("/auth/signup", { email, password });
  return res.data;
};

export const getCurrentUser = async () => {
  try {
    const res = await API.get("/auth/me");
    return res.data.user;
  } catch {
    return null;
  }
};
