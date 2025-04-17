import { formatIngredientText } from '../utils/IngredientsList'

describe('formatIngredientText', () => {
  test('formats with quantity', () => {
    const ingredient = { quantity: '1 tsp', name: 'Salt' }
    expect(formatIngredientText(ingredient)).toBe('1 tsp – Salt')
  })

  test('formats without quantity', () => {
    const ingredient = { name: 'Sugar' }
    expect(formatIngredientText(ingredient)).toBe('Sugar')
  })

  test('returns empty string for missing name', () => {
    const ingredient = { quantity: '2 cups' }
    expect(formatIngredientText(ingredient)).toBe('')
  })

  test('handles null input gracefully', () => {
    expect(formatIngredientText(null)).toBe('')
  })
})
