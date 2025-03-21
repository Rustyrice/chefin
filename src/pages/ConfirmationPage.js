import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import supabase from '../client/client.js'
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'
import Breadcrumbs from '../layouts/Breadcrumbs'

const ConfirmBooking = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { meal, selectedDate, selectedSlot, guestCount, totalPrice } =
    location.state || {}

  const [showModal, setShowModal] = useState(false)

  if (!meal || !selectedDate || !selectedSlot) {
    return (
      <div className="text-center mt-20">
        Invalid booking details. Please try again.
      </div>
    )
  }

  const handleConfirmBooking = async () => {
    try {
      // check that selectedSlot.time exists and is valid
      if (!selectedSlot || !selectedSlot.start_time || !selectedSlot.end_time) {
        alert('Invalid time slot. Please try again.')
        return
      }

      // Insert booking data into Supabase
      const { data, error } = await supabase.from('bookings').insert([
        {
          dish_id: meal.id,
          selected_date: selectedDate,
          start_time: selectedSlot.start_time,
          end_time: selectedSlot.end_time,
          guest_count: guestCount,
          total_price: totalPrice,
        },
      ])

      if (error) throw error

      // Show the confirmation modal
      setShowModal(true)
    } catch (error) {
      console.error('Error confirming booking:', error.message)
    }
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 pt-24 max-h-full">
        <Breadcrumbs mealTitle={meal.title} />
        <h1 className="text-3xl font-bold mb-4">Confirm and Pay</h1>

        <div className="bg-white p-6 shadow-md rounded-md">
          <h2 className="text-xl font-semibold">Your Experience</h2>
          <p>
            <strong>Meal:</strong> {meal.title}
          </p>
          <p>
            <strong>Date:</strong> {new Date(selectedDate).toDateString()}
          </p>
          <p>
            <strong>Time:</strong> {selectedSlot.start_time} -{' '}
            {selectedSlot.end_time}
          </p>
          <p>
            <strong>Guests:</strong> {guestCount}
          </p>

          <div className="mt-4">
            <h2 className="text-xl font-semibold">Price Details</h2>
            <p>Total Price: £{totalPrice.toFixed(2)}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Pay with</h2>
            <select className="w-full p-2 border rounded-md mt-2">
              <option value="visa">Visa **** 1234</option>
              <option value="mastercard">Mastercard **** 1234</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          <button
            className="mt-6 w-full bg-green-400 text-white font-bold py-2 rounded-md"
            onClick={handleConfirmBooking}
          >
            Confirm and Pay
          </button>
        </div>
      </div>
      <Footer />

      {/* Confirmation modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 shadow-md rounded-md w-96 text-center">
            <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
            <p>Your booking has been confirmed. Enjoy your meal!</p>
            <button
              className="mt-4 bg-green-400 text-white font-bold py-2 px-4 rounded-md"
              onClick={() => navigate('/home')}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ConfirmBooking
