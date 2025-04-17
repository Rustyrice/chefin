// Extracts and return a de-duplicated list of cuisines from Supabase response data
export function getUniqueCuisines(data) {
  if (!Array.isArray(data)) return []
  const cuisines = data.map((meal) => meal.cuisine).filter(Boolean)
  return [...new Set(cuisines)]
}

// return true if a cuisine is selected
export function isSelectedCuisine(cuisine, selectedCuisine) {
  return cuisine === selectedCuisine
}

// sort cuisine list alphabetically
export function sortCuisinesAlphabetically(cuisines) {
  return [...cuisines].sort((a, b) => a.localeCompare(b))
}
