import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.29:8000',
  withCredentials: true,
});

export default api;