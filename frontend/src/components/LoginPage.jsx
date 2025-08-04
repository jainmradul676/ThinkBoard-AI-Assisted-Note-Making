import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, BookOpen } from 'lucide-react';

const LoginPage = () => {
  const { login, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary rounded-full flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white">
            Welcome to ThinkBoard
          </h2>
          <p className="mt-2 text-gray-400">
            Your intelligent note-taking companion
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <button
              onClick={login}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Sign in with Google
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              By signing in, you agree to our terms of service and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 