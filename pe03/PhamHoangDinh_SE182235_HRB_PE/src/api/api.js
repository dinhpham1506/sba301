import axios from "axios";

// Gọi qua proxy Vite (vite.config.js) để khỏi CORS
const api = axios.create({ baseURL: "/api" });

export const getData = (path, params) => api.get(path, { params }).then((r) => r.data);
export const postData = (path, data) => api.post(path, data).then((r) => r.data);
export const putData = (path, data) => api.put(path, data).then((r) => r.data);
export const deleteData = (path) => api.delete(path).then((r) => r.data);
