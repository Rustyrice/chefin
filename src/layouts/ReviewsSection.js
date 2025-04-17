import React, { useState } from 'react'
import {
  getVisibleReviews,
  formatReviewDate,
  shouldTruncateComment,
} from '../utils/ReviewsSection'

const ReviewsSection = ({ reviews, averageRating }) => {
  const [expandedReviews, setExpandedReviews] = useState({})
  const [showAll, setShowAll] = useState(false) // Track whether all reviews should be displayed

  const toggleExpand = (id) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="mt-8">
      {/* Overall Rating */}
      <h2 className="text-2xl font-semibold flex items-center">
        ⭐ {averageRating?.toFixed(1)} ({reviews.length} reviews)
      </h2>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
        {getVisibleReviews(reviews, showAll).map((review) => (
          <div key={review.id} className="border-b pb-4">
            {/* Reviewer Info */}
            <div className="flex items-center mb-2">
              <img
                src={review.review_image}
                alt={review.reviewer_name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{review.reviewer_name}</p>
                <p className="text-gray-500 text-sm">
                  {formatReviewDate(review.review_date)}
                </p>
              </div>
            </div>

            {/* Review Comment */}
            <p className="text-gray-700">
              {shouldTruncateComment(review.comment)
                ? review.comment.substring(0, 100) + '...'
                : review.comment}
            </p>

            {review.comment.length > 100 && (
              <button
                onClick={() => toggleExpand(review.id)}
                className="text-black font-semibold mt-1"
              >
                {expandedReviews[review.id] ? 'Show less' : 'Show more ›'}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Show All Reviews Button */}
      {reviews.length > 6 && (
        <button
          onClick={() => setShowAll((prev) => !prev)} // Toggle between showing all reviews and only 6
          className="mt-4 w-full border p-2 rounded-md font-semibold"
        >
          {showAll
            ? 'Show fewer reviews'
            : `Show all ${reviews.length} reviews`}
        </button>
      )}
    </div>
  )
}

export default ReviewsSection
