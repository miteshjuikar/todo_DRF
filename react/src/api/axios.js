import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // ENV Configuration
});

export default api;
