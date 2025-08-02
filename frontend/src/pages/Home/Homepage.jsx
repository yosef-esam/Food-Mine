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
  const [loading, setLoading] = useState(true);
  const [tagsLoading, setTagsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTagsLoading(true);
      try {
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
      } catch (error) {
        console.error("Error fetching data:", error);
        setFood([]);
      } finally {
        setLoading(false);
        setTagsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, Tag]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <span className="text-orange-200 font-semibold">Welcome to FoodHub</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Delicious Food
                  <span className="block text-orange-200">Delivered Fast</span>
                </h1>
                <p className="text-xl text-orange-100 max-w-lg">
                  Discover amazing dishes from around the world. Fresh ingredients, 
                  authentic flavors, delivered right to your doorstep with FoodHub.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Search placeholder="Search for your favorite dishes..." />
                </div>
                <button className="px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-colors duration-200 shadow-lg">
                  Explore Menu
                </button>
              </div>
              
              <div className="flex items-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span>Fresh Ingredients</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="/Food/pizza.png" 
                  alt="Delicious Pizza" 
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-orange-300 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-red-300 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tags Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our diverse menu with categories that suit your taste and preferences
            </p>
          </div>
          <div className="flex justify-center">
            <div className="flex gap-3 p-3 flex-wrap justify-center max-w-4xl">
              <Tags tags={tags} loading={tagsLoading} />
            </div>
          </div>
        </div>

        {/* Food Grid Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {searchTerm ? `Search Results for "${searchTerm}"` : 
               Tag ? `${Tag} Dishes` : 
               "Featured Dishes"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {searchTerm ? "Find exactly what you're looking for" :
               Tag ? `Discover amazing ${Tag.toLowerCase()} dishes` :
               "Handpicked dishes from our best chefs"}
            </p>
          </div>
          
          <div className="px-4 py-6">
            <Thumbnails food={food} loading={loading} />
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Why Choose FoodHub?</h3>
            <p className="text-gray-600">Trusted by thousands of customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-orange-600">500+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-orange-600">50+</div>
              <div className="text-gray-600">Delicious Dishes</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-orange-600">30min</div>
              <div className="text-gray-600">Average Delivery</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
