import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { calculateTotalPrice } from '../utils/CalculateTotalPrice'

const BookingSection = ({ meal }) => {
  const [selectedDate, setSelectedDate] = useState('')
  const [guestCount, setGuestCount] = useState(1)
  const navigate = useNavigate()

  // Ensure available_dates is properly formatted
  const availableDates = Array.isArray(meal.available_dates)
    ? meal.available_dates
    : []

  // Convert selected date to match database format (YYYY-MM-DD)
  const formattedSelectedDate = selectedDate
    ? new Date(selectedDate).toISOString().split('T')[0]
    : ''

  // Find the selected date object
  const selectedDateObj = availableDates.find(
    (date) => date.date === formattedSelectedDate,
  )

  // Ensure timeSlots is always an array
  const timeSlots = Array.isArray(selectedDateObj?.time_slots)
    ? selectedDateObj.time_slots
    : []

  // Navigate to confirmation page with the selected time slot
  const handleConfirmBooking = (slot) => {
    if (!selectedDate) {
      alert('Please select a date before proceeding.')
      return
    }

    navigate('/confirm-booking', {
      state: {
        meal,
        selectedDate: formattedSelectedDate,
        selectedSlot: slot, // Pass the selected time slot
        guestCount,
        totalPrice: calculateTotalPrice(slot.price * guestCount), // Calculate price based on guests
      },
    })
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 border mt-6">
      <h2 className="text-2xl font-semibold">From £{meal.price}</h2>

      {/* Date & Guest Selection */}
      <div className="flex justify-between bg-gray-100 p-2 mt-2 rounded-md">
        {/* Date Selection */}
        <select
          className="w-1/2 p-2 border rounded-md mr-2"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">Select Date</option>
          {availableDates.map((slot, index) => (
            <option key={index} value={slot.date}>
              {new Date(slot.date).toDateString()}
            </option>
          ))}
        </select>

        {/* Guest Selection */}
        <select
          className="w-1/2 p-2 border rounded-md"
          value={guestCount}
          onChange={(e) => setGuestCount(Number(e.target.value))}
        >
          {[...Array(10).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1} guest{num > 0 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Time Slots with Individual "Choose" Buttons */}
      {timeSlots.length > 0 ? (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Available time slots:</h3>
          {timeSlots.map((slot, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 border-b"
            >
              <p className="font-semibold">
                {slot.start_time} - {slot.end_time}
              </p>
              <p className="mr-4 font-semibold">
                £{(slot.price * guestCount).toFixed(2)}
              </p>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleConfirmBooking(slot)}
              >
                Choose
              </button>
            </div>
          ))}
        </div>
      ) : (
        selectedDate && (
          <p className="text-gray-500 mt-4">
            No time slots available for this date.
          </p>
        )
      )}
    </div>
  )
}

export default BookingSection
