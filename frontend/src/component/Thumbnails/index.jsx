import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

// Skeleton Component for loading state
const ThumbnailSkeleton = () => (
  <div className="group animate-pulse">
    <div className="block bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden">
        <div className="w-full h-48 bg-gray-200 rounded-t-2xl"></div>
        <div className="absolute top-3 right-3">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="w-8 h-4 bg-gray-200 rounded"></div>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="w-20 h-4 bg-gray-200 rounded"></div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="w-16 h-8 bg-gray-200 rounded"></div>
          <div className="w-24 h-10 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
);

// Skeleton Grid for multiple loading items
const ThumbnailsSkeleton = ({ count = 8 }) => (
  <div className="w-full">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[...Array(count)].map((_, index) => (
        <ThumbnailSkeleton key={index} />
      ))}
    </div>
  </div>
);

function Thumbnails({ food, loading = false }) {
  // Show skeleton while loading
  if (loading) {
    return <ThumbnailsSkeleton count={8} />;
  }

  return (
    <div className="w-full">
      {!food || food.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No dishes found</h3>
          <p className="text-gray-600">Try adjusting your search or browse our categories</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {food.map((item) => (
            <div key={item._id} className="group">
              <Link
                to={`/food/${item._id}`}
                className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    {
                      item.favorite && (
                        <span className={`text-2xl ${item.favorite ? "text-red-500" : "text-gray-300"} hover:text-red-500 transition-colors duration-200`}>
                          ♥
                        </span>
                      )
                    }

                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {item.origins}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                      {item.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Rating
                      name="half-rating"
                      defaultValue={item.stars}
                      precision={0.5}
                      className="text-yellow-500"
                      readOnly
                      size="small"
                    />
                    <span className="text-sm text-gray-500">({item.stars})</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-gray-600 text-sm flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V128a8,8,0,0,1,8-8h32A8,8,0,0,1,168,128Z"></path>
                      </svg>
                      {item.cookTime} 
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-600">${item.price}</span>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200">
                      Order Now
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Thumbnails;