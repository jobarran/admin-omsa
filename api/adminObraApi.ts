import axios from "axios";

const adminObraApi = axios.create({
    baseURL: '/api'
});

export default adminObraApi