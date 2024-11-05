import axios from "axios";
axios.defaults.baseURL =
  process.env.NODE_ENV !== "production"
    ? "https://food-app-ivory-ten.vercel.app"
    : "/";
