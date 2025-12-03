import axios from "axios";

// Set base URL to deployed backend
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export default axios;
