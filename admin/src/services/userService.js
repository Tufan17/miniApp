import apiAxios from "../utils/axiosInterceptors";
const endpoint = "/api/users";

export const getUsers = async () => {
    const response = await apiAxios.get(endpoint);
    return response.data;
}