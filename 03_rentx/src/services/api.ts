import axios from "axios";

export const api = axios.create({
  baseURL: 'http://192.168.2.169:3333',
});
