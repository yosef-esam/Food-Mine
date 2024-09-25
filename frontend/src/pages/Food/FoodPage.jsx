import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getById } from "../../services/foodServices";
import { Rating } from "@mui/material";
import { useCart } from "../../hooks/useCart";
import NotFound from "../../component/NotFound";

function FoodPage() {
  const [food, setFood] = useState({});
  const navigate = useNavigate();

  const { id } = useParams();
  const { AddItem } = useCart();
  const AddItemHandle = () => {
    AddItem(food);
    navigate(`/cart`);
  };
  useEffect(() => {
    getById(id).then((data) => {
      setFood(data);
    });
  }, [id]);

  return (
    <>
      {!food ? (
        <NotFound message={" The page you're looking for doesn't exist."} />
      ) : (
        <div className="flex flex-wrap items-center p-4  rounded-lg ">
          {/* Image Section */}
          <div className="w-full max-w-[600px] px-4 mr-8">
            <img
              className="w-full rounded-md"
              src={`/Food/${food.imageUrl}`}
              alt={food.name}
            />
          </div>

          {/* Details Section */}
          <div className="flex-1 px-4 space-y-3 relative">
            {/* Heart Icon */}
            <span
              className={`absolute top-2 right-2 text-3xl ${
                food.favorite ? "text-red-500" : "text-gray-300"
              }`}
            >
              ♥︎
            </span>

            {/* Food Name and Rating */}
            <div className="text-2xl font-semibold">{food.name}</div>
            <Rating
              name="half-rating"
              value={food.stars}
              precision={0.5}
              className="text-yellow-500"
            />

            {/* Origin Tags */}
            <div className="flex flex-wrap space-x-2">
              <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                {food.origin}
              </span>
            </div>

            {/* Cook Time */}
            <div className="text-gray-600">
              Time to cook about {food.cookTime}
            </div>

            {/* Price */}
            <div className="text-xl font-semibold text-green-500">
              Price: {food.price}$
            </div>

            {/* Add to Cart Button */}
            <button
              className="w-full max-w-[600px] px-4 py-2 text-white bg-red-600 rounded-full"
              onClick={AddItemHandle}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  ); // Display food data or a message
}

export default FoodPage;
