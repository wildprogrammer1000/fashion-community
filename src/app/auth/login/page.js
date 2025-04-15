'use client';

import { signIn } from 'next-auth/react';

export default function Login() {
  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/' });
  };

  const handleKakaoLogin = () => {
    signIn('kakao', { callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            Google로 로그인
          </button>
          <button
            onClick={handleKakaoLogin}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-400 hover:bg-yellow-500"
          >
            Kakao로 로그인
          </button>
        </div>
      </div>
    </div>
  );
} 