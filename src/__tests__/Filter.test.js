import {
  getUniqueCuisines,
  isSelectedCuisine,
  sortCuisinesAlphabetically,
} from '../utils/Filter'

describe('getUniqueCuisines', () => {
  test('returns unique list of cuisines', () => {
    const input = [
      { cuisine: 'Thai' },
      { cuisine: 'Italian' },
      { cuisine: 'Thai' },
    ]
    expect(getUniqueCuisines(input)).toEqual(['Thai', 'Italian'])
  })

  test('handles empty or invalid input gracefully', () => {
    expect(getUniqueCuisines(null)).toEqual([])
    expect(getUniqueCuisines({})).toEqual([])
  })
})

describe('isSelectedCuisine', () => {
  test('returns true if cuisine matches selected', () => {
    expect(isSelectedCuisine('Thai', 'Thai')).toBe(true)
  })

  test('returns false if cuisine does not match', () => {
    expect(isSelectedCuisine('Thai', 'Italian')).toBe(false)
  })
})

describe('sortCuisinesAlphabetically', () => {
  test('sorts cuisines alphabetically', () => {
    const cuisines = ['Mexican', 'Japanese', 'British']
    expect(sortCuisinesAlphabetically(cuisines)).toEqual([
      'British',
      'Japanese',
      'Mexican',
    ])
  })
})
