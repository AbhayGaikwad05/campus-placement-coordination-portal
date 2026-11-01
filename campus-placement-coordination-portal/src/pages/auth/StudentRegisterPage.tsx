import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePlacement } from '../../context/PlacementContext';
import {
  GraduationCap,
  ArrowRight,
  User,
  Camera,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Home,
  HeartPulse,
  Upload
} from 'lucide-react';
import { StudentProfile } from '../../types';
import { MitaoeLogo } from '../../components/common/MitaoeBranding';

export const StudentRegisterPage: React.FC = () => {
  const { updateStudentProfile, login, showToast, settings } = usePlacement();
  const navigate = useNavigate();
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    personalEmail: '',
    phone: '',
    alternatePhone: '',
    photoUrl: '',
    studentId: '',
    dateOfBirth: '2004-05-14',
    gender: 'MALE' as 'MALE' | 'FEMALE' | 'OTHER',
    bloodGroup: 'B+',
    category: 'General (Open)',
    nationality: 'Indian',
    currentAddress: '',
    permanentAddress: '',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '412105',
    emergencyContactName: '',
    emergencyContactRelation: 'Parent',
    emergencyContactPhone: '',
    department: 'Computer Science and Engineering',
    degree: 'B.Tech',
    graduationBatch: 2026,
    cgpa: 8.5,
    tenthPercentage: 88.0,
    twelfthPercentage: 86.0,
    password: '',
    confirmPassword: '',
    acknowledged: false
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      showToast({
        type: 'warning',
        title: 'Invalid File Type',
        message: 'Please upload a JPEG, PNG, or WebP image file.'
      });
      e.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast({
        type: 'warning',
        title: 'File Too Large',
        message: 'Please select an image smaller than 5 MB.'
      });
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, photoUrl: reader.result as string }));
      showToast({ type: 'success', title: 'Photo Uploaded', message: 'Profile photograph ready for registration.' });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showToast({ type: 'error', title: 'Password Mismatch', message: 'Passwords do not match.' });
      return;
    }

    if (!formData.acknowledged) {
      showToast({ type: 'warning', title: 'Acknowledgement Required', message: 'Please accept the institutional placement policy terms.' });
      return;
    }

    const newStudentId = `std_${Date.now()}`;
    const newProfile: StudentProfile = {
      id: newStudentId,
      studentId: formData.studentId,
      userId: `user_${newStudentId}`,
      name: formData.name,
      email: formData.email,
      personalEmail: formData.personalEmail || undefined,
      phone: formData.phone || '+91 98000 00000',
      alternatePhone: formData.alternatePhone || undefined,
      photoUrl: formData.photoUrl,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      bloodGroup: formData.bloodGroup,
      category: formData.category,
      nationality: formData.nationality,
      currentAddress: formData.currentAddress || undefined,
      permanentAddress: formData.permanentAddress || formData.currentAddress || undefined,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      emergencyContact: formData.emergencyContactName ? {
        name: formData.emergencyContactName,
        relation: formData.emergencyContactRelation,
        phone: formData.emergencyContactPhone || formData.phone
      } : undefined,
      department: formData.department,
      degree: formData.degree,
      graduationBatch: Number(formData.graduationBatch),
      cgpa: Number(formData.cgpa),
      tenthPercentage: Number(formData.tenthPercentage),
      tenthBoard: 'State Board',
      twelfthPercentage: Number(formData.twelfthPercentage),
      twelfthBoard: 'State Board',
      activeBacklogs: 0,
      historicalBacklogs: 0,
      isDocumentVerified: false,
      placementStatus: 'SEEKING',
      semesters: [
        { semester: 1, sgpa: Number(formData.cgpa), creditsEarned: 22, verificationStatus: 'PENDING' },
        { semester: 2, sgpa: Number(formData.cgpa), creditsEarned: 22, verificationStatus: 'PENDING' },
        { semester: 3, sgpa: Number(formData.cgpa), creditsEarned: 24, verificationStatus: 'PENDING' },
        { semester: 4, sgpa: Number(formData.cgpa), creditsEarned: 24, verificationStatus: 'PENDING' },
        { semester: 5, sgpa: Number(formData.cgpa), creditsEarned: 22, verificationStatus: 'PENDING' },
        { semester: 6, sgpa: Number(formData.cgpa), creditsEarned: 22, verificationStatus: 'PENDING' }
      ],
      skills: ['Problem Solving', 'Data Structures', 'Python', 'Web Development'],
      projects: [],
      internships: [],
      certifications: [],
      achievements: [],
      codingProfiles: [],
      resumes: [
        {
          id: `res_${Date.now()}`,
          title: `${formData.name.replace(/\s+/g, '_')}_Resume_v1.pdf`,
          fileName: `${formData.name.replace(/\s+/g, '_')}_Resume_v1.pdf`,
          uploadedAt: new Date().toISOString(),
          isDefault: true
        }
      ],
      documents: [],
      preferences: {
        preferredRoles: ['Software Engineer'],
        preferredLocations: ['Pune', 'Bengaluru'],
        expectedCtcMin: 7.0
      },
      visibilitySettings: {
        visibleToAllRecruiters: true,
        showPhoneToRecruiters: true,
        showAcademicPercentages: true
      },
      bookmarkedDriveIds: []
    };

    updateStudentProfile(newProfile);
    login({
      id: newProfile.userId,
      name: newProfile.name,
      email: newProfile.email,
      role: 'STUDENT',
      studentId: newProfile.id,
      department: newProfile.department
    });
    showToast({
      type: 'success',
      title: 'Registration Complete',
      message: `Welcome, ${formData.name}! Your student placement portfolio is ready.`
    });
    navigate('/student/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 flex flex-col justify-center items-center">
      {/* Top Header */}
      <div className="max-w-3xl w-full flex items-center justify-between pb-5 mb-6 border-b border-slate-200">
        <MitaoeLogo />
        <span className="text-xs font-semibold text-slate-500">
          Campus Recruitment Registration · 2026 Batch
        </span>
      </div>

      <div className="max-w-3xl w-full bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="p-2.5 rounded-xl bg-[#EFF5FF] text-[#3974C6]">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900">
              Student Profile Registration
            </h1>
            <p className="text-xs text-slate-500">
              {settings.institutionName} · Corporate Relations & Placement Cell
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          {/* Section 1: Photograph */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between mb-3">
              <label className="block font-bold text-slate-800">
                Profile Photograph
              </label>
              {formData.photoUrl && (
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, photoUrl: '' }))}
                  className="text-[11px] text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
                >
                  Remove Photograph
                </button>
              )}
            </div>
            <input
              type="file"
              ref={photoInputRef}
              onChange={handlePhotoUpload}
              accept="image/jpeg, image/png, image/webp"
              className="hidden"
            />
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative shrink-0">
                {formData.photoUrl ? (
                  <img
                    src={formData.photoUrl}
                    alt="Student Preview"
                    className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white shadow-xs border border-slate-200"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center text-slate-400 shadow-2xs">
                    <User className="w-9 h-9 text-slate-400" />
                    {formData.name.trim() && (
                      <span className="text-[10px] font-bold text-slate-500 mt-0.5">
                        {formData.name.trim().split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
                      </span>
                    )}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 p-1 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-[#3974C6] shadow-xs cursor-pointer"
                  title="Upload or change photograph"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center gap-2 mb-1.5 justify-center sm:justify-start">
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    className="px-3.5 py-1.5 bg-[#3974C6] hover:bg-[#2d60a6] text-white font-bold rounded-lg shadow-2xs flex items-center gap-1.5 cursor-pointer text-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{formData.photoUrl ? 'Change Photograph' : 'Upload Photograph'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  Accepted formats: JPG, PNG, WebP (Max 5MB). Professional formal photograph recommended.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Personal Identity */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#3974C6]" />
              1. Personal & Biometric Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Yashvardhan Kulkarni"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Permanent Student PRN / ID *</label>
                <input
                  type="text"
                  required
                  value={formData.studentId}
                  onChange={e => setFormData({ ...formData, studentId: e.target.value })}
                  placeholder="MIT2022CS088"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Date of Birth *</label>
                <input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all font-tabular"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Gender *</label>
                <select
                  value={formData.gender}
                  onChange={e => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other / Prefer not to specify</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Blood Group</label>
                <select
                  value={formData.bloodGroup}
                  onChange={e => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all"
                >
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="O+">O+</option>
                  <option value="AB+">AB+</option>
                  <option value="A-">A-</option>
                  <option value="B-">B-</option>
                  <option value="O-">O-</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all"
                >
                  <option value="General (Open)">General (Open)</option>
                  <option value="OBC-NCL">OBC-NCL</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                  <option value="PwD">PwD</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Contact & Emergency */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#3974C6]" />
              2. Contact & Emergency Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Institutional Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="student.id@mitaoe.ac.in"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Personal / Alternate Email</label>
                <input
                  type="email"
                  value={formData.personalEmail}
                  onChange={e => setFormData({ ...formData, personalEmail: e.target.value })}
                  placeholder="personal.id@gmail.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Primary Mobile Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98230 00000"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Alternate Phone</label>
                <input
                  type="tel"
                  value={formData.alternatePhone}
                  onChange={e => setFormData({ ...formData, alternatePhone: e.target.value })}
                  placeholder="+91 98230 99999"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Emergency Contact Person</label>
                <input
                  type="text"
                  value={formData.emergencyContactName}
                  onChange={e => setFormData({ ...formData, emergencyContactName: e.target.value })}
                  placeholder="Parent / Guardian Name"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Emergency Phone Number</label>
                <input
                  type="tel"
                  value={formData.emergencyContactPhone}
                  onChange={e => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                  placeholder="+91 98230 11000"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Residential Address */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-[#3974C6]" />
              3. Residential Address
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Current Residential / Hostel Address *</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.currentAddress}
                    onChange={e => setFormData({ ...formData, currentAddress: e.target.value })}
                    placeholder="e.g. Room 214, MITAOE Boys Hostel, Alandi Road"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-semibold text-slate-700">Permanent Home Address</label>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, permanentAddress: prev.currentAddress }))}
                      className="text-[10px] text-[#3974C6] font-bold hover:underline"
                    >
                      Same as current
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={formData.permanentAddress}
                    onChange={e => setFormData({ ...formData, permanentAddress: e.target.value })}
                    placeholder="e.g. Flat 402, Royal Palms, Baner Road"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Academic Credentials */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#3974C6]" />
              4. Academic Program & Clearances
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Department *</label>
                <select
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all"
                >
                  {settings.departments.map(d => (
                    <option key={d.code} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Degree Program *</label>
                <input
                  type="text"
                  value={formData.degree}
                  disabled
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Graduation Batch *</label>
                <select
                  value={formData.graduationBatch}
                  onChange={e => setFormData({ ...formData, graduationBatch: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all"
                >
                  {settings.batches.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Current Cumulative CGPA *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  required
                  value={formData.cgpa}
                  onChange={e => setFormData({ ...formData, cgpa: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all font-tabular"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">10th Std Percentage (%) *</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  required
                  value={formData.tenthPercentage}
                  onChange={e => setFormData({ ...formData, tenthPercentage: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all font-tabular"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">12th / Diploma (%) *</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  required
                  value={formData.twelfthPercentage}
                  onChange={e => setFormData({ ...formData, twelfthPercentage: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all font-tabular"
                />
              </div>
            </div>
          </div>

          {/* Section 6: Security */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              5. Portal Security Credentials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Password *</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Min 8 characters"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Confirm Password *</label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Repeat password"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Institutional Policy Undertaking */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.acknowledged}
                onChange={e => setFormData({ ...formData, acknowledged: e.target.checked })}
                className="mt-0.5 rounded text-[#3974C6] focus:ring-blue-400"
              />
              <span className="text-[11px] text-slate-600 leading-relaxed">
                I hereby declare that all academic marks, PRN records, photograph, and personal details submitted are genuine and authentic. I accept the MITAOE Corporate Relations & Placement Cell regulations, including single-offer and attendance policies.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#3974C6] hover:bg-[#2d60a6] text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Complete Registration & Launch Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Already registered on MITAOE CRPC?{' '}
          <Link to="/login" className="text-[#3974C6] font-bold hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
