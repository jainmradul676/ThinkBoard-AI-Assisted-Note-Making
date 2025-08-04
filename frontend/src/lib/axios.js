import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Enable sending cookies with requests
});

export default api;
