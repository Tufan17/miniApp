import axios from 'axios';


export const loginApi = (email, password) => {
   return axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password,rememberMe:true });
}
