import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Rating, Star  } from '@smastrom/react-rating'

interface RatingProps {
  rating: number; // Organization's rating value (e.g., 4.5)
  numberOfReviews: number; // Optional: number of reviews
}

const Rating: React.FC<RatingProps> = () => {
  return (
    <Rating
      value={0}
      readOnly
      itemStyles={{
        itemShapes: Star,
        activeFillColor: '#FFC107', // Yellow color for filled stars
        inactiveFillColor: '#E0E0E0', // Grey color for unfilled stars
      }}
      style={{ maxWidth: 120 }}
    />
  );
};

export default Rating;
