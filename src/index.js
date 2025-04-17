import React from 'react'
// import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'

// styles
import 'tailwindcss/tailwind.css'

// pages
// import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import MealProfilePage from './pages/MealProfilePage'
import ConfirmBooking from './pages/ConfirmationPage'
import SafetyGuidelines from './pages/SafetyGuidelinesPage'
import Terms from './pages/TermsPage'
import ErrorPage from './ErrorPage'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/meal/:id" element={<MealProfilePage />} />
        <Route path="/confirm-booking" element={<ConfirmBooking />} />
        <Route path="/safety-guidelines" element={<SafetyGuidelines />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
