'use client';

import { useEffect, useState } from 'react';
import { query } from '@/lib/supabase';

export default function EditorApproval() {
  const [pendingEditors, setPendingEditors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingEditors = async () => {
      try {
        const response = await fetch('/api/admin/editors');
        const data = await response.json();
        setPendingEditors(data);
      } catch (error) {
        console.error('Error fetching pending editors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingEditors();
  }, []);

  const handleApprove = async (userId) => {
    try {
      const response = await fetch(`/api/admin/editors/${userId}`, {
        method: 'POST'
      });

      if (response.ok) {
        setPendingEditors(editors => editors.filter(editor => editor.id !== userId));
      } else {
        throw new Error('Failed to approve editor');
      }
    } catch (error) {
      console.error('Error approving editor:', error);
      alert('에디터 승인에 실패했습니다.');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">에디터 승인 관리</h1>

      {pendingEditors.length === 0 ? (
        <p className="text-gray-600">대기 중인 에디터 신청이 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {pendingEditors.map(editor => (
            <div key={editor.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{editor.name}</h3>
                  <p className="text-gray-600">{editor.email}</p>
                </div>
                <button
                  onClick={() => handleApprove(editor.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  승인
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 