"use client";
import React, { useState } from 'react';

const Rating = ({ menuItemId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!rating || !comment) {
      alert('Please provide a rating and comment before submitting.!');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch(`/api/menu/${menuItemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          rating,
          comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error submitting review.');
      }

      setSuccess(true);
      setRating(0);
      setComment('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl p-6 bg-white rounded-md">
      <h2 className="text-xl font-semibold mb-4">Leave a Rating and Comment</h2>
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                className="hidden"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={ratingValue <= (hover || rating) ? 'yellow' : 'gray'}
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8 cursor-pointer transition duration-200"
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="0.5"
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
            </label>
          );
        })}
      </div>
      <textarea
        className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">Review successfully submitted!</p>}
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Review'}
      </button>
    </div>
  );
};

export default Rating;
