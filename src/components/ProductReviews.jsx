import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Star } from 'lucide-react';

const renderStars = (rating) => {
  return Array.from({ length: 5 }).map((_, i) => (
    <Star key={i} color={i < rating ? "#ffd700" : "#e4e4e4"} size={20} />
  ));
};

const ProductReviews = ({ reviews }) => {
  return (
    <div className="flex-1">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500 text-sm">No reviews for this product yet.</p>
      ) : (
        <div className="space-y-4 overflow-auto h-[70vh]">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white p-4 rounded-md shadow hover:shadow-md transition">
              <div className="flex items-center mb-2">
                {review.accountInfo?.profilePicture ? (
                  <img
                    src={review.accountInfo.profilePicture}
                    alt="Reviewer"
                    className="w-8 h-8 rounded-full object-cover mr-3"
                  />
                ) : (
                  <FaUserCircle size={28} className="text-blue-400 mr-3" />
                )}
                <div className="flex-1">
                  <div className="flex items-center">{renderStars(Number(review.rating) || 0)}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    {review.accountInfo?.recipientName || "Anonymous"} • {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-2">{review.review}</p>
              {review.reviewImageUrl && (
                <img
                  src={review.reviewImageUrl}
                  alt="Review"
                  className="w-full max-w-xs rounded-md shadow-sm"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
