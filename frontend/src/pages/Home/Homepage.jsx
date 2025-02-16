import React, { useEffect, useState } from "react";
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

function Homepage() {
  const { searchTerm, Tag } = useParams();
  const [food, setFood] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm) {
        const searchResults = await search(searchTerm);
        setFood(searchResults);
      } else if (Tag) {
        const tagResults = await getAllByTags(Tag);
        setFood(tagResults);
      } else {
        const allFood = await getAll();
        setFood(allFood);
      }

      const allTags = await getAllTags();
      setTags(allTags);
    };

    fetchData();
  }, [searchTerm, Tag]);

  return (
    <>
      <Search />
      <Tags tags={tags} />
      <Thumbnails food={food} />
    </>
  );
}

export default Homepage;
