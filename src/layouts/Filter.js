import React, { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import supabase from '../client/client.js'

const Filter = ({ onFilterSelect }) => {
  const [cuisines, setCuisines] = useState([])
  const [selectedCuisine, setSelectedCuisine] = useState(null)

  useEffect(() => {
    const fetchCuisines = async () => {
      const { data, error } = await supabase
        .from('dish_listings')
        .select('cuisine')

      if (error) {
        console.error('Error fetching cuisines:', error)
        return
      }

      // Extract unique cuisines
      const uniqueCuisines = [...new Set(data.map((meal) => meal.cuisine))]
      setCuisines(uniqueCuisines)
    }

    fetchCuisines()
  }, [])

  const scrollContainer = (direction) => {
    const container = document.getElementById('filter-carousel')
    const scrollAmount = direction === 'left' ? -200 : 200
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm relative w-full overflow-hidden">
      <div className="flex items-center justify-between mb-1 relative">
        <button
          onClick={() => scrollContainer('left')}
          className="flex items-center justify-center p-2 absolute left-0 z-10 bg-white"
        >
          <FaChevronLeft />
        </button>

        <div
          id="filter-carousel"
          className="flex overflow-x-auto scrollbar-hide space-x-2 px-12 w-full"
        >
          <button
            className={`flex-shrink-0 px-6 py-2 text-center rounded-full ${
              selectedCuisine === null
                ? 'bg-green-400 text-white'
                : 'bg-gray-100 text-black'
            }`}
            style={{ minWidth: '120px' }} // Ensures all buttons have the same width
            onClick={() => {
              setSelectedCuisine(null)
              onFilterSelect(null)
            }}
          >
            All
          </button>

          {cuisines.map((cuisine, index) => (
            <button
              key={index}
              className={`flex-shrink-0 px-6 py-2 text-center rounded-full ${
                selectedCuisine === cuisine
                  ? 'bg-green-400 text-white'
                  : 'bg-gray-100 text-black'
              }`}
              style={{ minWidth: '120px' }} // Ensures all buttons are the same width
              onClick={() => {
                setSelectedCuisine(cuisine)
                onFilterSelect(cuisine)
              }}
            >
              {cuisine}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollContainer('right')}
          className="flex items-center justify-center p-2 absolute right-0 z-10 bg-white"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  )
}

export default Filter
