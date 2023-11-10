import axios from "axios";

const instance = axios.create({
  //loacl host
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
