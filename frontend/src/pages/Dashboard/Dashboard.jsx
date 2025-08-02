import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { getAll } from "../../services/orderServices";
import { getAll as getAllUsers } from "../../services/userServices";
import { getAll as getAllFoods } from "../../services/foodServices";

function Dashboard() {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Timer effect - only runs once on mount
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Data fetching effect - only runs once on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all data in parallel for better performance
        const [ordersData, usersData, foodsData] = await Promise.all([
          getAll(),
          getAllUsers(),
          getAllFoods()
        ]);

        setOrders(ordersData);
        setUsers(usersData);
        setFoods(foodsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array - only runs once

  // Memoize cards to prevent unnecessary re-renders
  const cards = useMemo(() => [
    {
      label: "My Orders",
      link: "orders",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      bgColor: "bg-gradient-to-br from-orange-500 to-red-500",
      description: "View and track your orders",
      count: orders.length
    },
    {
      label: "Profile",
      link: "profile",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      bgColor: "bg-gradient-to-br from-blue-500 to-purple-500",
      description: "Manage your account settings",
      count: null
    },
    {
      label: "Users",
      link: "admin/users",
      forAdmin: true,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      bgColor: "bg-gradient-to-br from-teal-500 to-cyan-500",
      description: "Manage user accounts",
      count: users.length
    },
    {
      label: "Foods",
      link: "admin/foods",
      forAdmin: true,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      bgColor: "bg-gradient-to-br from-purple-500 to-pink-500",
      description: "Manage food menu items",
      count: foods.length
    },
  ], [orders.length, users.length, foods.length]);

  // Memoize filtered cards
  const filteredCards = useMemo(() => 
    cards.filter((item) => user.isAdmin || !item.forAdmin),
    [cards, user.isAdmin]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user.name || 'User'}! 👋
              </h1>
              <p className="text-gray-600">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} • {currentTime.toLocaleTimeString()}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Role</div>
              <div className="text-lg font-semibold text-gray-900">
                {user.isAdmin ? 'Administrator' : 'Customer'}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCards.map((card, index) => (
              <Link
                to={`/${card.link}`}
                key={index}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
              >
                <div className={`${card.bgColor} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    {card.icon}
                    <span className="text-2xl font-bold">
                      {card.count !== null ? card.count : '-'}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{card.label}</h3>
                  <p className="text-white/80 text-sm">{card.description}</p>
                </div>
                <div className="p-4 bg-gray-50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Click to access</span>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            FoodHub Dashboard • Last updated: {currentTime.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
