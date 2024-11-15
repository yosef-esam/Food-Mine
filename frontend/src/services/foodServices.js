import axios from "axios";
export const getAll = async () => {
  const { data } = await axios.get("/api/foods");

  return data;
};

export const search = async (searchTerm) => {
  const { data } = await axios.get(`/api/foods/search/` + searchTerm);
  return data;
};
export const getAllTags = async () => {
  const { data } = await axios.get("/api/foods/tags");
  return data;
};
export const getAllByTags = async (tag) => {
  if (tag == "All") return getAll();
  const { data } = await axios.get(`/api/foods/tags/` + tag);
  return data;
};

export const getById = async (foodid) => {
  const { data } = await axios.get("/api/foods/" + foodid);
  return data;
};

export const DeleteFoodId = async (foodid) => {
  const { data } = await axios.delete("/api/foods/" + foodid);
  return data;
};

export const updateFood = async (food) => {
  const { data } = await axios.put("/api/foods/", food);
  return data;
};
