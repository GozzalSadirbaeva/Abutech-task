import axios from "axios";

const instance = axios.create({
  baseURL: "https://dev.api-erp.najotedu.uz/",
  headers: {
    "Content-Type": "application/json",
    // "Content-Type": "text/plain",
  },
});

instance.interceptors.request.use(async (config) => {
  const user = localStorage.getItem("user");

  let token: { [key: string]: any } | null = null;

  if (user) {
    try {
      token = JSON.parse(user).token;
    } catch (error) {}
  }

  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
