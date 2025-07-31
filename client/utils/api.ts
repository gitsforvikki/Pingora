import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_EXPRESS_SERVER}/api`,
});

export default api;
