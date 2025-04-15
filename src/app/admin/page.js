import { query } from "@/lib/supabase";

async function getDashboardStats() {
  const [magazines, reviews, users] = await Promise.all([
    query("magazine.count"),
    query("review.count"),
    query("user.count"),
  ]);

  return {
    magazineCount: magazines.data[0],
    reviewCount: reviews.data[0],
    userCount: users.data[0],
  };
}

export default async function AdminDashboard() {
  const { magazineCount, reviewCount, userCount } = await getDashboardStats();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">관리자 대시보드</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">매거진</h3>
          <p className="text-3xl font-bold">{magazineCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">리뷰</h3>
          <p className="text-3xl font-bold">{reviewCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">사용자</h3>
          <p className="text-3xl font-bold">{userCount}</p>
        </div>
      </div>

      <div className="space-y-4">
        <a
          href="/admin/editors"
          className="block p-4 bg-white rounded-lg shadow hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold">에디터 승인 관리</h2>
          <p className="text-gray-600">
            대기 중인 에디터 신청을 확인하고 승인하세요.
          </p>
        </a>
      </div>
    </div>
  );
}
