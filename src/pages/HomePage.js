import React from 'react'

import Navbar from '../layouts/Navbar.js'
import Filter from '../layouts/Filter.js'
import Cards from '../layouts/Cards.js'
import Footer from '../layouts/Footer.js'

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <div className="mt-20">
          <Cards />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HomePage
