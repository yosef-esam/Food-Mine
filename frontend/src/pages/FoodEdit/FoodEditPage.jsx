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
  const [isUploading, setIsUploading] = useState(false);
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
      const newFood = await addFood(updatedFood);
      console.log(newFood);
      toast.success(`Food ${newFood.name} added successfully`);
      navigate(`/admin/editfood/${newFood._id}`, { replace: true });
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadedImageUrl = await uploadImage(event);
      setImageUrl(uploadedImageUrl);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isEditMode ? "Edit Food Item" : "Add New Food Item"}
            </h1>
            <p className="text-gray-600">
              {isEditMode ? "Update the food item details" : "Create a new food item for your menu"}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
              <h2 className="text-xl font-semibold">
                {isEditMode ? "Edit Food Details" : "Add Food Details"}
              </h2>
              <p className="text-white/80 text-sm mt-1">
                Fill in the information below to {isEditMode ? "update" : "create"} your food item
              </p>
            </div>

            {/* Form Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Food Image
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                        />
                      </label>
                    </div>
                    
                    {isUploading && (
                      <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-blue-600">Uploading image...</span>
                      </div>
                    )}

                    {imageUrl && (
                      <div className="relative">
                        <img
                          src={imageUrl}
                          alt="Food preview"
                          className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                        />
                        <div className="absolute top-2 right-2">
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            Uploaded ✓
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Food Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter food name"
                      onChange={(e) => setName(e.target.value)}
                      value={name || ""}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      onChange={(e) => setPrice(e.target.value)}
                      value={price || ""}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Origins
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Italian, Mexican"
                      onChange={(e) => setOrigins(e.target.value)}
                      value={origins || ""}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., spicy, vegetarian"
                      onChange={(e) => setTag(e.target.value)}
                      value={tag || ""}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cook Time (minutes)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 15-20"
                      onChange={(e) => setCookTime(e.target.value)}
                      value={cookTime || ""}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Favorite
                    </label>
                    <input
                      type="text"
                      placeholder="true/false"
                      onChange={(e) => setFavorite(e.target.value)}
                      value={favorite || ""}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl font-semibold text-base shadow-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        {isEditMode ? "Update Food Item" : "Add Food Item"}
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodEditPage;
