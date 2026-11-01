import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] py-12 px-4 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white border border-[#E1E5E2] rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E1E5E2]">
          <div className="p-2.5 rounded-lg bg-[#E5EEE8] text-[#387A70]">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#182B32]">
              Password Recovery
            </h1>
            <p className="text-xs text-[#697780]">
              Campus Placement Coordination Portal
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="space-y-4 text-xs text-center py-4">
            <div className="w-12 h-12 rounded-full bg-[#DCFCE7] text-[#2E7D32] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-sm font-bold text-[#182B32]">Recovery Link Dispatched</h2>
            <p className="text-[#697780] leading-relaxed">
              In this frontend simulation, password reset instructions have been generated for <strong>{email}</strong>. You may sign in immediately using any sample credentials.
            </p>
            <div className="pt-4">
              <Link
                to="/login"
                className="px-4 py-2 bg-[#387A70] text-white text-xs font-semibold rounded-md shadow-xs hover:bg-[#2D635B] transition-colors inline-block"
              >
                Return to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <p className="text-[#697780] leading-relaxed">
              Enter your registered institutional email address. You will receive an official password recovery authorization token.
            </p>

            <div>
              <label className="block font-semibold text-[#182B32] mb-1">
                Institutional Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="aarav.sharma@mitaoe.ac.in"
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md focus:bg-white focus:outline-hidden focus:border-[#387A70]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#387A70] hover:bg-[#2D635B] text-white font-semibold rounded-md shadow-xs transition-colors"
            >
              Request Password Reset Token
            </button>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="text-[#387A70] font-semibold hover:underline inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
