import apiAxios from "../utils/axiosInterceptors";
const endpoint = "/api/cefrs";

export const getCefr = async () => {
  const response = await apiAxios.get(endpoint);
  return response.data;
};

export const getCefrById = async (id) => {
  const response = await apiAxios.get(`${endpoint}/${id}`);
  return response.data;
};

export const createCefr = async (cefr) => {
  const response = await apiAxios.post(endpoint, cefr);
    return response.data;
};

export const updateCefr = async (id,cefr) => {
  const response = await apiAxios.put(`${endpoint}/${id}`, cefr);
  return response.data;
};

export const deleteCefr = async (id) => {
  const response = await apiAxios.delete(`${endpoint}/${id}`);
  return response.data;
};
