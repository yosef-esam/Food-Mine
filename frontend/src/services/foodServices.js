import { sample_food, sample_tags } from "../Data";

export const getAll = async () => sample_food;

export const search = async (searchTerm) =>
  sample_food.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
export const getAllTags = async () => sample_tags;
export const getAllByTags = async (tag) => {
  if (tag == "All") return getAll();
  return sample_food.filter((item) => item.tag.includes(tag));
};

export const getById = async (foodid) => {
  return sample_food.find((item) => item.id === parseInt(foodid)); // because id is a number
};
