import apiAxios from "../utils/axiosInterceptors";
const endpoint = "/api/levels";

export const getLevels = async () => {
  const response = await apiAxios.get(endpoint);
  return response.data;
};

export const getLevel = async (id) => {
  const response = await apiAxios.get(`${endpoint}/${id}`);
  return response.data;
};

export const createLevel = async (level) => {
  const response = await apiAxios.post(endpoint, level);
    return response.data;
};

export const updateLevel = async (id,level) => {
  const response = await apiAxios.put(`${endpoint}/${id}`, level);
  return response.data;
};

export const deleteLevel = async (id) => {
  const response = await apiAxios.delete(`${endpoint}/${id}`);
  return response.data;
};
