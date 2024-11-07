import axios from "axios";
axios.defaults.baseURL =
  process.env.NODE_ENV !== "production"
    ? "https://food-app-server-ff.vercel.app/"
    : "http://localhost:5000";
