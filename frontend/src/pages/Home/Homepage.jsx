import React, { useEffect, useReducer } from "react";
import Thumbnails from "../../component/Thumbnails";
import { useParams } from "react-router-dom";
import {
  search,
  getAll,
  getAllTags,
  getAllByTags,
} from "../../services/foodServices";
import Search from "../../component/Search";
import Tags from "../../component/Tags";
import NotFound from "../../component/NotFound";

const initialState = { food: [], tags: [] };
const reducer = (state, action) => {
  switch (action.type) {
    case "FOODS_LOADED":
      return { ...state, food: action.payload };
    case "TAGS_LOADED":
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};
function Homepage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { food, tags } = state;
  const { searchTerm, Tag } = useParams();

  const loadFood = Tag
    ? getAllByTags(Tag)
    : searchTerm
    ? search(searchTerm)
    : getAll();
  useEffect(() => {
    getAllTags().then((tags) =>
      dispatch({ type: "TAGS_LOADED", payload: tags })
    );
    loadFood.then((food) => dispatch({ type: "FOODS_LOADED", payload: food }));
  }, [searchTerm, Tag]);

  return (
    <>
      <Search />
      <Tags tags={tags} />
      {food.length === 0 && (
        <NotFound message={"  The page you're looking for doesn't exist."} />
      )}
      <Thumbnails food={food} />;
    </>
  );
}

export default Homepage;
