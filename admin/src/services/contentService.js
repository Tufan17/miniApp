import apiAxios from "../utils/axiosInterceptors";
const endpoint = "/api/contents";

export const getContents = async () => {
  const response = await apiAxios.get(endpoint);
  return response.data;
};

export const getContent = async (id) => {
  const response = await apiAxios.get(`${endpoint}/${id}`);
  return response.data;
};

export const createContent = async (content) => {
  const response = await apiAxios.post(endpoint, content);
    return response.data;
};

export const updateContent = async (id,content) => {
  const response = await apiAxios.put(`${endpoint}/${id}`, content);
  return response.data;
};

export const deleteContent = async (id) => {
  const response = await apiAxios.delete(`${endpoint}/${id}`);
  return response.data;
};
