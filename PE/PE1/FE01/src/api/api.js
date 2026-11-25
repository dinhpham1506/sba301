import axios from "axios";

// Đổi địa chỉ backend ở đây khi làm bài khác.
const BASE_URL = "http://localhost:8080/api";

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

export async function patchData(path, data) {
  const response = await axios.patch(BASE_URL + path, data);
  return response.data;
}

export async function deleteData(path) {
  const response = await axios.delete(BASE_URL + path);
  return response.data;
}
