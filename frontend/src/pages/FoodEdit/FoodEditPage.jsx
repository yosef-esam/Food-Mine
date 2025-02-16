import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addFood, getById, updateFood } from "../../services/foodServices";
import { uploadImage } from "../../services/uploadServices";
import { toast } from "react-toastify";

function FoodEditPage() {
  const { foodId } = useParams();
  const isEditMode = !!foodId;
  const [Food, setFood] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [tag, setTag] = useState();
  const [origins, setOrigins] = useState();
  const [cookTime, setCookTime] = useState();
  const [favorite, setFavorite] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEditMode) return;

    getById(foodId).then((food) => {
      setImageUrl(food.imageUrl);
      setName(food.name);
      setOrigins(food.origins);
      setPrice(food.price);
      setCookTime(food.cookTime);
      setTag(food.tag);
      setFavorite(food.favorite);
      setFood(food);
    });
  }, [foodId, isEditMode]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFood = {
      ...Food,
      imageUrl,
      name,
      price,
      origins,
      cookTime,
      favorite,
      tag,
    };

    if (isEditMode) {
      await updateFood(updatedFood);
      toast.success(`food ${updatedFood.name} updated successfully`);
    } else {
      const newFood = await addFood(updatedFood); // Corrected function call here
      console.log(newFood);
      toast.success(`Food ${newFood.name} added successfully`);
      navigate(`/admin/editfood/${newFood._id}`, { replace: true }); // Corrected typo
    }
  };
  const upload = async (event) => {
    setImageUrl(null);
    const imageUrl = await uploadImage(event);
    setImageUrl(imageUrl);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isEditMode ? "Edit Food" : "Add Food"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className=" text-gray-700">Select Image:</label>
          <input
            onChange={imageUrl}
            className="block w-full text-sm text-gray-500 border border-gray-300 rounded p-2"
          />
          {imageUrl && (
            <a href={imageUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={imageUrl}
                alt="Preview"
                className="my-4 w-full h-48 object-cover rounded"
              />
            </a>
          )}
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="block w-full border border-gray-300 rounded p-2"
          />
          <input
            type="number"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="block w-full border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            placeholder="Origins"
            onChange={(e) => setOrigins(e.target.value)}
            value={origins}
            className="block w-full border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            placeholder="Tags"
            onChange={(e) => setTag(e.target.value)}
            value={tag}
            className="block w-full border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            placeholder="Cook Time"
            onChange={(e) => setCookTime(e.target.value)}
            value={cookTime}
            className="block w-full border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            placeholder="Favorite"
            onChange={(e) => setFavorite(e.target.value)}
            value={favorite}
            className="block w-full border border-gray-300 rounded p-2"
          />
          <button
            type="submit"
            className="block w-full bg-blue-500 text-white rounded p-2 mt-4"
          >
            {isEditMode ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FoodEditPage;
