import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import HostInfo from '../layouts/HostInfo'

const mockHost = {
  name: 'Jane Doe',
  profile_picture_url: 'https://randomuser.me/api/portraits/women/16.jpg',
  is_verified: true,
  bio: 'This is a test bio. '.repeat(10),
}

describe('HostInfo Component', () => {
  test('renders host name and profile picture', () => {
    render(<HostInfo host={mockHost} />)
    expect(screen.getByText(/Hosted by Jane Doe/)).toBeInTheDocument()
    expect(screen.getByAltText('Jane Doe')).toBeInTheDocument()
  })

  test('displays verified badge if host is verified', () => {
    render(<HostInfo host={mockHost} />)
    expect(screen.getByText('✔ Verified')).toBeInTheDocument()
  })

  test('toggles bio text on "Show more" and "Show less"', () => {
    render(<HostInfo host={mockHost} />)
    const toggleButton = screen.getByText('Show more ›')
    expect(toggleButton).toBeInTheDocument()

    fireEvent.click(toggleButton)
    expect(screen.getByText('Show less')).toBeInTheDocument()
  })
})
