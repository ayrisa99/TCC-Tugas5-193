import axios from "axios";

const instance = axios.create({
  baseURL: "https://backend-193-174534490336.us-central1.run.app/", // Ganti dengan URL backend kamu
  withCredentials: true,
});

export default instance;