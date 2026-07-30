import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import Thumbnails from "../../component/Thumbnails";
import Search from "../../component/Search";
import {
  search,
  getAll,
  getAllTags,
  getAllByTags,
} from "../../services/foodServices";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const CATEGORY_ICONS = [
  "/Food/pizza.png",
  "/Food/burger.png",
  "/Food/tacos.png",
  "/Food/pasta.png",
  "/Food/salad.png",
  "/Food/fries.png",
];

const CATEGORY_BG = [
  "bg-orange-50",
  "bg-amber-50",
  "bg-rose-50",
  "bg-yellow-50",
  "bg-lime-50",
  "bg-orange-50",
];

const FEATURES = [
  {
    title: "Fast Delivery",
    text: "Get your food in 25-30 minutes",
    bg: "bg-orange-500",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Fresh Ingredients",
    text: "We use only fresh & quality ingredients",
    bg: "bg-green-500",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3c-4 3-7 6-7 10a7 7 0 0014 0c0-4-3-7-7-10z" />
      </svg>
    ),
  },
  {
    title: "Secure Payment",
    text: "100% secure payment methods",
    bg: "bg-blue-500",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: "Live Tracking",
    text: "Track your order in real-time",
    bg: "bg-purple-500",
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const HOW_IT_WORKS = [
  { title: "Search", text: "Find your favorite dish", icon: "🔍" },
  { title: "Order", text: "Add to cart & checkout", icon: "🛍️" },
  { title: "Prepare", text: "Chefs prepare it fresh", icon: "👨‍🍳" },
  { title: "Deliver", text: "Rider brings it to you", icon: "🛵" },
  { title: "Enjoy", text: "Sit back and enjoy!", icon: "👍" },
];

function useCountdown(initialSeconds) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : initialSeconds));
    }, 1000);
    return () => clearInterval(id);
  }, [initialSeconds]);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;
  const pad = (n) => String(n).padStart(2, "0");

  return { hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) };
}

function CountdownBox({ value, label }) {
  return (
    <div className="bg-white rounded-lg px-3 py-2 text-center shadow-md min-w-[56px]">
      <motion.div
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="text-lg font-extrabold text-gray-900"
      >
        {value}
      </motion.div>
      <div className="text-[10px] text-gray-500 font-medium">{label}</div>
    </div>
  );
}

function Homepage() {
  const { searchTerm, Tag } = useParams();
  const [food, setFood] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tagsLoading, setTagsLoading] = useState(true);
  const countdown = useCountdown(2 * 3600 + 45 * 60 + 30);

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

  const featuredFood = useMemo(() => (food || []).slice(0, 8), [food]);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-orange-50/60 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <motion.div initial="hidden" animate="show" variants={staggerContainer} className="space-y-6">

              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.05]">
                Delicious Food
                <br />
                <span className="text-orange-500 relative inline-block">
                  Delivered
                  <motion.svg
                    className="absolute left-0 -bottom-2 w-full"
                    height="10"
                    viewBox="0 0 200 10"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
                  >
                    <motion.path
                      d="M2 8 Q 100 -2 198 8"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </span>
                <br />
                In Minutes
              </motion.h1>

              <motion.p variants={fadeUp} className="text-gray-600 text-lg max-w-md">
                Discover the best dishes from top restaurants and get them delivered fast to your doorstep.
              </motion.p>

              <motion.div variants={fadeUp} className="max-w-lg">
                <Search placeholder="Search dishes or restaurants..." />
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
                <motion.a
                  href="#featured"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  🛍️ Order Now
                </motion.a>
                <motion.a
                  href="#categories"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-800 font-bold rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  📖 Explore Menu
                </motion.a>
              </motion.div>


            </motion.div>

            {/* Right: floating collage */}
            <div className="relative h-[420px] hidden lg:block rounded-3xl overflow-hidden">
              {/* Background image */}
              <img
                src="/background.png"
                alt="Food background"
                className="absolute inset-0 w-full h-full object-cover object-center z-0"
              />
              {/* Floating info badges */}
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg px-4 py-2 flex items-center gap-2 z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                transition={{ opacity: { delay: 0.9 }, scale: { delay: 0.9 }, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" } }}
              >
                <span className="text-lg">🚴</span>
                <div className="text-xs">
                  <div className="font-bold text-gray-900">25 min</div>
                  <div className="text-gray-500">Delivery</div>
                </div>
              </motion.div>

              <motion.div
                className="absolute right-4 top-2 bg-white rounded-xl shadow-lg px-4 py-2 flex items-center gap-2 z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                transition={{ opacity: { delay: 1 }, scale: { delay: 1 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
              >
                <span className="text-yellow-400 text-lg">★</span>
                <div className="text-xs">
                  <div className="font-bold text-gray-900">4.9 Rating</div>
                </div>
              </motion.div>

              <motion.div
                className="absolute right-0 bottom-8 bg-white rounded-xl shadow-lg px-4 py-2 flex items-center gap-2 z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                transition={{ opacity: { delay: 1.1 }, scale: { delay: 1.1 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 } }}
              >
                <span className="text-lg">🍔</span>
                <div className="text-xs">
                  <div className="font-bold text-gray-900">1200+</div>
                  <div className="text-gray-500">Restaurants</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============ CATEGORIES ============ */}
        <motion.section
          id="categories"
          className="py-14 scroll-mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Popular <span className="text-orange-500">Categories</span>
            </h2>
            <a href="#featured" className="text-orange-500 font-semibold text-sm hover:underline flex items-center gap-1">
              View all →
            </a>
          </div>

          {tagsLoading ? (
            <div className="flex gap-3 flex-wrap">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-100 rounded-2xl w-40 h-16" />
              ))}
            </div>
          ) : !tags || tags.length === 0 ? (
            <p className="text-gray-500">No categories available yet.</p>
          ) : (
            <motion.div
              className="flex gap-4 flex-wrap"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              {tags.map((tag, i) => (
                <motion.div key={tag.tag} variants={fadeUp} whileHover={{ y: -4, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to={`/tags/${tag.tag}`}
                    className={`flex items-center gap-3 ${CATEGORY_BG[i % CATEGORY_BG.length]} rounded-2xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-inner">
                      <img
                        src={CATEGORY_ICONS[i % CATEGORY_ICONS.length]}
                        alt=""
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 capitalize text-sm">{tag.tag}</div>
                      <div className="text-xs text-gray-500">{tag.count} Items</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.section>

        {/* ============ FEATURED DISHES ============ */}
        <motion.section
          id="featured"
          className="py-8 scroll-mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {searchTerm ? `Search Results for "${searchTerm}"` : Tag ? <span className="capitalize">{Tag} Dishes</span> : (
                <>Featured <span className="text-orange-500">Dishes</span></>
              )}
            </h2>
            <a href="#featured" className="text-orange-500 font-semibold text-sm hover:underline flex items-center gap-1">
              View all →
            </a>
          </div>

          <Thumbnails food={searchTerm || Tag ? food : featuredFood} loading={loading} />
        </motion.section>

        {/* ============ FEATURES BAR ============ */}
        <motion.section
          className="py-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 lg:divide-x divide-gray-100"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {FEATURES.map((f) => (
              <motion.div key={f.title} variants={fadeUp} className="flex items-center gap-4 pt-6 sm:pt-0 lg:pl-6 lg:first:pl-0 first:pt-0">
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 8 }}
                  className={`w-12 h-12 shrink-0 rounded-full ${f.bg} flex items-center justify-center shadow-md`}
                >
                  {f.icon}
                </motion.div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{f.title}</div>
                  <div className="text-xs text-gray-500">{f.text}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ============ SPECIAL OFFER ============ */}
        <motion.section
          id="offer"
          className="py-6 scroll-mt-24"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 sm:p-8">
            <motion.div
              className="absolute -left-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <span className="inline-flex items-center gap-1 bg-white/20 text-xs font-bold px-3 py-1 rounded-full mb-3">
                  🎁 Special Offer
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold mb-1">50% OFF Your First Order</h3>
                <p className="text-white/85 text-sm">Use code <span className="font-bold">FOODHUB50</span> and get 50% off up to $20 on your first order</p>
              </div>

              <div className="flex items-center gap-3">
                <CountdownBox value={countdown.hours} label="Hours" />
                <span className="font-bold text-xl">:</span>
                <CountdownBox value={countdown.minutes} label="Minutes" />
                <span className="font-bold text-xl">:</span>
                <CountdownBox value={countdown.seconds} label="Seconds" />
              </div>

              <motion.img
                src="/Food/pizza.png"
                alt=""
                className="w-24 h-24 object-contain drop-shadow-xl hidden sm:block"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              />

              <motion.a
                href="#featured"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow whitespace-nowrap"
              >
                Order Now →
              </motion.a>
            </div>
          </div>
        </motion.section>

        {/* ============ HOW IT WORKS ============ */}
        <motion.section
          id="how-it-works"
          className="py-16 scroll-mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-2">
            How It <span className="text-orange-500">Works</span>
          </h2>
          <p className="text-gray-600 text-center mb-10">Getting your favorite food delivered has never been easier</p>

          <motion.div
            className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] border-t-2 border-dashed border-orange-200 -z-0" />
            {HOW_IT_WORKS.map((step) => (
              <motion.div key={step.title} variants={fadeUp} className="relative z-10 flex flex-col items-center text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  className="w-16 h-16 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center text-2xl mb-3 shadow-sm"
                >
                  {step.icon}
                </motion.div>
                <div className="font-bold text-gray-900 text-sm">{step.title}</div>
                <div className="text-xs text-gray-500 max-w-[9rem]">{step.text}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}

export default Homepage;
