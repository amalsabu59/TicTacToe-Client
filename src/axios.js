import axios from "axios";

const instance = axios.create({
  //loacl host
  baseURL: "https://tictactoe-jt2p.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
