import axios from "axios";

const API = axios.create({
  baseURL: "https://land-dispute-system-4adr.onrender.com/api/",
});

export default API;