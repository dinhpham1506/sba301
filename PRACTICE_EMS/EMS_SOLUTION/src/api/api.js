import axios from "axios";

// Gọi qua Vite proxy để tránh CORS. Đổi cổng BE (8080) trong vite.config.js.
const BASE_URL = "/api";

export async function getData(path, params) {
  const response = await axios.get(BASE_URL + path, { params });
  return response.data;
}

export async function postData(path, data) {
  const response = await axios.post(BASE_URL + path, data);
  return response.data;
}

export async function putData(path, data) {
  const response = await axios.put(BASE_URL + path, data);
  return response.data;
}

export async function deleteData(path) {
  const response = await axios.delete(BASE_URL + path);
  return response.data;
}

export async function patchData(path, data) {
  const response = await axios.patch(BASE_URL + path, data);
  return response.data;
}
