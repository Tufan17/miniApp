import apiAxios from "../utils/axiosInterceptors";
const endpoint = "/api/roles";

export const getRoles = async () => {
    const response = await apiAxios.get(endpoint);
    return response.data;
}