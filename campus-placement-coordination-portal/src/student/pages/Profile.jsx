import React, { useState, useRef } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import StatusBadge from '../../shared/components/StatusBadge';
import Modal from '../../shared/components/Modal';
import { calculateProfileCompleteness } from '../../utils/rules';
import {
  GraduationCap,
  Briefcase,
  Code,
  FileText,
  FolderCheck,
  Eye,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileCode,
  UploadCloud,
  Check,
  Settings,
  User,
  Camera,
  MapPin,
  Phone,
  Mail,
  Calendar,
  HeartPulse,
  Home,
  Upload
} from 'lucide-react';

export const StudentPortfolio = () => {
  const { studentProfile, updateStudentProfile, showToast } = usePlacement();

  const [activeTab, setActiveTab] = useState('personal');

  const photoInputRef = useRef(null);

  // Working state copied from context
  const [profile, setProfile] = useState(() => {
    return studentProfile || {
      id: 'std_01',
      studentId: 'MIT2022CS042',
      userId: 'user_student_1',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@mitaoe.ac.in',
      personalEmail: 'aarav.sharma.dev@gmail.com',
      phone: '+91 98230 44120',
      alternatePhone: '+91 98230 44129',
      photoUrl: undefined,
      gender: 'MALE',
      dateOfBirth: '2004-05-14',
      bloodGroup: 'B+',
      category: 'General (Open)',
      nationality: 'Indian',
      currentAddress: 'Room 214, MITAOE Boys Hostel, Alandi Road',
      permanentAddress: 'Flat 402, Royal Palms, Baner Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '412105',
      emergencyContact: {
        name: 'Sunil Sharma',
        relation: 'Father',
        phone: '+91 98230 11000'
      },
      department: 'Computer Science and Engineering',
      degree: 'B.Tech',
      graduationBatch: 2026,
      cgpa: 8.85,
      tenthPercentage: 92.4,
      tenthBoard: 'CBSE',
      twelfthPercentage: 89.2,
      twelfthBoard: 'Maharashtra State Board',
      activeBacklogs: 0,
      historicalBacklogs: 0,
      isDocumentVerified: true,
      placementStatus: 'SEEKING',
      semesters: [
        { semester: 1, sgpa: 8.6, creditsEarned: 22, marksheetDocName: 'Sem1.pdf', verificationStatus: 'VERIFIED' },
        { semester: 2, sgpa: 8.9, creditsEarned: 22, marksheetDocName: 'Sem2.pdf', verificationStatus: 'VERIFIED' },
        { semester: 3, sgpa: 8.7, creditsEarned: 24, marksheetDocName: 'Sem3.pdf', verificationStatus: 'VERIFIED' },
        { semester: 4, sgpa: 9.1, creditsEarned: 24, marksheetDocName: 'Sem4.pdf', verificationStatus: 'VERIFIED' },
        { semester: 5, sgpa: 8.9, creditsEarned: 22, marksheetDocName: 'Sem5.pdf', verificationStatus: 'VERIFIED' },
        { semester: 6, sgpa: 8.9, creditsEarned: 22, marksheetDocName: 'Sem6.pdf', verificationStatus: 'VERIFIED' }
      ],
      skills: ['TypeScript', 'React.js', 'Node.js', 'Python', 'PostgreSQL', 'Docker'],
      projects: [],
      internships: [],
      certifications: [],
      achievements: [],
      codingProfiles: [],
      resumes: [],
      documents: [],
      preferences: {
        preferredRoles: ['Software Engineer', 'Full Stack Developer'],
        preferredLocations: ['Pune', 'Bengaluru'],
        expectedCtcMin: 12.0
      },
      visibilitySettings: {
        visibleToAllRecruiters: true,
        showPhoneToRecruiters: true,
        showAcademicPercentages: true
      },
      bookmarkedDriveIds: []
    };
  });

  // Modal states for adding items
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [newProject, setNewProject] = useState<Partial<ProjectItem>>({
    title: '',
    technologies: [],
    description: '',
    repoUrl: '',
    liveUrl: ''
  });
  const [techInput, setTechInput] = useState('');

  const [internshipModalOpen, setInternshipModalOpen] = useState(false);
  const [newInternship, setNewInternship] = useState<Partial<InternshipItem>>({
    company: '',
    role: '',
    location: '',
    duration: '',
    description: ''
  });

  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState('');
  const [newResumeRole, setNewResumeRole] = useState('');

  const [skillInput, setSkillInput] = useState('');

  const completeness = calculateProfileCompleteness({
    hasPersonalInfo: Boolean(profile.name && profile.email && profile.phone),
    hasAcademicInfo: Boolean(profile.department && profile.cgpa),
    hasMarksheets: Boolean(profile.documents.some(d => d.type === 'MARKSHEET' && d.verificationStatus === 'VERIFIED')),
    hasResume: Boolean(profile.resumes.length > 0),
    skillsCount: profile.skills.length,
    projectsCount: profile.projects.length,
    hasCodingProfiles: Boolean(profile.codingProfiles.length > 0),
    hasCertifications: Boolean(profile.certifications.length > 0)
  });

  const handleSaveProfile = () => {
    updateStudentProfile(profile);
  };

  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    if (profile.skills.includes(skillInput.trim())) return;
    const updated = { ...profile, skills: [...profile.skills, skillInput.trim()] };
    setProfile(updated);
    updateStudentProfile(updated);
    setSkillInput('');
  };

  const handleRemoveSkill = (skill) => {
    const updated = { ...profile, skills: profile.skills.filter(s => s !== skill) };
    setProfile(updated);
    updateStudentProfile(updated);
  };

  const handleSaveProject = () => {
    if (!newProject.title?.trim()) return;
    const project = {
      id: `proj_${Date.now()}`,
      title: newProject.title,
      technologies: techInput ? techInput.split(',').map(t => t.trim()) : ['React', 'Node.js'],
      description: newProject.description || '',
      repoUrl: newProject.repoUrl,
      liveUrl: newProject.liveUrl
    };
    const updated = { ...profile, projects: [...profile.projects, project] };
    setProfile(updated);
    updateStudentProfile(updated);
    setProjectModalOpen(false);
    setNewProject({});
    setTechInput('');
  };

  const handleDeleteProject = (id) => {
    const updated = { ...profile, projects: profile.projects.filter(p => p.id !== id) };
    setProfile(updated);
    updateStudentProfile(updated);
  };

  const handleSaveInternship = () => {
    if (!newInternship.company?.trim()) return;
    const item = {
      id: `intern_${Date.now()}`,
      company: newInternship.company,
      role: newInternship.role || 'Software Engineering Intern',
      location: newInternship.location || 'Pune',
      duration: newInternship.duration || '2 Months',
      description: newInternship.description || ''
    };
    const updated = { ...profile, internships: [...profile.internships, item] };
    setProfile(updated);
    updateStudentProfile(updated);
    setInternshipModalOpen(false);
    setNewInternship({});
  };

  const handleSaveResume = () => {
    if (!newResumeTitle.trim()) return;
    const fileName = `${newResumeTitle.replace(/\s+/g, '_')}.pdf`;
    const newVersion = {
      id: `res_${Date.now()}`,
      title: newResumeTitle,
      fileName,
      uploadedAt: new Date().toISOString().split('T')[0],
      isDefault: profile.resumes.length === 0,
      targetRole: newResumeRole || 'Software Development Engineer'
    };
    const updated = { ...profile, resumes: [...profile.resumes, newVersion] };
    setProfile(updated);
    updateStudentProfile(updated);
    setResumeModalOpen(false);
    setNewResumeTitle('');
    setNewResumeRole('');
  };

  const handleSetDefaultResume = (resId) => {
    const updatedResumes = profile.resumes.map(r => ({
      ...r,
      isDefault: r.id === resId
    }));
    const updated = { ...profile, resumes: updatedResumes };
    setProfile(updated);
    updateStudentProfile(updated);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validFormats.includes(file.type.toLowerCase())) {
      showToast({
        type: 'warning',
        title: 'Unsupported Format',
        message: 'Please select a valid image file (JPG, JPEG, PNG, or WebP).'
      });
      return;
    }

    // Validate file size (max 3MB)
    if (file.size > 3 * 1024 * 1024) {
      showToast({ type: 'warning', title: 'File Too Large', message: 'Please select an image smaller than 3 MB.' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      const updated = { ...profile, photoUrl: dataUrl };
      setProfile(updated);
      updateStudentProfile(updated);
      showToast({ type: 'success', title: 'Photograph Updated', message: 'Your profile photo has been updated.' });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Hidden file input for photo upload */}
      <input
        type="file"
        ref={photoInputRef}
        onChange={handlePhotoUpload}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
      />

      {/* Portfolio Header Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="relative group shrink-0">
              {profile.photoUrl ? (
                <img
                  src={profile.photoUrl}
                  alt={profile.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-4 ring-[#EFF5FF] shadow-xs border border-slate-200"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 text-slate-500 flex flex-col items-center justify-center text-xs font-bold shrink-0 ring-4 ring-[#EFF5FF] shadow-xs">
                  <User className="w-6 h-6 text-slate-400" />
                  <span className="text-[10px] text-slate-600 mt-0.5">
                    {profile.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </span>
                </div>
              )}
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                title="Upload or change photograph"
                className="absolute -bottom-1 -right-1 p-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-[#3974C6] shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">{profile.name}</h1>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {profile.degree} in {profile.department} · Batch of {profile.graduationBatch}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                <span>PRN: <strong className="text-slate-900 font-mono font-bold">{profile.studentId}</strong></span>
                <span>·</span>
                <span>Email: <strong className="text-slate-900 font-medium">{profile.email}</strong></span>
                <span>·</span>
                <span>CGPA: <strong className="text-[#3974C6] font-bold font-tabular">{profile.cgpa.toFixed(2)}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <button
              onClick={handleSaveProfile}
              className="px-5 py-2.5 bg-[#3974C6] hover:bg-[#2d60a6] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Completeness bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-800">Profile Completeness:</span>
            <div className="w-44 bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#3974C6] to-cyan-500 h-full rounded-full transition-all duration-300" style={{ width: `${completeness.percentage}%` }} />
            </div>
            <span className="font-extrabold text-[#3974C6] font-tabular">{completeness.percentage}%</span>
          </div>
          <span className="text-slate-400 font-medium">
            Verified documents count toward company shortlisting eligibility
          </span>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-1.5 p-1.5 bg-white border border-slate-200/90 rounded-2xl shadow-2xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('personal')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === 'personal' ? 'bg-[#3974C6] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Personal Details</span>
        </button>

        <button
          onClick={() => setActiveTab('academic')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === 'academic' ? 'bg-[#3974C6] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Academic & Marks</span>
        </button>

        <button
          onClick={() => setActiveTab('skills_projects')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === 'skills_projects' ? 'bg-[#3974C6] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>Skills & Projects ({profile.projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('experience')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === 'experience' ? 'bg-[#3974C6] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Work & Experience ({profile.internships.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('resumes_docs')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === 'resumes_docs' ? 'bg-[#3974C6] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Resumes & Documents ({profile.resumes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeTab === 'preferences' ? 'bg-[#3974C6] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Preferences & Visibility</span>
        </button>
      </div>

      {/* Tab 0: Personal Information */}
      {activeTab === 'personal' && (
        <div className="space-y-6">
          {/* Profile Photograph */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#3974C6]" />
                  Profile Photograph
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Your formal photograph is displayed on your verified resume snapshot and company interview rosters.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  className="px-3.5 py-2 bg-[#3974C6] hover:bg-[#2d60a6] text-white text-xs font-bold rounded-xl shadow-2xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{profile.photoUrl ? 'Change Photograph' : 'Upload Photograph'}</span>
                </button>
                {profile.photoUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...profile, photoUrl: undefined };
                      setProfile(updated);
                      updateStudentProfile(updated);
                      showToast({ type: 'info', title: 'Photograph Removed', message: 'Reverted to neutral profile placeholder.' });
                    }}
                    className="px-3 py-2 border border-slate-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative shrink-0">
                {profile.photoUrl ? (
                  <img
                    src={profile.photoUrl}
                    alt={profile.name}
                    className="w-24 h-24 rounded-2xl object-cover ring-4 ring-[#EFF5FF] shadow-md border border-slate-200"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-slate-500 ring-4 ring-[#EFF5FF] shadow-xs">
                    <User className="w-10 h-10 text-slate-400" />
                    <span className="text-xs font-bold text-slate-600 mt-1">
                      {profile.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  title="Upload or change photograph"
                  className="absolute -bottom-1.5 -right-1.5 p-1.5 bg-white border border-slate-200 rounded-xl text-slate-700 hover:text-[#3974C6] shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <p className="text-xs font-bold text-slate-700 mb-1">
                  Professional Profile Photograph
                </p>
                <p className="text-xs text-slate-500 leading-relaxed mb-2">
                  Please upload a recent, front-facing photograph against a neutral background. This photograph will appear on institutional placement records, campus drive rosters, and verified resume portfolios.
                </p>
                <p className="text-[11px] text-slate-400">
                  Accepted formats: JPG, JPEG, PNG, WebP (Max 3MB). Professional formal photograph recommended.
                </p>
              </div>
            </div>
          </div>

          {/* Legal Identity & Biometrics */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
            <h2 className="text-sm font-extrabold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2 mb-5">
              <User className="w-4 h-4 text-[#3974C6]" />
              Legal Identity & Personal Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-[#EFF5FF] transition-all"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Permanent Student PRN / ID *
                </label>
                <input
                  type="text"
                  value={profile.studentId}
                  disabled
                  className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-mono font-medium cursor-not-allowed"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Managed by College ERP</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Date of Birth *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={profile.dateOfBirth || '2004-05-14'}
                    onChange={e => setProfile({ ...profile, dateOfBirth: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-[#EFF5FF] transition-all font-tabular"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Gender *
                </label>
                <select
                  value={profile.gender}
                  onChange={e => setProfile({ ...profile, gender: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-[#EFF5FF] transition-all"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other / Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Blood Group
                </label>
                <select
                  value={profile.bloodGroup || 'B+'}
                  onChange={e => setProfile({ ...profile, bloodGroup: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-[#EFF5FF] transition-all"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Category
                </label>
                <select
                  value={profile.category || 'General (Open)'}
                  onChange={e => setProfile({ ...profile, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-[#EFF5FF] transition-all"
                >
                  <option value="General (Open)">General (Open)</option>
                  <option value="OBC-NCL">OBC-NCL</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                  <option value="PwD">PwD</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Nationality
                </label>
                <input
                  type="text"
                  value={profile.nationality || 'Indian'}
                  onChange={e => setProfile({ ...profile, nationality: e.target.value })}
                  placeholder="e.g. Indian"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-[#EFF5FF] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Contact Details & Communications */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
            <h2 className="text-sm font-extrabold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2 mb-5">
              <Phone className="w-4 h-4 text-[#3974C6]" />
              Contact Information & Communication Channels
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Institutional Email Address *
                </label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Official college communications</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Personal / Alternate Email Address
                </label>
                <input
                  type="email"
                  value={profile.personalEmail || ''}
                  onChange={e => setProfile({ ...profile, personalEmail: e.target.value })}
                  placeholder="e.g. aarav.dev@gmail.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-[#EFF5FF] transition-all"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Primary Mobile Phone Number *
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={e => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="+91 98230 00000"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-[#EFF5FF] transition-all"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Alternate Mobile Phone Number
                </label>
                <input
                  type="tel"
                  value={profile.alternatePhone || ''}
                  onChange={e => setProfile({ ...profile, alternatePhone: e.target.value })}
                  placeholder="+91 98230 99999"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-[#EFF5FF] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
            <h2 className="text-sm font-extrabold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2 mb-5">
              <HeartPulse className="w-4 h-4 text-[#3974C6]" />
              Emergency Contact Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Contact Person Name *
                </label>
                <input
                  type="text"
                  value={profile.emergencyContact?.name || ''}
                  onChange={e => setProfile({
                    ...profile,
                    emergencyContact: {
                      name: e.target.value,
                      relation: profile.emergencyContact?.relation || 'Parent',
                      phone: profile.emergencyContact?.phone || ''
                    }
                  })}
                  placeholder="e.g. Sunil Sharma"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-[#EFF5FF] transition-all"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Relationship *
                </label>
                <select
                  value={profile.emergencyContact?.relation || 'Father'}
                  onChange={e => setProfile({
                    ...profile,
                    emergencyContact: {
                      name: profile.emergencyContact?.name || '',
                      relation: e.target.value,
                      phone: profile.emergencyContact?.phone || ''
                    }
                  })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-[#EFF5FF] transition-all"
                >
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Guardian">Guardian</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Emergency Phone Number *
                </label>
                <input
                  type="tel"
                  value={profile.emergencyContact?.phone || ''}
                  onChange={e => setProfile({
                    ...profile,
                    emergencyContact: {
                      name: profile.emergencyContact?.name || '',
                      relation: profile.emergencyContact?.relation || 'Parent',
                      phone: e.target.value
                    }
                  })}
                  placeholder="+91 98230 11000"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-[#EFF5FF] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Residential Address Details */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
              <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Home className="w-4 h-4 text-[#3974C6]" />
                Residential Addresses
              </h2>
              <button
                type="button"
                onClick={() => {
                  setProfile({
                    ...profile,
                    permanentAddress: profile.currentAddress || profile.permanentAddress
                  });
                  showToast({ type: 'info', title: 'Address Copied', message: 'Permanent address set to match current address.' });
                }}
                className="text-[11px] font-bold text-[#3974C6] hover:text-[#2d60a6] hover:underline cursor-pointer"
              >
                Copy Current to Permanent
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Current Residential / Hostel Address *
                  </label>
                  <textarea
                    rows={2}
                    value={profile.currentAddress || ''}
                    onChange={e => setProfile({ ...profile, currentAddress: e.target.value })}
                    placeholder="e.g. Room 214, MITAOE Boys Hostel, Alandi Road"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-[#EFF5FF] transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Permanent Home Address *
                  </label>
                  <textarea
                    rows={2}
                    value={profile.permanentAddress || ''}
                    onChange={e => setProfile({ ...profile, permanentAddress: e.target.value })}
                    placeholder="e.g. Flat 402, Royal Palms, Baner Road"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-[#EFF5FF] transition-all resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    City *
                  </label>
                  <input
                    type="text"
                    value={profile.city || ''}
                    onChange={e => setProfile({ ...profile, city: e.target.value })}
                    placeholder="e.g. Pune"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-[#EFF5FF] transition-all"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    State / Region *
                  </label>
                  <input
                    type="text"
                    value={profile.state || ''}
                    onChange={e => setProfile({ ...profile, state: e.target.value })}
                    placeholder="e.g. Maharashtra"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-[#EFF5FF] transition-all"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Postal Pincode *
                  </label>
                  <input
                    type="text"
                    value={profile.pincode || ''}
                    onChange={e => setProfile({ ...profile, pincode: e.target.value })}
                    placeholder="e.g. 412105"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-[#EFF5FF] transition-all font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                All personal details are encrypted and securely shared only with authorized recruiters during drive interviews.
              </span>
              <button
                type="button"
                onClick={handleSaveProfile}
                className="px-5 py-2.5 bg-[#3974C6] hover:bg-[#2d60a6] text-white font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Personal Details</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Academic & Semesters */}
      {activeTab === 'academic' && (
        <div className="space-y-6">
          {/* Key Academic Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-[#E1E5E2] rounded-lg p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#697780]">Overall CGPA</span>
              <p className="text-2xl font-bold text-[#3974C6] font-tabular mt-1">{profile.cgpa.toFixed(2)}</p>
              <p className="text-[11px] text-[#697780] mt-1">Scale of 10.0</p>
            </div>
            <div className="bg-white border border-[#E1E5E2] rounded-lg p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#697780]">Class 10th (SSC)</span>
              <p className="text-2xl font-bold text-[#182B32] font-tabular mt-1">{profile.tenthPercentage}%</p>
              <p className="text-[11px] text-[#697780] mt-1">{profile.tenthBoard}</p>
            </div>
            <div className="bg-white border border-[#E1E5E2] rounded-lg p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#697780]">Class 12th (HSC)</span>
              <p className="text-2xl font-bold text-[#182B32] font-tabular mt-1">{profile.twelfthPercentage}%</p>
              <p className="text-[11px] text-[#697780] mt-1">{profile.twelfthBoard}</p>
            </div>
            <div className="bg-white border border-[#E1E5E2] rounded-lg p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#697780]">Active Backlogs</span>
              <p className={`text-2xl font-bold font-tabular mt-1 ${profile.activeBacklogs === 0 ? 'text-[#2E7D32]' : 'text-[#B94C45]'}`}>
                {profile.activeBacklogs}
              </p>
              <p className="text-[11px] text-[#697780] mt-1">Historical: {profile.historicalBacklogs}</p>
            </div>
          </div>

          {/* Semester-wise breakdown */}
          <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#182B32]">Semester-wise Performance & Marksheets</h3>
                <p className="text-xs text-[#697780]">Official grade cards submitted for Department Coordinator verification</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#182B32]">
                <thead className="bg-[#F0EFEA] text-[#697780] font-semibold border-b border-[#E1E5E2] text-[11px]">
                  <tr>
                    <th className="px-4 py-2.5">Semester</th>
                    <th className="px-4 py-2.5">SGPA</th>
                    <th className="px-4 py-2.5">Credits Earned</th>
                    <th className="px-4 py-2.5">Attached Marksheet</th>
                    <th className="px-4 py-2.5">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E1E5E2]">
                  {profile.semesters.map(sem => (
                    <tr key={sem.semester} className="hover:bg-[#F7F6F2]">
                      <td className="px-4 py-3 font-semibold">Semester {sem.semester}</td>
                      <td className="px-4 py-3 font-tabular font-bold text-[#182B32]">{sem.sgpa.toFixed(2)}</td>
                      <td className="px-4 py-3 font-tabular">{sem.creditsEarned} Credits</td>
                      <td className="px-4 py-3">
                        <span className="text-[#3974C6] hover:underline font-mono text-[11px] cursor-pointer">
                          {sem.marksheetDocName || `Semester_${sem.semester}_Marksheet.pdf`}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={sem.verificationStatus} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Skills & Projects */}
      {activeTab === 'skills_projects' && (
        <div className="space-y-6">
          {/* Technical Skills Section */}
          <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs">
            <h3 className="text-sm font-bold text-[#182B32] mb-1">Technical Skills & Competencies</h3>
            <p className="text-xs text-[#697780] mb-4">
              Add programming languages, frameworks, databases, and core competencies
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {profile.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#E5EEE8] text-[#182B32] text-xs font-medium border border-[#C2D6CC]"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-[#697780] hover:text-[#B94C45]"
                    title="Remove skill"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 max-w-md">
              <input
                type="text"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                placeholder="e.g. Next.js, Kubernetes, GraphQL..."
                className="flex-1 text-xs px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md focus:bg-white focus:outline-hidden focus:border-[#3974C6]"
              />
              <button
                onClick={handleAddSkill}
                className="px-3 py-2 bg-[#3974C6] hover:bg-[#2d60a6] text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
              >
                Add Skill
              </button>
            </div>
          </div>

          {/* Projects Section */}
          <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#182B32]">Key Academic & Engineering Projects</h3>
                <p className="text-xs text-[#697780]">Showcase applications, systems, or research prototypes</p>
              </div>
              <button
                onClick={() => setProjectModalOpen(true)}
                className="px-3 py-1.5 bg-[#3974C6] hover:bg-[#2d60a6] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            {profile.projects.length === 0 ? (
              <p className="text-xs text-[#697780] py-6 text-center bg-[#F7F6F2] rounded-lg border border-[#E1E5E2]">
                No projects added yet. Click Add Project to showcase practical software engineering.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.projects.map(proj => (
                  <div key={proj.id} className="p-4 rounded-lg border border-[#E1E5E2] bg-[#F7F6F2] flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-[#182B32]">{proj.title}</h4>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="text-[#94A3B8] hover:text-[#B94C45] p-1"
                          title="Delete project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-[#697780] mt-1.5 leading-relaxed">{proj.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {proj.technologies.map((t, idx) => (
                          <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-white text-[#182B32] border border-[#E1E5E2]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E1E5E2] flex items-center gap-3 text-xs">
                      {proj.repoUrl && (
                        <a
                          href={proj.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#3974C6] font-semibold hover:underline flex items-center gap-1"
                        >
                          <FileCode className="w-3.5 h-3.5" />
                          <span>Code Repository</span>
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#3974C6] font-semibold hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Application</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Experience & Internships */}
      {activeTab === 'experience' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#182B32]">Industry Internships & Work Experience</h3>
                <p className="text-xs text-[#697780]">Professional roles verified by college internship coordinator</p>
              </div>
              <button
                onClick={() => setInternshipModalOpen(true)}
                className="px-3 py-1.5 bg-[#3974C6] hover:bg-[#2d60a6] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Internship</span>
              </button>
            </div>

            {profile.internships.length === 0 ? (
              <p className="text-xs text-[#697780] py-6 text-center bg-[#F7F6F2] rounded-lg border border-[#E1E5E2]">
                No internships recorded yet. Add any summer, winter, or industrial training experience.
              </p>
            ) : (
              <div className="space-y-3">
                {profile.internships.map(intern => (
                  <div key={intern.id} className="p-4 rounded-lg border border-[#E1E5E2] bg-[#F7F6F2]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-[#182B32]">{intern.role}</h4>
                        <p className="text-xs font-semibold text-[#3974C6]">{intern.company} · {intern.location}</p>
                      </div>
                      <span className="text-xs text-[#697780] font-tabular">{intern.duration}</span>
                    </div>
                    <p className="text-xs text-[#697780] mt-2 leading-relaxed">{intern.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Resumes & Documents */}
      {activeTab === 'resumes_docs' && (
        <div className="space-y-6">
          {/* Resumes */}
          <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-[#182B32]">Resume Versions</h3>
                <p className="text-xs text-[#697780]">
                  Configure role-specific resumes. When you apply to a drive, the selected resume is snapshotted.
                </p>
              </div>
              <button
                onClick={() => setResumeModalOpen(true)}
                className="px-3 py-1.5 bg-[#3974C6] hover:bg-[#2d60a6] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Upload Resume Version</span>
              </button>
            </div>

            <div className="space-y-3">
              {profile.resumes.map(res => (
                <div
                  key={res.id}
                  className={`p-3.5 rounded-lg border flex items-center justify-between gap-3 ${
                    res.isDefault ? 'bg-[#F0FDF9] border-[#99F6E4]' : 'bg-[#F7F6F2] border-[#E1E5E2]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className={`w-5 h-5 ${res.isDefault ? 'text-[#3974C6]' : 'text-[#697780]'}`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#182B32]">{res.title}</span>
                        {res.isDefault && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#3974C6] text-white">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#697780] mt-0.5">
                        Target Role: {res.targetRole || 'General SDE'} · Uploaded: {res.uploadedAt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!res.isDefault && (
                      <button
                        onClick={() => handleSetDefaultResume(res.id)}
                        className="text-xs text-[#3974C6] font-semibold hover:underline"
                      >
                        Set as Default
                      </button>
                    )}
                    <span className="text-xs font-mono text-[#697780]">{res.fileName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Documents Verification Status */}
          <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs">
            <h3 className="text-sm font-bold text-[#182B32] mb-1">Official Academic Verification Documents</h3>
            <p className="text-xs text-[#697780] mb-4">
              Scanned certificates reviewed by the Department Placement Coordinator
            </p>

            <div className="space-y-3">
              {profile.documents.map(doc => (
                <div key={doc.id} className="p-3.5 rounded-lg border border-[#E1E5E2] bg-[#F7F6F2] flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#182B32]">{doc.name}</span>
                      <StatusBadge status={doc.verificationStatus} />
                    </div>
                    <p className="text-[11px] text-[#697780] mt-0.5">
                      File: {doc.fileName} ({doc.fileSizeKb} KB)
                      {doc.verifiedBy && ` · Verified by ${doc.verifiedBy}`}
                    </p>
                    {doc.verificationComment && (
                      <p className="text-[11px] text-[#B94C45] font-medium mt-1">
                        Coordinator Note: {doc.verificationComment}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-[#697780] font-tabular">{doc.uploadedAt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Preferences & Visibility */}
      {activeTab === 'preferences' && (
        <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-[#182B32] mb-1">Career & Placement Preferences</h3>
            <p className="text-xs text-[#697780] mb-4">Help the placement cell curate relevant drives</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl text-xs">
              <div>
                <label className="block font-semibold text-[#182B32] mb-1">Minimum Expected CTC (LPA)</label>
                <input
                  type="number"
                  step="0.5"
                  value={profile.preferences.expectedCtcMin}
                  onChange={e => setProfile({
                    ...profile,
                    preferences: { ...profile.preferences, expectedCtcMin: Number(e.target.value) }
                  })}
                  className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md font-tabular"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#182B32] mb-1">Preferred Locations</label>
                <input
                  type="text"
                  value={profile.preferences.preferredLocations.join(', ')}
                  onChange={e => setProfile({
                    ...profile,
                    preferences: { ...profile.preferences, preferredLocations: e.target.value.split(',').map(s => s.trim()) }
                  })}
                  className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E1E5E2]">
            <h3 className="text-sm font-bold text-[#182B32] mb-1">Recruiter Visibility Settings</h3>
            <p className="text-xs text-[#697780] mb-4">Control what details authorized campus recruiters can view</p>

            <div className="space-y-3 text-xs max-w-xl">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.visibilitySettings.visibleToAllRecruiters}
                  onChange={e => setProfile({
                    ...profile,
                    visibilitySettings: { ...profile.visibilitySettings, visibleToAllRecruiters: e.target.checked }
                  })}
                  className="rounded text-[#3974C6]"
                />
                <span className="text-[#182B32] font-medium">Make portfolio visible in CRPC candidate search</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.visibilitySettings.showPhoneToRecruiters}
                  onChange={e => setProfile({
                    ...profile,
                    visibilitySettings: { ...profile.visibilitySettings, showPhoneToRecruiters: e.target.checked }
                  })}
                  className="rounded text-[#3974C6]"
                />
                <span className="text-[#182B32] font-medium">Allow recruiters to view direct contact phone</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.visibilitySettings.showAcademicPercentages}
                  onChange={e => setProfile({
                    ...profile,
                    visibilitySettings: { ...profile.visibilitySettings, showAcademicPercentages: e.target.checked }
                  })}
                  className="rounded text-[#3974C6]"
                />
                <span className="text-[#182B32] font-medium">Display 10th and 12th board percentages on profile card</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      <Modal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        title="Add Academic or Personal Project"
        description="Detail your project architecture and technology stack."
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Project Title *</label>
            <input
              type="text"
              value={newProject.title || ''}
              onChange={e => setNewProject({ ...newProject, title: e.target.value })}
              placeholder="e.g. Distributed Event Streamer"
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Technologies (comma separated) *</label>
            <input
              type="text"
              value={techInput}
              onChange={e => setTechInput(e.target.value)}
              placeholder="e.g. TypeScript, Docker, Redis, Kafka"
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Description & Impact</label>
            <textarea
              rows={3}
              value={newProject.description || ''}
              onChange={e => setNewProject({ ...newProject, description: e.target.value })}
              placeholder="Explain system architecture, algorithms used, and throughput or optimization metrics..."
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Repository URL</label>
            <input
              type="url"
              value={newProject.repoUrl || ''}
              onChange={e => setNewProject({ ...newProject, repoUrl: e.target.value })}
              placeholder="https://github.com/..."
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setProjectModalOpen(false)}
              className="px-3 py-1.5 border border-[#E1E5E2] rounded-md text-[#697780]"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProject}
              className="px-4 py-1.5 bg-[#3974C6] text-white font-semibold rounded-md shadow-xs"
            >
              Add Project
            </button>
          </div>
        </div>
      </Modal>

      {/* Add Internship Modal */}
      <Modal
        isOpen={internshipModalOpen}
        onClose={() => setInternshipModalOpen(false)}
        title="Record Industrial Internship Experience"
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Company / Organization *</label>
            <input
              type="text"
              value={newInternship.company || ''}
              onChange={e => setNewInternship({ ...newInternship, company: e.target.value })}
              placeholder="e.g. Persistent Systems"
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Role Title</label>
              <input
                type="text"
                value={newInternship.role || ''}
                onChange={e => setNewInternship({ ...newInternship, role: e.target.value })}
                placeholder="Software Engineering Intern"
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#182B32] mb-1">Duration</label>
              <input
                type="text"
                value={newInternship.duration || ''}
                onChange={e => setNewInternship({ ...newInternship, duration: e.target.value })}
                placeholder="June 2024 - July 2024"
                className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Responsibilities & Outcomes</label>
            <textarea
              rows={3}
              value={newInternship.description || ''}
              onChange={e => setNewInternship({ ...newInternship, description: e.target.value })}
              placeholder="Work done, modules shipped, technologies applied..."
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setInternshipModalOpen(false)}
              className="px-3 py-1.5 border border-[#E1E5E2] rounded-md text-[#697780]"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveInternship}
              className="px-4 py-1.5 bg-[#3974C6] text-white font-semibold rounded-md shadow-xs"
            >
              Save Experience
            </button>
          </div>
        </div>
      </Modal>

      {/* Upload Resume Modal */}
      <Modal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        title="Upload Resume Version"
        description="Institutional file repository with role categorization."
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Resume Version Title *</label>
            <input
              type="text"
              value={newResumeTitle}
              onChange={e => setNewResumeTitle(e.target.value)}
              placeholder="e.g. Aarav_Sharma_FullStack_2026"
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#182B32] mb-1">Target Job Role</label>
            <input
              type="text"
              value={newResumeRole}
              onChange={e => setNewResumeRole(e.target.value)}
              placeholder="e.g. Backend Engineer / Cloud Infrastructure"
              className="w-full px-3 py-2 bg-[#F7F6F2] border border-[#E1E5E2] rounded-md"
            />
          </div>

          <div className="border-2 border-dashed border-[#E1E5E2] rounded-lg p-6 text-center bg-[#F7F6F2]">
            <UploadCloud className="w-8 h-8 text-[#3974C6] mx-auto mb-2" />
            <p className="font-semibold text-[#182B32]">PDF Format Supported (Max 5 MB)</p>
            <p className="text-[11px] text-[#697780] mt-1">Portal verification will attach this version to your portfolio.</p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setResumeModalOpen(false)}
              className="px-3 py-1.5 border border-[#E1E5E2] rounded-md text-[#697780]"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveResume}
              className="px-4 py-1.5 bg-[#3974C6] text-white font-semibold rounded-md shadow-xs"
            >
              Add Resume Version
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export const Profile = StudentPortfolio;
export default Profile;
