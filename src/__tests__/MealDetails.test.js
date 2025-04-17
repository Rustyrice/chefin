import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import MealDetails from '../layouts/MealDetails'

const meal = {
  title: 'Homemade Lasagna',
  location: 'Bath, UK',
  price: 15.5,
  description: 'A delicious and hearty Italian classic.',
}

describe('MealDetails Component', () => {
  test('renders meal title, location, price, and description', () => {
    render(<MealDetails meal={meal} averageRating={0} reviewCount={0} />)
    expect(screen.getByText(/Homemade Lasagna/)).toBeInTheDocument()
    expect(screen.getByText(/Bath, UK/)).toBeInTheDocument()
    expect(screen.getByText(/£15.50/)).toBeInTheDocument()
    expect(
      screen.getByText(/A delicious and hearty Italian classic/),
    ).toBeInTheDocument()
  })

  test('displays average rating and review count when reviews exist', () => {
    render(<MealDetails meal={meal} averageRating={4.2} reviewCount={5} />)
    expect(screen.getByText(/⭐ 4.2 \(5 reviews\)/)).toBeInTheDocument()
  })

  test('does not display rating if review count is 0', () => {
    render(<MealDetails meal={meal} averageRating={0} reviewCount={0} />)
    expect(screen.queryByText(/⭐/)).not.toBeInTheDocument()
  })
})
