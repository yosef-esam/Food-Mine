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
    <div className="flex justify-center items-center min-h-[60vh] bg-[#f7f7f7] py-8 px-2">
      {!food || !food._id ? (
        <NotFound message={" The page you're looking for doesn't exist."} />
      ) : (
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg border border-[#f4f0f0] p-6 w-full max-w-4xl gap-8">
          {/* Image Section */}
          <div className="w-full md:w-[340px] flex-shrink-0 flex justify-center items-center">
            <img
              className="w-full h-64 object-cover rounded-xl border border-[#f4f0f0]"
              src={food.imageUrl}
              alt={food.name}
            />
          </div>

          {/* Details Section */}
          <div className="flex-1 flex flex-col gap-4 relative">
            {/* Heart Icon */}
            <span
              className={`absolute top-2 right-2 text-3xl ${
                food.favorite ? "text-red-500" : "text-gray-300"
              }`}
            >
              ♥︎
            </span>

            {/* Food Name and Rating */}
            <div className="text-2xl font-bold text-[#181111]">{food.name}</div>
            <Rating
              name="half-rating"
              value={food.stars}
              precision={0.5}
              className="text-yellow-500"
              readOnly
            />

            {/* Origin Tags */}
            <div className="flex flex-wrap gap-2">
              {food.origin && (
                <span className="bg-[#f4f0f0] text-[#181111] text-xs font-medium rounded-lg px-3 py-1">
                  {food.origin}
                </span>
              )}
            </div>

            {/* Cook Time */}
            <div className="text-[#886364] text-sm flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V128a8,8,0,0,1,8-8h32A8,8,0,0,1,168,128Z"></path></svg>
              {food.cookTime}
            </div>

            {/* Price */}
            <div className="text-xl font-bold text-[#181111]">{food.price}$</div>

            {/* Add to Cart Button */}
            <button
              className="w-full md:w-auto px-8 py-3 text-white bg-[#181111] rounded-lg font-bold text-base shadow hover:bg-[#2d2323] transition-colors mt-2"
              onClick={AddItemHandle}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodPage;
