import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "../../hooks/useLoading";

function Loading() {
  const { isLoading } = useLoading();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed w-full h-full z-50 top-0 left-0 flex items-center justify-center"
          style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif', background: "rgba(255,255,255,0.9)", backdropFilter: "blur(2px)" }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center border-b border-solid border-b-[#f4f0f0] bg-white px-10 py-8 rounded-2xl shadow-xl"
          >
            <div className="relative w-16 h-16 mb-4">
              <motion.span
                className="absolute inset-0 rounded-full border-4 border-orange-100"
              />
              <motion.span
                className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              />
              <motion.img
                src="/Food/Loading.svg"
                alt=""
                className="absolute inset-0 m-auto w-8 h-8"
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <motion.span
              className="text-[#181111] text-lg font-bold leading-tight tracking-[-0.015em]"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              Loading...
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Loading;
