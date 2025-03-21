import React, { useEffect, useState, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../client/client.js'
import Navbar from '../layouts/Navbar.js'
import Footer from '../layouts/Footer.js'
import LoadingSpinner from '../layouts/LoadingSpinner.js'
import Breadcrumbs from '../layouts/Breadcrumbs.js'
import IngredientsList from '../layouts/IngredientsList.js'

const MealDetails = React.lazy(() => import('../layouts/MealDetails.js'))
const HostInfo = React.lazy(() => import('../layouts/HostInfo.js'))
const ReviewsSection = React.lazy(() => import('../layouts/ReviewsSection.js'))
const BookingSection = React.lazy(() => import('../layouts/BookingSection.js'))

const MealProfilePage = () => {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [host, setHost] = useState(null)
  const [reviews, setReviews] = useState([])
  const [averageRating, setAverageRating] = useState(0)
  const [reviewCount, setReviewCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const { data: mealData, error: mealError } = await supabase
          .from('dish_listings')
          .select('*')
          .eq('id', id)
          .single()

        if (mealError) throw mealError
        setMeal(mealData)

        const { data: hostData, error: hostError } = await supabase
          .from('hosts')
          .select('*')
          .eq('id', mealData.host_id)
          .single()

        if (hostError) throw hostError
        setHost(hostData)

        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select('*')
          .eq('dish_id', id)

        if (reviewsError) throw reviewsError
        setReviews(reviewsData)

        if (reviewsData.length > 0) {
          const avg =
            reviewsData.reduce(
              (sum, review) => sum + Number(review.rating),
              0,
            ) / reviewsData.length
          setAverageRating(avg)
          setReviewCount(reviewsData.length)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchMealDetails()
  }, [id])

  if (loading) return <LoadingSpinner />
  if (error)
    return <div className="text-center mt-20">Error: {error.message}</div>
  if (!meal) return <div className="text-center mt-20">Meal not found.</div>

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 max-w-4xl">
        <Suspense fallback={<LoadingSpinner />}>
          <div className="mt-24">
            <Breadcrumbs
              items={[
                { label: 'Home', link: '/home' },
                { label: 'Meals', link: '/meals' },
                { label: meal.title },
              ]}
            />
            <img
              src={meal.image_url}
              alt={meal.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
              loading="lazy"
            />
          </div>
          <MealDetails
            meal={meal}
            averageRating={averageRating}
            reviewCount={reviewCount}
          />
          {host && <HostInfo host={host} />}

          <IngredientsList ingredients={meal.ingredients} />

          <BookingSection meal={meal} />
          <ReviewsSection reviews={reviews} averageRating={averageRating} />
        </Suspense>
      </div>
      <Footer />
    </>
  )
}

export default MealProfilePage
