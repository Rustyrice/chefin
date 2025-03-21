import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BiSearchAlt, BiDish } from "react-icons/bi";
import { MdRestaurantMenu } from "react-icons/md";

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={sectionRef} className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center bg-white rounded-xl shadow-lg p-5"
          >
            <div className="bg-green-400 rounded-full p-5">
              <motion.div
                initial={{ scale: 0 }}
                animate={isVisible ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <BiSearchAlt className="text-5xl text-white" />
              </motion.div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium text-gray-800 ">Browse</h3>
              <p className="text-base text-gray-600 p-5">
                Discover authentic dishes crafted by skilled chefs in your area.
                Every chef undergoes thorough verification and adheres to
                the highest standards of safety and excellence.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center bg-white rounded-xl shadow-lg p-5"
          >
            <div className="bg-green-400 rounded-full p-5">
              <motion.div
                initial={{ scale: 0 }}
                animate={isVisible ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <MdRestaurantMenu className="text-5xl text-white" />
              </motion.div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium text-gray-800 ">Order</h3>
              <p className="text-base text-gray-600 p-5">
                Add dishes to your order and checkout in just a few steps.
                Full address is disclosed after the order is completed.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col items-center bg-white rounded-xl shadow-lg p-5"
          >
            <div className="bg-green-400 rounded-full p-5">
              <motion.div
                initial={{ scale: 0 }}
                animate={isVisible ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <BiDish className="text-5xl text-white" />
              </motion.div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-medium text-gray-800 ">Enjoy!</h3>
              <p className="text-base text-gray-600 p-5">
                Eat delicious homemade food made by certified chefs in your community!
              </p>
            </div>
          </motion.div>
        </div>
        <div className="flex justify-center mt-8">
            <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-4 md:mt-0 rounded-full px-6 py-2 md:px-8 md:py-3 text-sm md:text-base font-bold leading-relaxed text-black uppercase bg-green-400 duration-200
            transform hover:bg-green-500"
            >
            Search meals
            </motion.button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
