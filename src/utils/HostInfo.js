// Truncate a bio string to 100 characters with ellipsis
// If bio is already short, return it as is
export function getTruncatedBio(bio) {
  if (bio.length <= 100) return bio
  return `${bio.substring(0, 100)}...`
}
