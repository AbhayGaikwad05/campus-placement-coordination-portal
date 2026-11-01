import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { mockService } from '../../services/mockService';
import {
  Gift,
  Building2,
  FileText,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Offer } from '../../types';

export const StudentOffersPage: React.FC = () => {
  const { offers, studentProfile, respondToOffer, settings } = usePlacement();
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [decisionType, setDecisionType] = useState<'ACCEPTED' | 'DECLINED'>('ACCEPTED');
  const [decisionReason, setDecisionReason] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const activeStudent = studentProfile || mockService.getStudents()[0];
  const myOffers = offers.filter(o => o.studentId === activeStudent.id);

  const handleOpenDecision = (offer: Offer, type: 'ACCEPTED' | 'DECLINED') => {
    setSelectedOffer(offer);
    setDecisionType(type);
    setDecisionReason('');
    setModalOpen(true);
  };

  const handleConfirmDecision = () => {
    if (!selectedOffer) return;
    respondToOffer(selectedOffer.id, decisionType, decisionReason);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            Campus Placement Offers & Outcomes
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Review formal employment offers extended by recruiting companies.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={activeStudent.placementStatus} />
        </div>
      </div>

      {/* Institutional Placement Policy Callout */}
      <div className="p-4.5 rounded-2xl bg-[#EFF5FF] border border-[#BDD5F8] flex items-start gap-3.5">
        <ShieldCheck className="w-5 h-5 text-[#3974C6] shrink-0 mt-0.5" />
        <div className="text-xs text-slate-800 leading-relaxed font-medium">
          <strong className="text-[#1E40AF]">Institutional Policy Notice ({settings.institutionName}): </strong>
          Once an offer is accepted, your status is officially registered as <strong className="text-[#1E40AF]">Placed</strong>. Per single-offer policy rules, you will be exempted from basic category drives, but remain eligible for Super Dream opportunities (≥ ₹{settings.placementPolicy.superDreamThresholdCtc} LPA).
        </div>
      </div>

      {/* Offers Cards */}
      {myOffers.length === 0 ? (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center">
          <Gift className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-900">No Offers Issued Yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Once companies complete evaluation rounds and release appointment letters, they will be listed here for your formal response.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {myOffers.map(offer => {
            const isPendingDecision = offer.status === 'ISSUED';
            return (
              <div
                key={offer.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4 hover:border-[#3974C6]/60 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-[#EFF5FF] border border-[#BDD5F8] text-[#3974C6]">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">{offer.companyName}</h2>
                      <p className="text-xs text-slate-500 font-medium">{offer.jobRole} · {offer.workLocation}</p>
                    </div>
                  </div>

                  <StatusBadge status={offer.status} />
                </div>

                {/* Salary Package Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 p-4.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                  <div>
                    <span className="text-slate-500 font-medium">Total CTC Package</span>
                    <p className="text-xl font-black text-[#3974C6] font-tabular mt-0.5">₹{offer.ctcLpa} LPA</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Base Component</span>
                    <p className="text-sm font-bold text-slate-900 font-tabular mt-0.5">₹{offer.baseSalaryLpa} LPA</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Joining Date</span>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">{offer.expectedJoiningDate}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Decision Deadline</span>
                    <p className="text-sm font-bold text-rose-600 mt-0.5">{offer.acceptanceDeadline}</p>
                  </div>
                </div>

                {/* Offer Letter Metadata & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-500">
                    <FileText className="w-4 h-4 text-[#3974C6]" />
                    <span className="font-mono text-slate-700 font-semibold">{offer.offerLetterFileName}</span>
                    <span>· Issued on {offer.issuedDate}</span>
                  </div>

                  {isPendingDecision ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenDecision(offer, 'DECLINED')}
                        className="px-4 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold rounded-xl transition-colors"
                      >
                        Decline Offer
                      </button>
                      <button
                        onClick={() => handleOpenDecision(offer, 'ACCEPTED')}
                        className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold rounded-xl shadow-2xs transition-all flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept Offer</span>
                      </button>
                    </div>
                  ) : (
                    <div className="text-xs font-semibold text-slate-500">
                      Decision recorded on {offer.decisionDate || 'N/A'}: <strong className="text-slate-900">{offer.status}</strong>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Decision Modal */}
      {selectedOffer && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={`Confirm ${decisionType === 'ACCEPTED' ? 'Acceptance' : 'Decline'} of Offer`}
          description={`${selectedOffer.companyName} (${selectedOffer.ctcLpa} LPA)`}
        >
          <div className="space-y-4 text-xs">
            <div className={`p-4 rounded-xl border ${
              decisionType === 'ACCEPTED' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              <p className="leading-relaxed font-medium">
                {decisionType === 'ACCEPTED'
                  ? 'Accepting this offer registers your unique placed status with the placement cell. You agree to submit your verified graduation credentials to the employer.'
                  : 'Declining this offer will notify the recruiting company and placement coordinator so other candidates may be considered.'}
              </p>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                Reason or Remarks (Optional)
              </label>
              <textarea
                rows={2}
                value={decisionReason}
                onChange={e => setDecisionReason(e.target.value)}
                placeholder="Provide notes or feedback for CRPC records..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-[#3974C6] focus:ring-2 focus:ring-[#EFF5FF]"
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDecision}
                className={`px-5 py-2 font-bold text-white rounded-xl shadow-xs ${
                  decisionType === 'ACCEPTED' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
                }`}
              >
                Confirm {decisionType}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
