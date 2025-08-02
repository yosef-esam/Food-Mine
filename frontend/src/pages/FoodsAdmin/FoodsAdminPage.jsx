import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DeleteFoodId, getAll, search } from "../../services/foodServices";
import Search from "../../component/Search";
import { toast } from "react-toastify";

function FoodsAdminPage() {
  const [foods, setFoods] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { searchTerm } = useParams();

  useEffect(() => {
    LoadFoods();
  }, [searchTerm]);

  const LoadFoods = async () => {
    try {
      setIsLoading(true);
      const foods = searchTerm ? await search(searchTerm) : await getAll();
      setFoods(foods);
    } catch (error) {
      console.error("Error loading foods:", error);
      toast.error("Failed to load foods");
    } finally {
      setIsLoading(false);
    }
  };

  const DeleteFood = async (food) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${food.name}"?`);
    if (!confirmed) return;
    
    try {
      await DeleteFoodId(food._id);
      toast.success(`"${food.name}" has been deleted`);
      setFoods(foods.filter((f) => f._id !== food._id));
    } catch (error) {
      console.error("Error deleting food:", error);
      toast.error("Failed to delete food");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading foods...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Foods</h1>
          <p className="text-gray-600">Add, edit, and manage your food menu items</p>
        </div>

        {/* Search and Add Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <Search SearchRoute={"/admin/foods/"} defaultRoute={"/admin/foods"} />
            </div>
            <Link
              to="/admin/addfood"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Food
            </Link>
          </div>
        </div>

        {/* Foods List */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 text-white">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4">
                <h3 className="font-semibold">Food Item</h3>
              </div>
              <div className="col-span-2 text-center">
                <h3 className="font-semibold">Price</h3>
              </div>
              <div className="col-span-2 text-center">
                <h3 className="font-semibold">Category</h3>
              </div>
              <div className="col-span-2 text-center">
                <h3 className="font-semibold">Status</h3>
              </div>
              <div className="col-span-2 text-center">
                <h3 className="font-semibold">Actions</h3>
              </div>
            </div>
          </div>

          {/* Foods Items */}
          <div className="divide-y divide-gray-100">
            {foods && foods.length > 0 ? (
              foods.map((food) => (
                <div
                  key={food._id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Food Info */}
                    <div className="col-span-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={food.imageUrl}
                          alt={food.name}
                          className="w-12 h-12 rounded-xl object-cover border-2 border-gray-200"
                        />
                        <div>
                          <Link
                            to={`/food/${food._id}`}
                            className="text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors"
                          >
                            {food.name}
                          </Link>
                          <p className="text-sm text-gray-500">{food.origins}</p>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center">
                      <span className="text-lg font-bold text-green-600">
                        ${food.price}
                      </span>
                    </div>

                    {/* Category */}
                    <div className="col-span-2 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {food.tag || 'General'}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="col-span-2 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        food.favorite 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {food.favorite ? 'Featured' : 'Regular'}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Link
                          to={`/admin/editfood/${food._id}`}
                          className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </Link>
                        <button
                          onClick={() => DeleteFood(food)}
                          className="inline-flex items-center px-3 py-1 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No foods found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm ? `No foods match "${searchTerm}"` : "Get started by adding your first food item"}
                </p>
                {!searchTerm && (
                  <Link
                    to="/admin/addfood"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Your First Food
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Summary Footer */}
        {foods && foods.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold">{foods.length}</span> food items
              </div>
              <div className="text-sm text-gray-600">
                Total value: <span className="font-semibold text-green-600">
                  ${foods.reduce((sum, food) => sum + food.price, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodsAdminPage;
