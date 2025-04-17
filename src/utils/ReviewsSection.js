// Return the first 6 reviews unless showAll is true
export function getVisibleReviews(reviews, showAll) {
  if (!Array.isArray(reviews)) return []
  return showAll ? reviews : reviews.slice(0, 6)
}

// Format date string into a readable format
export function formatReviewDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString('en-GB', { month: 'long', year: 'numeric' })
}

// Decide whether to render the "Show all reviews" button
export function shouldShowAllButton(reviews) {
  return Array.isArray(reviews) && reviews.length > 6
}

// Return true if comment is longer than 100 characters
export function shouldTruncateComment(comment) {
  return typeof comment === 'string' && comment.length > 100
}
