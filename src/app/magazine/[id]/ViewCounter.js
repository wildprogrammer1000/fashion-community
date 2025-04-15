'use client';

import { useEffect, useState } from 'react';

export default function ViewCounter({ id, initialCount }) {
  const [viewCount, setViewCount] = useState(initialCount);

  useEffect(() => {
    const incrementView = async () => {
      try {
        const response = await fetch(`/api/magazine/${id}/view`, {
          method: 'POST'
        });
        const data = await response.json();
        setViewCount(data.view_count);
      } catch (error) {
        console.error('Error incrementing view count:', error);
      }
    };

    incrementView();
  }, [id]);

  return <span>조회수: {viewCount}</span>;
} 