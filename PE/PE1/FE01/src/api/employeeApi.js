import axios from "axios";
const API_URL = "http://localhost:8080/api/employees";

export const getEmployees = async () => {
    const response = await axios.get(API_URL);
    return response.data;

};

export const deleteEmployee = async (id) => {
    console.log("Deleting employee:", id);
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log("Delete response:", response);
    console.log("Deleted employee:", id);
    return response.data;
};
export const getEmployeeById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};