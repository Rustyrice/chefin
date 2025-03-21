import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { motion } from 'framer-motion'

const CTASearchSection = () => {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    })

    observer.observe(sectionRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      className="bg-gradient-to-r from-blue-500 to-green-400 py-12"
    >
      <div className="container mx-auto px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white text-4xl font-bold text-center mb-2"
        >
          Discover Local Home Restaurants
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white text-lg text-center mb-8"
        >
          Find unique dining experiences near you
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center"
        >
          <div className="bg-white md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-xl flex items-center">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by location or cuisine"
                className="w-full px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <Link to="/home">
              <button className="bg-green-400 duration-200 transform hover:bg-green-500 text-white rounded-r-lg px-6 py-3 flex items-center justify-center">
                <FaSearch className="mr-2" />
                Search
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CTASearchSection
