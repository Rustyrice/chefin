// Format ingredient object into displayable text
// { quanitity: '2 tsp', name: 'salt' } => '2 tsp – salt'
export function formatIngredientText(ingredient) {
  if (!ingredient || !ingredient.name) return ''
  return ingredient.quantity
    ? `${ingredient.quantity} – ${ingredient.name}`
    : ingredient.name
}
