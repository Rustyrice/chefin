import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'

const TermsPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-3xl bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-sm text-gray-700">
            Welcome to our application. By accessing and using our services, you
            agree to abide by the following Terms & Conditions.
          </p>

          <h2 className="text-lg font-semibold mt-4">1. Acceptance of Terms</h2>
          <p className="text-sm text-gray-700">
            By using this application, you confirm that you have read and
            understood these terms and agree to be bound by them.
          </p>

          <h2 className="text-lg font-semibold mt-4">2. Use of Services</h2>
          <p className="text-sm text-gray-700">
            You agree to use our services for lawful purposes only and in
            accordance with all applicable laws and regulations.
          </p>

          <h2 className="text-lg font-semibold mt-4">3. Privacy Policy</h2>
          <p className="text-sm text-gray-700">
            Your privacy is important to us. Please refer to our Privacy Policy
            for details on how we handle your personal information.
          </p>

          <h2 className="text-lg font-semibold mt-4">4. Changes to Terms</h2>
          <p className="text-sm text-gray-700">
            We reserve the right to update these Terms & Conditions at any time.
            It is your responsibility to review them periodically.
          </p>

          <h2 className="text-lg font-semibold mt-4">5. Contact Us</h2>
          <p className="text-sm text-gray-700">
            If you have any questions about these terms, feel free to contact
            us.
          </p>

          <button
            className="mt-6 w-full bg-green-400 text-white font-bold py-2 rounded-md"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TermsPage
