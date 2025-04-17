// Ensures the price is always shown with tow decimal palces and prefixed with £
export function formatPrice(price) {
  if (typeof price !== 'number' || isNaN(price)) return '£0.00'
  return `£${price.toFixed(2)}`
}

// Ensures the rating is always shown with one decimal place
export function formatRating(average, count) {
  if (!count || count <= 0) return ''
  return `⭐ ${average.toFixed(1)} (${count} reviews)`
}
