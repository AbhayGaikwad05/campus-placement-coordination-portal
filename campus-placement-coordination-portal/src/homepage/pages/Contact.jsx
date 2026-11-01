import React, { useState } from 'react';
import HomeNavbar from '../components/HomeNavbar';
import HomeFooter from '../components/HomeFooter';
import Button from '../../shared/components/Button';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: 'Campus Recruitment Drive Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <HomeNavbar />

      <div className="bg-[#17365D] text-white py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-black">Contact CRPC Directorate</h1>
        <p className="text-xs text-slate-300 mt-2">
          Connect with MIT Academy of Engineering Corporate Relations & Placement Cell.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Details */}
          <div className="space-y-6">
            <div className="bg-white border border-[#E0E6ED] rounded-xl p-6 shadow-xs">
              <h3 className="text-base font-bold text-[#172B45] mb-4">Cell Office Coordinates</h3>
              <div className="space-y-4 text-xs text-[#172B45]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#3478C5] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Campus Address</p>
                    <p className="text-[#64748B] mt-0.5">Corporate Relations & Placement Cell, MIT Academy of Engineering, Dehu Phata, Alandi (D), Pune - 412105, Maharashtra, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#3478C5] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Official Correspondence</p>
                    <p className="text-[#64748B] mt-0.5">crpc@mitaoe.ac.in · placements@mitaoe.ac.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#3478C5] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Direct Phone Lines</p>
                    <p className="text-[#64748B] mt-0.5">+91 (020) 30253500 / 30253700</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#E7EDF5] border border-[#17365D]/15 rounded-xl p-6">
              <h4 className="text-xs font-bold text-[#17365D] uppercase tracking-wider mb-2">Corporate Invitation Season</h4>
              <p className="text-xs text-[#172B45] leading-relaxed">
                Recruiters interested in scheduling on-campus, hybrid, or virtual recruitment drives for the 2026 Graduating Batch may write directly to our Dean or register online.
              </p>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="bg-white border border-[#E0E6ED] rounded-xl p-6 sm:p-8 shadow-xs">
            <h3 className="text-base font-bold text-[#172B45] mb-4">Send an Official Inquiry</h3>

            {submitted ? (
              <div className="p-6 bg-[#E8F5EE] border border-[#287449]/20 rounded-xl text-center">
                <CheckCircle2 className="w-8 h-8 text-[#287449] mx-auto mb-2" />
                <h4 className="text-sm font-bold text-[#172B45]">Inquiry Registered</h4>
                <p className="text-xs text-[#64748B] mt-1">
                  Thank you for reaching out. The CRPC Placement Directorate will review your communication and respond within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#172B45] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Joshi"
                    className="w-full text-xs px-3.5 py-2.5 border border-[#E0E6ED] rounded-lg focus:outline-none focus:border-[#3478C5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172B45] mb-1">Corporate / Official Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. ramesh@company.com"
                    className="w-full text-xs px-3.5 py-2.5 border border-[#E0E6ED] rounded-lg focus:outline-none focus:border-[#3478C5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172B45] mb-1">Organization / Department</label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={e => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Infosys Ltd / Department Coordinator"
                    className="w-full text-xs px-3.5 py-2.5 border border-[#E0E6ED] rounded-lg focus:outline-none focus:border-[#3478C5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172B45] mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Details about recruitment drive slots, roles, or queries..."
                    className="w-full text-xs px-3.5 py-2.5 border border-[#E0E6ED] rounded-lg focus:outline-none focus:border-[#3478C5]"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  icon={Send}
                  iconPosition="right"
                >
                  Submit Inquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      <HomeFooter />
    </div>
  );
};

export default Contact;
