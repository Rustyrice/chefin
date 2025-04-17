import React from 'react'
import { formatPrice, formatRating } from '../utils/MealDetails'

const MealDetails = ({ meal, averageRating, reviewCount }) => {
  return (
    <div className="mt-6">
      <h1 className="text-3xl font-bold">{meal.title}</h1>
      <p className="text-gray-500">{meal.location}</p>
      <p className="text-lg font-semibold mt-2">{formatPrice(meal.price)}</p>
      <p className="text-gray-700 mt-4">{meal.description}</p>
      {reviewCount > 0 && (
        <p className="text-gray-600 mt-2">
          {formatRating(averageRating, reviewCount)}
        </p>
      )}
    </div>
  )
}

export default React.memo(MealDetails)
