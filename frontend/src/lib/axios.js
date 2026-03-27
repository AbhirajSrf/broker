import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // fixed API base URL
  withCredentials: true,
});
