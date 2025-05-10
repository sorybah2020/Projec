import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const baseUrl = import.meta.env.DEV ? "http://localhost:3000" : "";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export default axiosInstance;
