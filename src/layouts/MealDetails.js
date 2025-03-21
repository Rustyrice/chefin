import React from 'react'

const MealDetails = ({ meal, averageRating, reviewCount }) => {
  return (
    <div className="mt-6">
      <h1 className="text-3xl font-bold">{meal.title}</h1>
      <p className="text-gray-500">{meal.location}</p>
      <p className="text-lg font-semibold mt-2">£{meal.price?.toFixed(2)}</p>
      <p className="text-gray-700 mt-4">{meal.description}</p>
      {reviewCount > 0 && (
        <p className="text-gray-600 mt-2">
          ⭐ {averageRating?.toFixed(1)} ({reviewCount} reviews)
        </p>
      )}
    </div>
  )
}

export default React.memo(MealDetails)
