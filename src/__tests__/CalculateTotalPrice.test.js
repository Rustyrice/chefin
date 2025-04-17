import { calculateTotalPrice } from '../utils/CalculateTotalPrice'

describe('calculateTotalPrice', () => {
  test('calculates correctly for 1 guest', () => {
    expect(calculateTotalPrice(10, 1)).toBe(10)
  })

  test('calculates correctly for multiple guests', () => {
    expect(calculateTotalPrice(15.5, 4)).toBe(62)
  })

  test('returns 0 if guest count is 0', () => {
    expect(calculateTotalPrice(20, 0)).toBe(0)
  })

  test('handles decimal prices', () => {
    expect(calculateTotalPrice(12.99, 3)).toBeCloseTo(38.97)
  })

  test('returns NaN for invalid input', () => {
    expect(calculateTotalPrice('abc', 3)).toBeNaN()
  })
})
