import axios from "axios";
axios.defaults.baseURL =
  process.env.NODE_ENV !== "production"
    ? "https://food-app-rust-alpha.vercel.app"
    : "/";
