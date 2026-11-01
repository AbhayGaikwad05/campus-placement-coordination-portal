import React from 'react';
import { Link } from 'react-router-dom';
import HomeNavbar from '../components/HomeNavbar';
import HomeFooter from '../components/HomeFooter';
import { Building2, Award, Users, BookOpen, Target, CheckCircle2 } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <HomeNavbar />

      <div className="bg-[#17365D] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E0B66D] bg-white/10 px-3 py-1 rounded-full border border-white/20">
            Institutional Legacy & Leadership
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-3">About CRPC Directorate</h1>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl mx-auto">
            Corporate Relations and Placement Cell at MIT Academy of Engineering, Pune.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        {/* Dean's Message */}
        <div className="bg-white border border-[#E0E6ED] rounded-xl p-6 sm:p-8 shadow-xs mb-8">
          <h2 className="text-lg font-bold text-[#172B45] mb-2">Director's Welcome Message</h2>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-4">
            "At MIT Academy of Engineering, our Corporate Relations & Placement Cell bridges academic excellence with industry innovation. Our mission is to ensure every graduate is industry-ready, possessing robust technical competencies, ethical problem-solving capabilities, and adaptability in fast-evolving global engineering domains."
          </p>
          <div className="border-t border-[#E0E6ED] pt-3 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-[#172B45]">Dr. Rajesh Kulkarni</p>
              <p className="text-[#64748B]">Dean, Corporate Relations & Placement Cell</p>
            </div>
            <span className="text-[11px] text-[#3478C5] font-semibold">MIT Academy of Engineering</span>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs">
            <Target className="w-8 h-8 text-[#17365D] mb-3" />
            <h3 className="text-sm font-bold text-[#172B45] mb-1">Our Vision</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              To be a globally recognized center of excellence in university-industry collaborations, achieving 100% meaningful career placements.
            </p>
          </div>

          <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs">
            <BookOpen className="w-8 h-8 text-[#17365D] mb-3" />
            <h3 className="text-sm font-bold text-[#172B45] mb-1">Skill Development</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Year-round technical aptitude bootcamps, mock coding assessments, and technical interview workshops led by industry veterans.
            </p>
          </div>

          <div className="bg-white border border-[#E0E6ED] rounded-xl p-5 shadow-xs">
            <Award className="w-8 h-8 text-[#17365D] mb-3" />
            <h3 className="text-sm font-bold text-[#172B45] mb-1">Equitable Access</h3>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Institutional policy safeguards, single offer rules, and dream/super-dream categories guarantee merit-based opportunity distribution.
            </p>
          </div>
        </div>
      </div>

      <HomeFooter />
    </div>
  );
};

export default About;
