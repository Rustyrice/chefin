import React, { useState } from 'react'
import { getTruncatedBio } from '../utils/HostInfo'

const HostInfo = ({ host }) => {
  const [expandedHostInfo, setExpandedHostInfo] = useState(false)

  const toggleExpand = () => {
    setExpandedHostInfo((prev) => !prev)
  }

  return (
    <div className="mt-6 flex items-start space-x-4">
      {/* Profile Image */}
      <img
        src={host.profile_picture_url}
        alt={host.name}
        className="w-16 h-16 object-cover rounded-full flex-shrink-0"
        loading="lazy"
      />

      {/* Host Info Container */}
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <h3 className="text-xl font-semibold">Hosted by {host.name}</h3>

          {/* Verified Badge (Only Show If Host is Verified) */}
          {host.is_verified && (
            <div className="relative group">
              <span className="bg-green-400 text-white text-xs px-2 py-1 rounded-full cursor-pointer">
                ✔ Verified
              </span>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-40 bg-gray-800 text-white text-xs text-center rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                This host has completed food safety training and complied with
                community standards.
              </div>
            </div>
          )}
        </div>

        <p className="text-gray-600 transition-all duration-300">
          {expandedHostInfo ? host.bio : getTruncatedBio(host.bio)}
        </p>

        {/* Show More / Show Less Button */}
        {host.bio.length > 100 && (
          <button
            onClick={toggleExpand}
            className="text-black font-semibold mt-1"
          >
            {expandedHostInfo ? 'Show less' : 'Show more ›'}
          </button>
        )}
      </div>
    </div>
  )
}

export default React.memo(HostInfo)
