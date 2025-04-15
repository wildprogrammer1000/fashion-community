import Link from 'next/link';
import { query } from '@/lib/supabase';

async function getMagazines() {
  try {
    const result = await query('magazine.getAll');
    return result.data;
  } catch (error) {
    console.error('Error fetching magazines:', error);
    return [];
  }
}

export default async function MagazineList() {
  const magazines = await getMagazines();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">매거진</h1>
        <Link href="/magazine/write" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          새 매거진 작성
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {magazines.map(magazine => (
          <Link href={`/magazine/${magazine.id}`} key={magazine.id}>
            <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{magazine.title}</h2>
              <p className="text-gray-600 mb-2">{magazine.user?.nickname}</p>
              <p className="text-sm text-gray-500">조회수: {magazine.view_count}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 