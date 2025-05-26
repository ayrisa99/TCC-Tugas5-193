import axios from "axios";

const instance = axios.create({
  baseURL: "https://backend-193-174534490336.us-central1.run.app/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    // Pastikan deklarasi variabel accessToken di sini:
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
