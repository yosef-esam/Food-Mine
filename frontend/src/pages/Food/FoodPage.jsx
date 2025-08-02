import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getById } from "../../services/foodServices";
import { Rating } from "@mui/material";
import { useCart } from "../../hooks/useCart";
import NotFound from "../../component/NotFound";

function FoodPage() {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams();
  const { AddItem } = useCart();
  
  const AddItemHandle = () => {
    AddItem(food);
    navigate(`/cart`);
  };
  
  useEffect(() => {
    setIsLoading(true);
    getById(id).then((data) => {
      setFood(data);
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading delicious food...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-8 px-4">
      {!food || !food._id ? (
        <NotFound message={"The page you're looking for doesn't exist."} />
      ) : (
        <div className="max-w-6xl mx-auto">
          {/* Background decoration */}
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-1/2 p-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    className="w-full h-80 lg:h-96 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                    src={food.imageUrl}
                    alt={food.name}
                  />
                  {/* Favorite Heart */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg ${
                      food.favorite ? "text-red-500" : "text-gray-400"
                    }`}>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                {/* Food Name */}
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
                  {food.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <Rating
                    name="half-rating"
                    value={food.stars}
                    precision={0.5}
                    className="text-yellow-500"
                    readOnly
                    size="large"
                  />
                  <span className="text-gray-600 font-medium">{food.stars} stars</span>
                </div>

                {/* Price */}
                <div className="text-3xl font-bold text-gray-800 mb-6">
                  <span className="text-orange-600">${food.price}</span>
                </div>

                {/* Cook Time */}
                <div className="flex items-center gap-2 mb-6 text-gray-600">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-medium">Cook Time: {food.cookTime}</span>
                </div>

                {/* Origin */}
                {food.origin && (
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="font-medium text-gray-600">Origin: {food.origin}</span>
                  </div>
                )}

                {/* Tags */}
                {food.tag && food.tag.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {food.tag.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium border border-orange-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add to Cart Button */}
                <button
                  className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-xl hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                  onClick={AddItemHandle}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                  Add to Cart
                </button>

                {/* Back Button */}
                <button
                  onClick={() => navigate(-1)}
                  className="mt-4 text-gray-600 hover:text-orange-600 font-medium flex items-center gap-2 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodPage;
