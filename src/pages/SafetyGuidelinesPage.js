import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'

const SafetyGuidelines = () => {
  const navigate = useNavigate()

  return (
    <>
      <Navbar />
      <div className="flex flex-col pt-24">
        <div className="mx-auto p-6">
          <h1 className="text-3xl font-bold text-center mb-6">
            Health & Food Safety Guidelines
          </h1>
          <p className="text-gray-600 text-center mb-8">
            These guidelines outline the essential food safety practices that
            all home cooks must follow to ensure a high standard of hygiene and
            food quality.
          </p>

          {/* General Hygiene */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              General Hygiene and Sanitation
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                Wash hands with soap and water for at least 20 seconds before
                and after handling food.
              </li>
              <li>
                Wear clean cooking attire and ensure hair is secured or covered.
              </li>
              <li>
                Refrain from preparing meals if experiencing any symptoms of
                illness, such as fever, coughing, or gastrointestinal
                discomfort.
              </li>
              <li>
                Sanitize all cooking surfaces, utensils, and equipment before
                and after use.
              </li>
            </ul>
          </div>

          {/* Food Handling & Preparation */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Food Handling and Preparation
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                Use separate cutting boards and utensils for raw and cooked
                foods to prevent cross-contamination.
              </li>
              <li>Cook food to the appropriate internal temperature:</li>
              <ul className="ml-4 list-disc text-gray-600">
                <li>Poultry: 75°C (165°F)</li>
                <li>Beef, pork, lamb: 63°C (145°F)</li>
                <li>Ground meats: 71°C (160°F)</li>
                <li>Fish and seafood: 63°C (145°F)</li>
              </ul>
              <li>Thoroughly wash fruits and vegetables before consumption.</li>
            </ul>
          </div>

          {/* Storage & Packaging */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Storage and Packaging
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                Store perishable items in a refrigerator at or below 5°C (41°F)
                and frozen items at -18°C (0°F) or lower.
              </li>
              <li>
                Clearly label meals with storage instructions and expiration
                dates.
              </li>
              <li>
                Use airtight, food-safe containers to maintain freshness and
                prevent contamination.
              </li>
            </ul>
          </div>

          {/* Allergen Awareness */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Allergen Awareness</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                All meal descriptions must include a full list of ingredients to
                inform customers of potential allergens.
              </li>
              <li>
                Highlight meals that contain common allergens, including but not
                limited to:
              </li>
              <ul className="ml-4 list-disc text-gray-600">
                <li>Peanuts, tree nuts</li>
                <li>Dairy, eggs</li>
                <li>Gluten, wheat</li>
                <li>Shellfish, fish</li>
                <li>Soy, sesame</li>
              </ul>
              <li>
                Prevent cross-contact by using separate utensils and preparation
                areas for allergen-free meals.
              </li>
            </ul>
          </div>

          {/* Meal Handover and Delivery */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Meal Handover and Delivery
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                Ensure that meals are securely packaged to prevent leakage or
                contamination.
              </li>
              <li>Maintain proper temperature control before handover:</li>
              <ul className="ml-4 list-disc text-gray-600">
                <li>Hot meals: Maintain at or above 60°C (140°F)</li>
                <li>Cold meals: Store at or below 5°C (41°F)</li>
              </ul>
              <li>
                Use insulated bags for meal deliveries to preserve food quality
                and safety.
              </li>
            </ul>
          </div>

          {/* Compliance and Reporting */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Compliance and Reporting
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                Report any concerns regarding food safety or hygiene through the
                platform’s reporting system.
              </li>
              <li>
                Repeated violations of food safety standards may result in
                suspension from the platform.
              </li>
              <li>
                All cooks must adhere to university and local food safety
                regulations.
              </li>
            </ul>
          </div>

          {/* Back Button */}
          <button
            className="mt-6 w-full bg-green-400 text-white font-bold py-2 rounded-md"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default SafetyGuidelines
