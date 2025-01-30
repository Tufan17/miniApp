import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const apiAxios = axios.create({
    baseURL: API_URL,
});

apiAxios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        console.log(error.response.data);

        if(error.response.data.error === "Invalid token"){
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        
        let unauthorized = error.response && error.response.status && (error.response.status == 401 || error.response.status == 403);
        if (unauthorized) {
            setTimeout(() => {
                window.location.href = "/login";
            }, 1000);
        }
    return;
    }
);

apiAxios.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export default apiAxios;