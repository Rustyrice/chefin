import {
  getVisibleReviews,
  formatReviewDate,
  shouldShowAllButton,
  shouldTruncateComment,
} from '../utils/ReviewsSection'

describe('getVisibleReviews', () => {
  const reviews = Array.from({ length: 10 }, (_, i) => ({ id: i }))

  test('returns all reviews if showAll is true', () => {
    expect(getVisibleReviews(reviews, true)).toHaveLength(10)
  })

  test('returns first 6 reviews if showAll is false', () => {
    expect(getVisibleReviews(reviews, false)).toHaveLength(6)
  })
})

describe('formatReviewDate', () => {
  test('formats ISO date string to "Month Year"', () => {
    expect(formatReviewDate('2024-03-10')).toMatch(/March 2024/)
  })
})

describe('shouldShowAllButton', () => {
  test('returns true if more than 6 reviews', () => {
    const reviews = new Array(7).fill({})
    expect(shouldShowAllButton(reviews)).toBe(true)
  })

  test('returns false if 6 or fewer reviews', () => {
    expect(shouldShowAllButton([])).toBe(false)
    expect(shouldShowAllButton(new Array(6).fill({}))).toBe(false)
  })
})

describe('shouldTruncateComment', () => {
  test('returns true for long comments', () => {
    expect(shouldTruncateComment('a'.repeat(101))).toBe(true)
  })

  test('returns false for short comments', () => {
    expect(shouldTruncateComment('short')).toBe(false)
  })
})
