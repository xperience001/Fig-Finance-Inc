import axios from "axios";

const REGISTER_URL = `${process.env.REACT_APP_API_URL}/auth/register`;
const LOGIN_URL = `${process.env.REACT_APP_API_URL}/auth/login`;

const register = async (userData) => {
  const response = await axios.post(REGISTER_URL, userData);
  if (response.data) {
    const { data } = response.data;
    localStorage.setItem("user", JSON.stringify(data));
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(LOGIN_URL, userData);
  if (response.data) {
    const { data } = response.data;
    localStorage.setItem("user", JSON.stringify(data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authServices = {
  register,
  login,
  logout,
};

export default authServices;
