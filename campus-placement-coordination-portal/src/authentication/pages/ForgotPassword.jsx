import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import '../styles/auth.css';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="auth-page-container">
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between pb-3 border-b border-[#E0E6ED]">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/brand/mitaoe-logo.jpg"
            alt="MITAOE"
            className="w-10 h-10 object-contain rounded-md"
            onError={(e) => {
              e.currentTarget.src = '/images/mitaoe-logo.jpg';
            }}
          />
          <div>
            <h2 className="text-sm font-bold text-[#172B45]">MIT Academy of Engineering</h2>
            <p className="text-[11px] text-[#64748B]">Corporate Relations & Placement Cell</p>
          </div>
        </Link>
        <Link to="/login" className="text-xs font-semibold text-[#17365D] hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </Link>
      </header>

      <div className="auth-card-container">
        <div className="bg-white rounded-2xl border border-[#E0E6ED] shadow-xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#E7EDF5] text-[#17365D] flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-extrabold text-[#172B45]">Password Recovery</h1>
            <p className="text-xs text-[#64748B] mt-1 max-w-xs mx-auto">
              Enter your registered institutional or corporate email address to receive password reset instructions.
            </p>
          </div>

          {submitted ? (
            <div className="p-4 rounded-xl bg-[#E8F5EE] border border-[#287449]/20 text-center">
              <CheckCircle2 className="w-8 h-8 text-[#287449] mx-auto mb-2" />
              <h3 className="text-sm font-bold text-[#172B45]">Recovery Link Dispatched</h3>
              <p className="text-xs text-[#64748B] mt-1">
                If an account exists for <span className="font-bold text-[#172B45]">{email}</span>, password reset credentials have been delivered to your inbox.
              </p>
              <Link
                to="/login"
                className="mt-4 inline-block px-4 py-2 bg-[#17365D] text-white text-xs font-bold rounded-lg hover:bg-[#254E7A] transition-colors"
              >
                Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#172B45] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. student@mitaoe.ac.in"
                    required
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 bg-slate-50 border border-[#E0E6ED] rounded-lg text-[#172B45] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#3478C5] focus:ring-2 focus:ring-[#3478C5]/20 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-white text-xs font-bold rounded-lg shadow-sm bg-[#17365D] hover:bg-[#254E7A] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Send Reset Link</span>
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-[#E0E6ED] text-center text-xs text-[#64748B]">
            <span>Need institutional assistance? Contact </span>
            <a href="mailto:crpc@mitaoe.ac.in" className="text-[#3478C5] font-semibold hover:underline">
              crpc@mitaoe.ac.in
            </a>
          </div>
        </div>
      </div>

      <footer className="max-w-5xl w-full mx-auto pt-4 border-t border-[#E0E6ED] text-center text-xs text-[#64748B]">
        <p>© 2026 MIT Academy of Engineering, Pune. Corporate Relations & Placement Cell.</p>
      </footer>
    </div>
  );
};

export default ForgotPassword;
