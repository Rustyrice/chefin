import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.REACT_APP_PUBLIC_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY,
)

const testDishId = 9999 // Random ID to avoid conflicts
const testHostId = '253d04b6-b6c6-45b5-b746-db88db3f0d5b'

test('inserts and retrieves a booking record', async () => {
  await supabase.from('hosts').upsert([
    {
      id: testHostId,
      name: 'Test Host',
      is_verified: true,
    },
  ])

  // Insert a test dish with matching host_id
  await supabase
    .from('dish_listings')
    .upsert([
      {
        id: testDishId,
        title: 'Test Dish',
        location: 'Test Kitchen',
        price: 25,
        description: 'A test meal for integration testing',
        host_id: testHostId,
      },
    ])
    .select('*')
  const { data: insertedDishes, error: dishError } = await supabase
    .from('dish_listings')
    .upsert([
      {
        id: testDishId,
        title: 'Test Dish',
        location: 'Test Kitchen',
        price: 25,
        description: 'A test meal for integration testing',
        host_id: testHostId,
      },
    ])
    .select('*')

  if (dishError || !insertedDishes || insertedDishes.length === 0) {
    throw new Error('Failed to insert test dish: ' + JSON.stringify(dishError))
  }

  // Insert booking
  const insertData = {
    dish_id: testDishId,
    selected_date: '2024-04-17',
    guest_count: 2,
    total_price: 25,
    start_time: '12:00',
    end_time: '14:00',
  }

  const { data: insertResult, error: insertError } = await supabase
    .from('bookings')
    .insert([insertData])
    .select()

  expect(insertError).toBeNull()
  expect(insertResult[0].guest_count).toBe(2)

  const { data: fetched, error: fetchError } = await supabase
    .from('bookings')
    .select('*')
    .eq('dish_id', testDishId)

  expect(fetchError).toBeNull()
  expect(fetched.length).toBeGreaterThan(0)
})

afterAll(async () => {
  // Clean up test data
  await supabase.from('bookings').delete().eq('dish_id', testDishId)
  await supabase.from('dish_listings').delete().eq('id', testDishId)
  await supabase.from('hosts').delete().eq('id', testHostId)
})
