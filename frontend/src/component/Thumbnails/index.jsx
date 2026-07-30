import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Skeleton Component for loading state
const ThumbnailSkeleton = () => (
  <div className="group animate-pulse">
    <div className="block bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden">
        <div className="w-full h-44 bg-gray-200"></div>
      </div>
      <div className="p-4">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="flex items-center justify-between">
          <div className="w-14 h-6 bg-gray-200 rounded"></div>
          <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
);

// Skeleton Grid for multiple loading items
const ThumbnailsSkeleton = ({ count = 8 }) => (
  <div className="w-full">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, index) => (
        <ThumbnailSkeleton key={index} />
      ))}
    </div>
  </div>
);

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function Thumbnails({ food, loading = false }) {
  // Show skeleton while loading
  if (loading) {
    return <ThumbnailsSkeleton count={8} />;
  }

  return (
    <div className="w-full">
      {!food || food.length === 0 ? (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            🍽️
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No dishes found</h3>
          <p className="text-gray-600">Try adjusting your search or browse our categories</p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={gridVariants}
          initial="hidden"
          animate="show"
        >
          {food.map((item) => (
            <motion.div
              key={item._id}
              className="group"
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Link
                to={`/food/${item._id}`}
                className="block bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-44 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />

                  {/* Rating pill overlay */}
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                    <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.447a1 1 0 00-.363 1.118l1.287 3.957c.3.922-.755 1.688-1.538 1.118l-3.367-2.447a1 1 0 00-1.176 0l-3.367 2.447c-.783.57-1.838-.196-1.538-1.118l1.287-3.957a1 1 0 00-.363-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                    </svg>
                    <span className="text-xs font-bold text-gray-800">{item.stars}</span>
                  </div>

                  {/* Favorite heart */}
                  <div className="absolute top-3 right-3">
                    <motion.span
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-7 h-7 flex items-center justify-center rounded-full bg-white/95 backdrop-blur-sm shadow-sm text-sm ${
                        item.favorite ? "text-red-500" : "text-gray-300"
                      }`}
                    >
                      ♥
                    </motion.span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-200 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{item.origins}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-orange-600">${item.price}</span>
                    <motion.span
                      whileHover={{ scale: 1.15, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 flex items-center justify-center bg-orange-500 text-white rounded-full font-bold text-lg shadow-md hover:bg-orange-600 transition-colors duration-200"
                    >
                      +
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default Thumbnails;
