import axios from 'axios';

const API = axios.create({
  baseURL: "https://user-management-system-backend-cbh0.onrender.com/api/",
  withCredentials: true,
});

export default API;