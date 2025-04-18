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
            Welcome to Chefin. By accessing and using our platform, you agree to
            abide by the following Terms & Conditions, which are designed to
            promote safety, trust, and responsible participation in our
            meal-sharing community.
          </p>

          <h2 className="text-lg font-semibold mt-4">1. Acceptance of Terms</h2>
          <p className="text-sm text-gray-700">
            By using this application, you confirm that you have read and
            understood these terms and agree to be bound by them.
          </p>

          <h2 className="text-lg font-semibold mt-4">
            2. Host responsibilities and Food Safety
          </h2>
          <p className="text-sm text-gray-700">
            If you are a host offering meals on Chefin, you acknowledge that you
            are responsible for understanding and complying with any relevant
            local food safety regulations. You agree to follow basic hygiene
            practices and prepare food in a safe and clean environment. While
            Chefin does not conduct formal inspections, all hosts must
            self-certify that they are aware of their obligations before
            offering meals on the platform.
          </p>

          <h2 className="text-lg font-semibold mt-4">
            3. Nature of the Platform
          </h2>
          <p className="text-sm text-gray-700">
            Chefin is a peer-to-peer meal-sharing platform intended to connect
            individuals for private, non-commercial dining experiences. It is
            not a commercial food service and does not license, inspect, or
            certify hosts or kitchens. The platform facilitates connections and
            bookings but does not assume legal responsibility for the
            preparation or consumption of food.
          </p>

          <h2 className="text-lg font-semibold mt-4">4. Privacy Policy</h2>
          <p className="text-sm text-gray-700">
            Your privacy is important to us. Please refer to our Privacy Policy
            for details on how we handle your personal information.
          </p>

          <h2 className="text-lg font-semibold mt-4">5. Changes to Terms</h2>
          <p className="text-sm text-gray-700">
            We reserve the right to update these Terms & Conditions at any time.
            It is your responsibility to review them periodically.
          </p>

          <h2 className="text-lg font-semibold mt-4">6. Contact Us</h2>
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
