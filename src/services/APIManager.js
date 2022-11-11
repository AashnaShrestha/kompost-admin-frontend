import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
console.log(axios.defaults.baseURL);

axios.defaults.timeout = 10000;

axios.interceptors.request.use(
  async (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = token;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.defaults.headers.post["Content-Type"] = "application/json";

export default {
  axios,
};