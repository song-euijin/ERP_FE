import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://192.168.0.42:8080",
});

const customAxios37 = axios.create({
  baseURL: "http://192.168.0.37:2000",
});

export default customAxios37;
