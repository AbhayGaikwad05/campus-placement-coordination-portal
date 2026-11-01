import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeNavbar from '../components/HomeNavbar';
import HomeFooter from '../components/HomeFooter';
import Button from '../../shared/components/Button';
import {
  GraduationCap,
  Building,
  Briefcase,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  TrendingUp,
  FileCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  ChevronRight
} from 'lucide-react';
import '../styles/homepage.css';

export const Home = () => {
  const navigate = useNavigate();

  const handlePortalLogin = (role) => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <HomeNavbar />

      {/* Hero Section */}
      <section className="hero-banner py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="hero-pattern" />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E0B66D] bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#E0B66D]" />
            <span>Campus Placement Season 2025-2026 Phase 1 Active</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Institutional Talent Governance & Campus Recruitment Platform
          </h1>

          <p className="mt-5 text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            MIT Academy of Engineering's official centralized gateway orchestrating high-trust career pathways between premier industry leaders, students, and academic departments.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="gold"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/login')}
            >
              Access Placement Portals
            </Button>
            <Link
              to="/about"
              className="px-5 py-2.5 rounded-lg text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all"
            >
              Explore Cell Overview
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4">
              <span className="text-2xl sm:text-3xl font-black text-white block">91.4%</span>
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Eligible Placement Rate</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4">
              <span className="text-2xl sm:text-3xl font-black text-[#E0B66D] block">₹44.0 LPA</span>
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Highest Super-Dream CTC</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4">
              <span className="text-2xl sm:text-3xl font-black text-white block">280+</span>
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Corporate Recruiting Partners</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4">
              <span className="text-2xl sm:text-3xl font-black text-[#E0B66D] block">₹8.6 LPA</span>
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Average Engineering CTC</span>
            </div>
          </div>
        </div>
      </section>

      {/* About the Placement Portal */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3478C5] bg-[#E7EDF5] px-3 py-1 rounded-md">
            Enterprise Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B45] mt-3">
            Institutional Recruitment & Governance Matrix
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-2 leading-relaxed">
            Engineered specifically to manage large-scale campus recruitment operations with strict policy enforcement, verified academic transcripts, and transparent multi-stage hiring pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E0E6ED] rounded-xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#E7EDF5] text-[#17365D] flex items-center justify-center font-bold mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#172B45] mb-2">Verified Academic Transcripts</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Every semester marksheet and cumulative SGPA is digitally audited and validated by assigned Department Coordinators before drive eligibility calculations.
            </p>
          </div>

          <div className="bg-white border border-[#E0E6ED] rounded-xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#E7EDF5] text-[#17365D] flex items-center justify-center font-bold mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#172B45] mb-2">Institutional Policy Guardrails</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Strict governance of Single Offer Rules alongside Dream (₹9+ LPA) and Super-Dream (₹18+ LPA) upgrade policies ensures equitable opportunity distribution.
            </p>
          </div>

          <div className="bg-white border border-[#E0E6ED] rounded-xl p-6 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#E7EDF5] text-[#17365D] flex items-center justify-center font-bold mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#172B45] mb-2">Real-time Interview Coordination</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Structured evaluation rubrics, video link routing, and candidate status trackers streamline company rounds from online assessment to official offer letters.
            </p>
          </div>
        </div>
      </section>

      {/* 3 Main Role Portals Showcase */}
      <section id="roles" className="py-16 bg-white border-y border-[#E0E6ED] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3478C5] bg-[#E7EDF5] px-3 py-1 rounded-md">
              Three Main Access Portals
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B45] mt-3">
              Tailored Portals for Every Stakeholder
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-2">
              Consolidated into three unified gateways with internal designation and permission controls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Student Role */}
            <div className="feature-card flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#E7EDF5] text-[#17365D] flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-[#172B45]">Student Portal</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">Candidates</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  Track cumulative SGPA, upload semester marksheets, explore verified placement drives, apply with customized resume versions, and attend scheduled technical interviews.
                </p>
                <ul className="space-y-2 text-xs text-[#172B45] mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#287449]" />
                    <span>Real-time Eligibility Calculator</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#287449]" />
                    <span>Application Pipeline Tracker</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#287449]" />
                    <span>Interview & Offer Repository</span>
                  </li>
                </ul>
              </div>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate('/login')}
              >
                Access Student Portal
              </Button>
            </div>

            {/* CRPC Directorate */}
            <div className="feature-card flex flex-col justify-between border-[#3478C5]/30 ring-1 ring-[#3478C5]/20">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#17365D] text-white flex items-center justify-center mb-4 shadow-sm">
                  <Building className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-[#172B45]">CRPC Governance</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E7EDF5] text-[#17365D]">Directorate</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  Unified governance for Super Admin, Lead Placement Officers, and Department Coordinators. Review drives, manage corporate partners, and verify student records.
                </p>
                <ul className="space-y-2 text-xs text-[#172B45] mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#287449]" />
                    <span>Recruitment Drive Approvals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#287449]" />
                    <span>Department-wise Student Verification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#287449]" />
                    <span>System Policies & Institutional Reports</span>
                  </li>
                </ul>
              </div>
              <Button
                variant="primary"
                size="sm"
                fullWidth
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate('/login')}
              >
                Access CRPC Portal
              </Button>
            </div>

            {/* Company Partner */}
            <div className="feature-card flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#E7EDF5] text-[#17365D] flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-[#172B45]">Company Partner</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">Corporate</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  For Corporate Talent Recruiters and Technical Interviewers. Create recruitment drives, filter applicants, evaluate candidates via standardized rubrics, and issue campus offers.
                </p>
                <ul className="space-y-2 text-xs text-[#172B45] mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#287449]" />
                    <span>Drive Creation & CRPC Approval</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#287449]" />
                    <span>Multi-stage Candidate Pipeline</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#287449]" />
                    <span>Structured Interview Rubrics</span>
                  </li>
                </ul>
              </div>
              <Button
                variant="outline"
                size="sm"
                fullWidth
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate('/login')}
              >
                Access Company Portal
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Placement Workflow Explanation */}
      <section id="workflow" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3478C5] bg-[#E7EDF5] px-3 py-1 rounded-md">
            Seamless Lifecycle
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B45] mt-3">
            End-to-End Campus Recruitment Workflow
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-2">
            How institutional governance and corporate hiring integrate from initiation to offer letter.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs relative">
            <div className="workflow-step-pill mb-3">1</div>
            <h4 className="text-xs font-bold text-[#172B45] mb-1">Company Registration</h4>
            <p className="text-[11px] text-[#64748B]">Corporate partners register and undergo CRPC verification before posting drives.</p>
          </div>

          <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs relative">
            <div className="workflow-step-pill mb-3">2</div>
            <h4 className="text-xs font-bold text-[#172B45] mb-1">Drive Approval</h4>
            <p className="text-[11px] text-[#64748B]">CRPC audits CTC, criteria, and batch parameters before publishing drive to students.</p>
          </div>

          <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs relative">
            <div className="workflow-step-pill mb-3">3</div>
            <h4 className="text-xs font-bold text-[#172B45] mb-1">Application & Eligibility</h4>
            <p className="text-[11px] text-[#64748B]">Automated rule engine checks marksheet verification, backlogs, and branch eligibility.</p>
          </div>

          <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs relative">
            <div className="workflow-step-pill mb-3">4</div>
            <h4 className="text-xs font-bold text-[#172B45] mb-1">Assessments & Interviews</h4>
            <p className="text-[11px] text-[#64748B]">Interviewers assess candidates using standardized 5-point skill and culture rubrics.</p>
          </div>

          <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs relative">
            <div className="workflow-step-pill mb-3">5</div>
            <h4 className="text-xs font-bold text-[#172B45] mb-1">Offer Rollout & Policy</h4>
            <p className="text-[11px] text-[#64748B]">Candidates receive official offer letters under institutional single-offer regulations.</p>
          </div>
        </div>
      </section>

      {/* Prominent Recruiting Partners */}
      <section className="py-12 bg-white border-y border-[#E0E6ED] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-6">
            Trusted by World-Class Technology Leaders & Global Enterprises
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-75">
            <span className="text-base font-extrabold text-[#172B45]">Google</span>
            <span className="text-base font-extrabold text-[#172B45]">Microsoft</span>
            <span className="text-base font-extrabold text-[#172B45]">Amazon</span>
            <span className="text-base font-extrabold text-[#172B45]">Tata Consultancy Services</span>
            <span className="text-base font-extrabold text-[#172B45]">Bajaj Auto</span>
            <span className="text-base font-extrabold text-[#172B45]">ZS Associates</span>
            <span className="text-base font-extrabold text-[#172B45]">Rakuten</span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="bg-white border border-[#E0E6ED] rounded-2xl p-8 sm:p-12 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#3478C5] bg-[#E7EDF5] px-3 py-1 rounded-md">
              Placement Cell Inquiries
            </span>
            <h3 className="text-2xl font-extrabold text-[#172B45] mt-3">
              Corporate Relations & Placement Cell Office
            </h3>
            <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
              For campus drive invitations, corporate partnership proposals, or institutional credential assistance, contact our placement leadership.
            </p>

            <div className="mt-6 space-y-3 text-xs text-[#172B45]">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#3478C5]" />
                <span>MIT Academy of Engineering, Dehu Phata, Alandi, Pune - 412105</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#3478C5]" />
                <span>crpc@mitaoe.ac.in / dean.crpc@mitaoe.ac.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#3478C5]" />
                <span>+91 020 30253500 | +91 94220 11880</span>
              </div>
            </div>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E0E6ED] rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#E7EDF5] text-[#17365D] flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#172B45]">Ready to sign in?</h4>
            <p className="text-xs text-[#64748B] mt-1 max-w-xs mx-auto mb-4">
              Access the secure institutional portal tailored to your authorized role.
            </p>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={() => navigate('/login')}
            >
              Go to Portal Login Gateway
            </Button>
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
};

export default Home;
