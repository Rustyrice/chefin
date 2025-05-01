-- Seed data for hosts table
INSERT INTO public.hosts (id, name, profile_picture_url, bio, is_verified)
VALUES
  ('c89f4176-3d8a-4ed8-b41f-1b1be017f001', 'Sofia Nguyen', 'https://example.com/images/sofia.jpg', 'Vietnamese student who loves sharing warm, homemade pho.', TRUE),
  ('a07b3d53-d7ce-4fc0-a8f7-7c42e21ae003', 'Carlos Herrera', 'https://example.com/images/carlos.jpg', 'Passionate about cooking Mexican family recipes.', FALSE),
  ('88ef1a1f-6fc4-46b6-a814-902fe2c22200', 'Amina Yusuf', 'https://example.com/images/amina.jpg', 'I enjoy preparing healthy North African dishes.', TRUE);

-- Seed data for dish_listings table
INSERT INTO public.dish_listings (
  title, description, image_url, location, host, price, host_id, available_dates,
  price_category, ingredients, cuisine
)
VALUES
  (
    'Beef Pho',
    'Traditional Vietnamese noodle soup with herbs and slow-cooked beef.',
    'https://example.com/images/pho.jpg',
    'Bath City Centre',
    'Sofia Nguyen',
    7.5,
    'c89f4176-3d8a-4ed8-b41f-1b1be017f001',
    '["2025-05-03", "2025-05-04"]',
    'Medium',
    '["rice noodles", "beef", "star anise", "ginger", "onions", "mint"]',
    'Vietnamese'
  ),
  (
    'Tacos al Pastor',
    'Marinated pork tacos with pineapple and fresh coriander.',
    'https://example.com/images/tacos.jpg',
    'Oldfield Park',
    'Carlos Herrera',
    6.0,
    'a07b3d53-d7ce-4fc0-a8f7-7c42e21ae003',
    '["2025-05-05"]',
    'Low',
    '["pork", "pineapple", "corn tortilla", "coriander", "onion"]',
    'Mexican'
  ),
  (
    'Couscous with Vegetables',
    'Aromatic couscous served with carrots, chickpeas and courgettes.',
    'https://example.com/images/couscous.jpg',
    'Combe Down',
    'Amina Yusuf',
    8.0,
    '88ef1a1f-6fc4-46b6-a814-902fe2c22200',
    '["2025-05-04", "2025-05-06"]',
    'Medium',
    '["couscous", "chickpeas", "carrot", "courgette", "cumin", "olive oil"]',
    'North African'
  );

-- Seed data for reviews table
INSERT INTO public.reviews (dish_id, reviewer_name, comment, rating, review_image, review_date)
VALUES
  (1, 'Emily T.', 'Amazing pho—tastes just like home!', 4.8, NULL, '2025-05-01T10:30:00Z'),
  (1, 'Mark L.', 'Very authentic and generous portions.', 4.5, NULL, '2025-05-02T11:00:00Z'),
  (2, 'Jasmin A.', 'Delicious and spicy tacos. Would eat again.', 4.7, NULL, '2025-05-01T14:00:00Z'),
  (3, 'Liam K.', 'Fresh and healthy, but could use more seasoning.', 4.0, NULL, '2025-05-02T09:45:00Z');