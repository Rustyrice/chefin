import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumbs = ({ location, category }) => {
  return (
    <nav className="text-sm text-gray-600 mt-6">
      <ul className="flex space-x-2">
        <li>
          <Link to="/home" className="hover:underline">
            Home
          </Link>
          <span> › </span>
        </li>
        <li className="text-gray-400">Current Page</li>
      </ul>
    </nav>
  )
}

export default Breadcrumbs
