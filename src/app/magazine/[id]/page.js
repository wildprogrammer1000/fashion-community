import { query } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

async function getMagazine(id) {
  try {
    const result = await query('magazine.getById', [id]);
    return result.data[0];
  } catch (error) {
    console.error("Error fetching magazine:", error);
    return null;
  }
}

export default async function MagazineDetail({ params }) {
  const magazine = await getMagazine(params.id);

  if (!magazine) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Magazine Not Found</h1>
          <Link href="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-500 hover:underline">
            ← Back to Home
          </Link>
        </div>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {magazine.image_url && (
            <div className="relative w-full h-96">
              <Image
                width={100}
                height={100}
                src={magazine.image_url}
                alt={magazine.title}
              />
            </div>
          )}

          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{magazine.title}</h1>

            <div className="flex items-center mb-6">
              <span className="text-gray-600">By {magazine.nickname}</span>
              <span className="mx-2">•</span>
              <span className="text-gray-500">
                {new Date(magazine.created_at).toLocaleDateString()}
              </span>
            </div>

            <div className="prose max-w-none mb-8">
              <p className="whitespace-pre-line">{magazine.content}</p>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">
                Product Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Brand</p>
                  <p className="font-medium">{magazine.brand}</p>
                </div>
                <div>
                  <p className="text-gray-600">Product Name</p>
                  <p className="font-medium">{magazine.product_name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Color</p>
                  <p className="font-medium">{magazine.color}</p>
                </div>
                <div>
                  <p className="text-gray-600">Size</p>
                  <p className="font-medium">{magazine.size}</p>
                </div>
              </div>

              {magazine.tags && (
                <div className="mt-6">
                  <p className="text-gray-600 mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {magazine.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {magazine.buy_link && (
                <div className="mt-6">
                  <a
                    href={magazine.buy_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Buy Now
                  </a>
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
