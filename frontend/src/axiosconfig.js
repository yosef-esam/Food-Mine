import axios from "axios";
axios.defaults.baseURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000"
    : "https://food-app-server-972aj060i-yosef-esams-projects.vercel.app/api/foods";
