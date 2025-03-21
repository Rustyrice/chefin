import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const ReviewSection = () => {
  const reviews = [
    {
        id: 1,
        name: 'John Doe',
        comment: 'The food was amazing! I loved the variety and taste. Will definitely order again.',
        avatar: "src/assets/img/avatars/avatar1.jpg",
        stars: 5,

    },
    {
        id: 2,
        name: 'Jane Smith',
        comment: 'I had a wonderful dining experience at a home restaurant. The ambiance was cozy and the host was so welcoming.',
        avatar: 'avatar2.jpg',
        stars: 5,

    },
    {
        id: 3,
        name: 'Mike Johnson',
        comment: "This platform is a game-changer. I'm so glad I can now enjoy delicious home-cooked meals while supporting local chefs.",
        avatar: 'avatar3.jpg',
        stars: 5,

    },
    {
        id: 4,
        name: 'Wayne Kerr',
        comment: "The best food delivery service I have ever used. Quick delivery and delicious food!",
        avatar: 'avatar4.jpg',
        stars: 5,

    },
    {
        id: 5,
        name: 'Guy Fieri',
        comment: 'I had an amazing dining experience with Chefin. The food was outstanding, and the service was top-notch!',
        avatar: 'avatar5.jpg', // Add the URL or import your avatar image
        stars: 5,
    },
    {
        id: 6,
        name: 'Emily Johnson',
        comment: 'Chefin has a wide variety of cuisines to choose from. I am impressed with their menu options and taste.',
        avatar: 'avatar6.jpg', // Add the URL or import your avatar image
        stars: 5,
    },
  ];

  const renderStars = (numStars) => {
    const stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    return stars;
  }

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Don't Just Take Our Word For It</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              className="bg-white p-6 rounded-lg shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
                <div className="flex items-center justify-center mb-4">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full" />
                <div className="ml-3">
                    <p className="text-gray-800 text-lg font-semibold">{review.name}</p>
                </div>
                </div>
                <p className="text-gray-800 text-sm mb-4">{review.comment}</p>
                <div className="flex justify-center items-center mb-2">
                    {renderStars(review.stars)}
                </div>
              {/* You can add additional content, like star ratings or icons */}
              {/* For example: */}
              {/* <div className="flex justify-center items-center">
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <StarIcon className="w-5 h-5 text-yellow-400" />
              </div> */}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
