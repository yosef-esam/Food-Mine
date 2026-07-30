import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Skeleton component for tags loading
const TagsSkeleton = () => (
  <div className="flex gap-3 flex-wrap justify-center">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="animate-pulse bg-gray-200 rounded-full px-6 py-3 w-24 h-12"
      ></div>
    ))}
  </div>
);

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const tagVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

function Tags({ tags, forFoodPage, loading = false }) {
  // Show skeleton while loading
  if (loading) {
    return <TagsSkeleton />;
  }

  return (
    <motion.div
      className="flex gap-3 flex-wrap justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {!tags || tags.length === 0 ? (
        <div className="text-center py-8">
          <span className="text-gray-500">No categories available.</span>
        </div>
      ) : (
        tags.map((tag) => (
          <motion.div key={tag.tag} variants={tagVariants} whileHover={{ scale: 1.08, y: -3 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={`/tags/${tag.tag}`}
              className="group flex items-center justify-center gap-x-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 text-sm font-semibold leading-normal hover:from-orange-600 hover:to-red-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <span className="capitalize">{tag.tag}</span>
              {!forFoodPage && (
                <span className="bg-white text-orange-600 rounded-full px-2 py-1 text-xs font-bold">
                  {tag.count}
                </span>
              )}
            </Link>
          </motion.div>
        ))
      )}
    </motion.div>
  );
}

export default Tags;
