import { createClient } from '@supabase/supabase-js'

// Mock createClient and its API methods
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      insert: jest.fn(() =>
        Promise.resolve({
          data: [{ id: 1, guest_count: 2, dish_id: 123 }],
          error: null,
        }),
      ),
      select: jest.fn(() =>
        Promise.resolve({
          data: [{ id: 1, guest_count: 2, dish_id: 123 }],
          error: null,
        }),
      ),
    })),
  })),
}))

describe('Supabase Mocked', () => {
  const supabase = createClient()

  test('inserts a booking record successfully', async () => {
    const booking = {
      dish_id: 123,
      selected_date: '2024-05-01',
      start_time: '12:00',
      end_time: '14:00',
      guest_count: 2,
      total_price: 30,
    }

    const { data, error } = await supabase.from('bookings').insert([booking])

    expect(error).toBeNull()
    expect(data).toHaveLength(1)
    expect(data[0].guest_count).toBe(2)
  })

  test('queries booking record successfully', async () => {
    const { data, error } = await supabase.from('bookings').select()

    expect(error).toBeNull()
    expect(data).toHaveLength(1)
    expect(data[0].dish_id).toBe(123)
  })
})
