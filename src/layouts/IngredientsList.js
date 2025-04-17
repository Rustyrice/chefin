import React, { useState } from 'react'
import { formatIngredientText } from '../utils/IngredientsList'

const IngredientsList = ({ ingredients }) => {
  const [showIngredients, setShowIngredients] = useState(false)

  if (!ingredients) {
    return (
      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">Ingredients</h3>
        <p className="text-gray-500">No ingredient list available.</p>
      </div>
    )
  }

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold">Ingredients</h3>
      <ul
        className={`mt-2 transition-all duration-300 ${
          showIngredients ? '' : 'max-h-12 overflow-hidden'
        }`}
      >
        {ingredients.map((ingredient, index) => (
          <li key={index} className="text-gray-600">
            {formatIngredientText(ingredient)}
          </li>
        ))}
      </ul>
      <button
        onClick={() => setShowIngredients(!showIngredients)}
        className="text-black font-semibold mt-2"
      >
        {showIngredients ? 'Show less' : 'Show more ›'}
      </button>
    </div>
  )
}

export default IngredientsList
