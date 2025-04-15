import Link from "next/link";
import { query } from "@/lib/supabase";

async function getLatestContent() {
  try {
    const [magazines, reviews] = await Promise.all([
      query("magazine.getAll"),
      query("review.getAll"),
    ]);

    return {
      magazines: magazines?.data?.slice(0, 6) || [],
      reviews: reviews?.data?.slice(0, 6) || [],
    };
  } catch (error) {
    console.error("Error fetching content:", error);
    return {
      magazines: [],
      reviews: [],
    };
  }
}

export default async function Home() {
  const { magazines, reviews } = await getLatestContent();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Fashion Community</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Latest Magazine</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {magazines.length > 0 ? (
            magazines.map((magazine) => (
              <Link href={`/magazine/${magazine.id}`} key={magazine.id}>
                <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">
                    {magazine.title}
                  </h3>
                  <p className="text-gray-600">{magazine.nickname}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No magazines available</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Latest Review</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Link href={`/review/${review.id}`} key={review.id}>
                <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold mb-2">
                    {review.comment}
                  </h3>
                  <p className="text-gray-600">{review.user?.nickname}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No reviews available</p>
          )}
        </div>
      </section>
    </div>
  );
}
