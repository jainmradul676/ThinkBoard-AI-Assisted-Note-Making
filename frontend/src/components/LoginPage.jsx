import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, BookOpen } from 'lucide-react';

const LoginPage = () => {
  const { login, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 text-white">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-medium">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-md w-full mx-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg mb-6">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome to ThinkBoard
            </h2>
            <p className="text-blue-100 text-lg">
              Your intelligent note-taking companion
            </p>
          </div>

          <div className="space-y-6">
            <button
              onClick={login}
              className="group relative w-full flex justify-center items-center gap-3 py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <LogIn className="h-5 w-5" />
              Sign in with Google
            </button>

            <div className="text-center">
              <p className="text-sm text-blue-200">
                By signing in, you agree to our terms of service and privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 