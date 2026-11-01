import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F6F2] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white border border-[#E1E5E2] rounded-xl p-8 shadow-xs space-y-4">
        <span className="text-4xl font-black font-tabular text-[#387A70]">404</span>
        <h1 className="text-lg font-bold text-[#182B32]">Page Not Found</h1>
        <p className="text-xs text-[#697780] leading-relaxed">
          The requested campus placement portal route does not exist or has been relocated by system administration.
        </p>

        <div className="pt-4 flex justify-center gap-3">
          <Link
            to="/"
            className="px-4 py-2 bg-[#387A70] hover:bg-[#2D635B] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Go to Portal Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
