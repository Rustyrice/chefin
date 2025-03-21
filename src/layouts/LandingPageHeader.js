import React from 'react'
import { Link } from 'react-router-dom'
import LocationOnIcon from '@mui/icons-material/LocationOn'

const LandingPageHeader = () => {
  return (
    <div className="flex flex-col items-center justify-end min-h-screen bg-[url('/public/cabbage-phuc-long-unsplash.jpg')] bg-cover px-6 md:px-20 lg:px-24 xl:px-32 pb-16">
      <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white pt-20 md:pt-40 lg:pt-60">
        Eat locally, help the community
      </h1>
      <div className="mt-9 w-full p-6 bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl">
        <h2 className="text-sm md:text-xl font-bold text-gray-600 text-center mb-4">
          Find a home restaurant near you
        </h2>
        <div className="mx-auto flex flex-col md:flex-row items-center">
          <div className="relative flex-1 mb-4 md:mb-0 md:mr-2 w-full">
            <input
              type="text"
              placeholder="Search by location or cuisine"
              className="bg-white p-6 shadow-2xl px-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <Link to="/home">
            <button className="shadow-2xl bg-green-400 duration-200 transform hover:bg-green-500 text-white rounded-lg px-6 py-3 md:ml-0 md:mr-2 w-auto">
              Search
            </button>
          </Link>
          <button className="hidden md:flex">
            <LocationOnIcon className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPageHeader
