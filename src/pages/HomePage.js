import React, { useState, useEffect } from 'react'
import Navbar from '../layouts/Navbar.js'
import Cards from '../layouts/Cards.js'
import Footer from '../layouts/Footer.js'

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const hasAccepted = localStorage.getItem('termsAccepted')
    if (!hasAccepted) {
      setShowPopup(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('termsAccepted', 'true')
    setShowPopup(false)
  }

  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <div className="mt-20">
          <Cards />
        </div>
      </div>

      {/* Terms & Conditions Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-lg font-bold text-center">
              Terms & Conditions
            </h2>
            <p className="mt-2 text-sm text-center">
              By using this application, you agree to our Terms & Conditions.
              Please read them carefully before proceeding.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAccept}
                className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-400"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default HomePage
