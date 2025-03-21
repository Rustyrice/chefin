import React, { useEffect, useState } from 'react'
import supabase from '../client/client.js'
import { Link } from 'react-router-dom'
import Filter from './Filter'

const Cards = () => {
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [selectedCuisine, setSelectedCuisine] = useState(null)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data: meals, error: mealsError } = await supabase
          .from('dish_listings')
          .select('*, cuisine, hosts (id, is_verified)')

        if (mealsError) throw mealsError

        // fetch all reviews
        const { data: reviews, error: reviewsError } = await supabase
          .from('reviews')
          .select('dish_id, rating')

        if (reviewsError) throw reviewsError

        // compute average rating & review count for each meal
        const mealRatings = meals.map((meal) => {
          const mealReviews = reviews.filter(
            (review) => review.dish_id === meal.id,
          )
          const reviewCount = mealReviews.length
          const averageRating =
            reviewCount > 0
              ? mealReviews.reduce(
                  (sum, review) => sum + Number(review.rating),
                  0,
                ) / reviewCount
              : 0

          return { ...meal, averageRating, reviewCount }
        })

        setProperties(mealRatings)
        setFilteredProperties(mealRatings) // initially display all meals
      } catch (error) {
        console.error('Error fetching data:', error.message)
      }
    }

    fetchProperties()
  }, [])

  useEffect(() => {
    if (selectedCuisine) {
      setFilteredProperties(
        properties.filter((meal) => meal.cuisine === selectedCuisine),
      )
    } else {
      setFilteredProperties(properties)
    }
  }, [properties, selectedCuisine])

  return (
    <div>
      <Filter onFilterSelect={setSelectedCuisine} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-100">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white shadow-md rounded-lg overflow-hidden w-full border-none"
            >
              <Link to={`/meal/${property.id}`}>
                <img
                  src={property.image_url}
                  alt={property.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{property.title}</h2>
                  <p className="text-gray-500">{property.location}</p>

                  <div className="flex items-center space-x-2">
                    <p className="text-gray-500">Hosted by {property.host}</p>

                    {property.hosts?.is_verified && (
                      <div className="relative group">
                        <span className="bg-green-400 text-white text-xs px-2 py-1 rounded-full cursor-pointer">
                          ✔ Verified
                        </span>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-40 bg-gray-800 text-white text-xs text-center rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          This host has been verified for authenticity and
                          trust.
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-500">£{property.price?.toFixed(2)}</p>

                  {property.reviewCount > 0 ? (
                    <p className="text-gray-500">
                      ⭐ {property.averageRating.toFixed(1)} (
                      {property.reviewCount} reviews)
                    </p>
                  ) : (
                    <p className="text-gray-400">No reviews yet</p>
                  )}
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            No meals found for this cuisine.
          </p>
        )}
      </div>
    </div>
  )
}

export default Cards
