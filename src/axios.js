import axios from "axios";

const instance = axios.create({
  //loacl host
  baseURL:
    "https://tic-tac-toe-server-ho04s5bfo-amals-projects-f9d88d4e.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
