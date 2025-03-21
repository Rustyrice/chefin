import React from 'react'

// core layouts
import Navbar from '../layouts/Navbar.js'
import LandingPageHeader from '../layouts/LandingPageHeader.js'
import HowItWorks from '../layouts/HowItWorks.js'
import Footer from '../layouts/Footer.js'
import ReviewSection from '../layouts/ReviewLanding.js'
import CTASearchSection from '../layouts/CTASearch.js'

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <LandingPageHeader />
      <HowItWorks />
      <ReviewSection />
      <CTASearchSection />
      <Footer />
    </>
  )
}

export default LandingPage
