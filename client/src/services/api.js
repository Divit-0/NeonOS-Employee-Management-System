import axios from "axios";

const API = axios.create({

    baseURL:
        "https://neonos-employee-management-system.onrender.com/api",
});

export default API;