import Link from 'next/link';
import { query } from '@/lib/supabase';

async function getReviews() {
  try {
    const result = await query('review.getAll');
    return result.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

export default async function ReviewList() {
  const reviews = await getReviews();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-blue-500 hover:underline">
            Home
          </Link>
          <h1 className="text-3xl font-bold">리뷰</h1>
        </div>
        <Link href="/review/write" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          새 리뷰 작성
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map(review => (
          <Link href={`/review/${review.id}`} key={review.id}>
            <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{review.title}</h2>
              <p className="text-gray-600 mb-2">{review.product_name}</p>
              <p className="text-sm text-gray-500">
                {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 