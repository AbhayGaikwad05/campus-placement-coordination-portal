import React, { useState, useEffect } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { mockService } from '../../services/mockService';
import {
  CheckSquare,
  Clock,
  Award,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';
import { Assessment, AssessmentQuestion, AssessmentAttempt } from '../../types';

export const PracticeTestsPage: React.FC = () => {
  const { assessments, studentProfile, showToast } = usePlacement();
  const activeStudent = studentProfile || mockService.getStudents()[0];

  const [activeTest, setActiveTest] = useState<Assessment | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(0);
  const [testResult, setTestResult] = useState<AssessmentAttempt | null>(null);
  const [startTime, setStartTime] = useState<string>('');
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!activeTest || testResult) return;
    if (timeLeftSeconds <= 0) {
      handleFinalSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [activeTest, timeLeftSeconds, testResult]);

  const handleStartTest = (test: Assessment) => {
    setActiveTest(test);
    setCurrentQIndex(0);
    setAnswers({});
    setMarkedForReview({});
    setTimeLeftSeconds(test.durationMinutes * 60);
    setStartTime(new Date().toISOString());
    setTestResult(null);
  };

  const handleSelectOption = (questionId: string, optionKey: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionKey }));
  };

  const handleToggleReview = (questionId: string) => {
    setMarkedForReview(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleFinalSubmit = () => {
    if (!activeTest) return;
    const attempt = mockService.submitAssessmentAttempt(activeTest.id, activeStudent.id, answers, startTime);
    setTestResult(attempt);
    setConfirmSubmitOpen(false);
    showToast({
      type: attempt.isQualified ? 'success' : 'info',
      title: 'Assessment Attempt Submitted',
      message: `Score: ${attempt.score}/${attempt.maxScore} (${attempt.percentage}%)`
    });
  };

  const handleExitTest = () => {
    setActiveTest(null);
    setTestResult(null);
  };

  // Practice tests vs Official recruitment assessments
  const practiceTests = assessments.filter(a => !a.isOfficial);
  const officialTests = assessments.filter(a => a.isOfficial);

  // --- Active Test Runner UI ---
  if (activeTest) {
    const currentQ = activeTest.questions[currentQIndex];
    const totalQuestions = activeTest.questions.length;
    const minutes = Math.floor(timeLeftSeconds / 60);
    const seconds = timeLeftSeconds % 60;
    const answeredCount = Object.keys(answers).length;

    // View result mode
    if (testResult) {
      return (
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Result Score Banner */}
          <div className="bg-white border border-[#E1E5E2] rounded-xl p-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E1E5E2]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#3974C6]">
                  Assessment Performance Report
                </span>
                <h1 className="text-xl font-bold text-[#182B32] mt-1">{activeTest.title}</h1>
                <p className="text-xs text-[#697780] mt-0.5">
                  Candidate: {activeStudent.name} · Submitted at {new Date(testResult.submittedAt).toLocaleTimeString()}
                </p>
              </div>

              <button
                onClick={handleExitTest}
                className="px-4 py-2 bg-[#3974C6] hover:bg-[#2d60a6] text-white text-xs font-semibold rounded-md shadow-xs transition-colors self-start sm:self-auto"
              >
                Back to Tests Dashboard
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="p-4 rounded-lg bg-[#F7F6F2] border border-[#E1E5E2]">
                <span className="text-[11px] font-bold text-[#697780] uppercase">Score Earned</span>
                <p className="text-2xl font-bold text-[#182B32] font-tabular mt-1">
                  {testResult.score} / {testResult.maxScore}
                </p>
                <p className="text-[11px] text-[#697780] mt-0.5 font-tabular">{testResult.percentage}% Accuracy</p>
              </div>

              <div className="p-4 rounded-lg bg-[#F7F6F2] border border-[#E1E5E2]">
                <span className="text-[11px] font-bold text-[#697780] uppercase">Qualification</span>
                <p className={`text-2xl font-bold mt-1 ${testResult.isQualified ? 'text-[#2E7D32]' : 'text-[#B94C45]'}`}>
                  {testResult.isQualified ? 'Qualified' : 'Not Qualified'}
                </p>
                <p className="text-[11px] text-[#697780] mt-0.5">Cut-off: {activeTest.passThresholdPercentage}%</p>
              </div>

              <div className="p-4 rounded-lg bg-[#F7F6F2] border border-[#E1E5E2]">
                <span className="text-[11px] font-bold text-[#697780] uppercase">Questions Attempted</span>
                <p className="text-2xl font-bold text-[#182B32] font-tabular mt-1">
                  {answeredCount} / {totalQuestions}
                </p>
                <p className="text-[11px] text-[#697780] mt-0.5">{totalQuestions - answeredCount} Skipped</p>
              </div>

              <div className="p-4 rounded-lg bg-[#F7F6F2] border border-[#E1E5E2]">
                <span className="text-[11px] font-bold text-[#697780] uppercase">Official Status</span>
                <p className="text-sm font-bold text-[#182B32] mt-2">
                  {activeTest.isOfficial ? 'Application Updated' : 'Practice Drill'}
                </p>
                <p className="text-[11px] text-[#697780]">Recorded in placement record</p>
              </div>
            </div>
          </div>

          {/* Solutions & Step-by-Step Explanations */}
          <div className="bg-white border border-[#E1E5E2] rounded-xl p-6 shadow-2xs space-y-6">
            <h2 className="text-base font-bold text-[#182B32] pb-3 border-b border-[#E1E5E2]">
              Question Review & Step-by-Step Solutions
            </h2>

            <div className="space-y-6">
              {activeTest.questions.map((q, idx) => {
                const userChoice = answers[q.id];
                const isCorrect = userChoice === q.correctOption;
                const isSkipped = !userChoice;

                return (
                  <div key={q.id} className="p-4 rounded-lg border border-[#E1E5E2] bg-[#F7F6F2] space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#182B32]">Question {idx + 1} ({q.topic})</span>
                      <span className={`font-semibold flex items-center gap-1 ${
                        isSkipped ? 'text-[#697780]' : isCorrect ? 'text-[#2E7D32]' : 'text-[#B94C45]'
                      }`}>
                        {isSkipped ? 'Skipped' : isCorrect ? <><CheckCircle2 className="w-3.5 h-3.5" /> Correct (+{q.marks})</> : <><XCircle className="w-3.5 h-3.5" /> Incorrect (-{q.negativeMarks || 0})</>}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-[#182B32] leading-relaxed">{q.questionText}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map(opt => {
                        const isThisUserChoice = userChoice === opt.key;
                        const isThisCorrect = q.correctOption === opt.key;
                        let optStyle = 'bg-white border-[#E1E5E2] text-[#182B32]';
                        if (isThisCorrect) optStyle = 'bg-[#DCFCE7] border-[#86EFAC] text-[#166534] font-semibold';
                        else if (isThisUserChoice && !isCorrect) optStyle = 'bg-[#FEE2E2] border-[#FCA5A5] text-[#991B1B]';

                        return (
                          <div key={opt.key} className={`p-2.5 rounded-md border flex items-center gap-2 ${optStyle}`}>
                            <span className="font-bold uppercase w-5">{opt.key}.</span>
                            <span>{opt.text}</span>
                          </div>
                        );
                      })}
                    </div>

                    {q.explanation && (
                      <div className="p-3 rounded-md bg-white border border-[#E1E5E2] text-xs text-[#697780] leading-relaxed">
                        <strong className="text-[#182B32]">Explanation: </strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    // Interactive Test In-Progress Screen
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Test Control Header */}
        <div className="bg-white border border-[#E1E5E2] rounded-xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                activeTest.isOfficial ? 'bg-[#FEE2E2] text-[#991B1B]' : 'bg-[#E5EEE8] text-[#387A70]'
              }`}>
                {activeTest.isOfficial ? 'Official Screening Test' : 'Practice Test'}
              </span>
              <h2 className="text-sm font-bold text-[#182B32]">{activeTest.title}</h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Timer */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#182B32] text-white font-mono text-xs font-bold">
              <Clock className="w-3.5 h-3.5 text-[#D5A44D]" />
              <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
            </div>

            <button
              onClick={() => setConfirmSubmitOpen(true)}
              className="px-4 py-1.5 bg-[#B94C45] hover:bg-[#991B1B] text-white font-semibold rounded-md text-xs shadow-xs transition-colors"
            >
              Submit Assessment
            </button>
          </div>
        </div>

        {/* Test Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Question Viewer (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-[#E1E5E2] rounded-xl p-6 shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E1E5E2] text-xs">
              <span className="font-bold text-[#182B32]">
                Question {currentQIndex + 1} of {totalQuestions}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[#697780]">Marks: +{currentQ.marks} | -{currentQ.negativeMarks || 0}</span>
                <button
                  onClick={() => handleToggleReview(currentQ.id)}
                  className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded border transition-colors ${
                    markedForReview[currentQ.id]
                      ? 'bg-[#FEFCE8] text-[#8C6B1F] border-[#FEF08A]'
                      : 'bg-[#F7F6F2] text-[#697780] border-[#E1E5E2]'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{markedForReview[currentQ.id] ? 'Marked for Review' : 'Mark for Review'}</span>
                </button>
              </div>
            </div>

            {/* Question Text */}
            <div className="text-sm font-semibold text-[#182B32] leading-relaxed py-2">
              {currentQ.questionText}
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map(opt => {
                const isSelected = answers[currentQ.id] === opt.key;
                return (
                  <label
                    key={opt.key}
                    onClick={() => handleSelectOption(currentQ.id, opt.key)}
                    className={`p-3.5 rounded-lg border flex items-center gap-3 cursor-pointer transition-all text-xs ${
                      isSelected
                        ? 'bg-[#EFF5FF] border-[#3974C6] text-[#182B32] font-semibold'
                        : 'bg-[#F7F6F2] border-[#E1E5E2] text-[#182B32] hover:bg-white'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      isSelected ? 'bg-[#3974C6] text-white' : 'bg-white border border-[#CBD5E1] text-[#697780]'
                    }`}>
                      {opt.key}
                    </div>
                    <span className="flex-1 leading-relaxed">{opt.text}</span>
                  </label>
                );
              })}
            </div>

            {/* Bottom Nav */}
            <div className="pt-4 border-t border-[#E1E5E2] flex items-center justify-between">
              <button
                onClick={() => setCurrentQIndex(i => Math.max(0, i - 1))}
                disabled={currentQIndex === 0}
                className="px-3 py-1.5 rounded border border-[#E1E5E2] bg-[#F7F6F2] disabled:opacity-40 text-xs font-semibold text-[#182B32] flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={() => {
                  if (currentQIndex < totalQuestions - 1) {
                    setCurrentQIndex(i => i + 1);
                  } else {
                    setConfirmSubmitOpen(true);
                  }
                }}
                className="px-4 py-1.5 bg-[#3974C6] hover:bg-[#2d60a6] text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1"
              >
                <span>{currentQIndex === totalQuestions - 1 ? 'Finish & Review' : 'Next Question'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question Palette Sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-[#182B32] uppercase tracking-wider">
              Question Palette
            </h3>

            <div className="grid grid-cols-5 gap-2">
              {activeTest.questions.map((q, idx) => {
                const isAnswered = Boolean(answers[q.id]);
                const isMarked = Boolean(markedForReview[q.id]);
                const isCurrent = idx === currentQIndex;

                let style = 'bg-[#F7F6F2] text-[#697780] border-[#E1E5E2]';
                if (isCurrent) style = 'ring-2 ring-[#387A70] border-transparent font-bold';
                if (isMarked) style = 'bg-[#FEFCE8] text-[#8C6B1F] border-[#FEF08A] font-bold';
                else if (isAnswered) style = 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC] font-bold';

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`h-9 rounded-md border text-xs font-mono transition-all ${style}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-3 border-t border-[#E1E5E2] space-y-2 text-[11px] text-[#697780]">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-[#DCFCE7] border border-[#86EFAC]" />
                <span>Attempted ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-[#FEFCE8] border border-[#FEF08A]" />
                <span>Marked for Review ({Object.values(markedForReview).filter(Boolean).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-[#F7F6F2] border border-[#E1E5E2]" />
                <span>Unattempted ({totalQuestions - answeredCount})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Submit Dialog */}
        <Modal
          isOpen={confirmSubmitOpen}
          onClose={() => setConfirmSubmitOpen(false)}
          title="Submit Assessment Attempt?"
          description="Confirm that you are ready to complete this assessment session."
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-lg bg-[#F7F6F2] border border-[#E1E5E2] space-y-1">
              <p>Total Questions: <strong>{totalQuestions}</strong></p>
              <p>Answered Questions: <strong className="text-[#2E7D32]">{answeredCount}</strong></p>
              <p>Unanswered Questions: <strong className="text-[#B94C45]">{totalQuestions - answeredCount}</strong></p>
            </div>

            <p className="text-[#697780]">
              Once submitted, your final score will be computed and recorded against your recruitment pipeline.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setConfirmSubmitOpen(false)}
                className="px-3 py-1.5 border border-[#E1E5E2] rounded-md text-[#697780]"
              >
                Return to Test
              </button>
              <button
                onClick={handleFinalSubmit}
                className="px-4 py-1.5 bg-[#B94C45] text-white font-semibold rounded-md shadow-xs"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  // --- Assessment Hub Dashboard List ---
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#182B32]">
            Assessments & Mock Test Center
          </h1>
          <p className="text-xs text-[#697780] mt-1">
            Master quantitative aptitude, logical reasoning, and take official recruitment assessments.
          </p>
        </div>
      </div>

      {/* Official Recruitment Assessments Section */}
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#B94C45]" />
            <h2 className="text-sm font-bold text-[#182B32]">
              Official Company Recruitment Assessments
            </h2>
          </div>
          <p className="text-xs text-[#697780] mt-0.5">
            Mandatory proctored screenings linked to live placement drives. Results determine shortlist progression.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {officialTests.map(test => (
            <div key={test.id} className="p-4 rounded-lg border border-[#FCA5A5] bg-[#FEF2F2] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-[#991B1B]">{test.companyName}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#B94C45] text-white">
                    Official Screening
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#182B32]">{test.title}</h3>
                <p className="text-xs text-[#697780] mt-1">{test.topic} · {test.durationMinutes} Minutes</p>
                <div className="flex items-center gap-2 text-xs text-[#697780] mt-2">
                  <span>Questions: {test.questions.length}</span>
                  <span>·</span>
                  <span>Pass Threshold: {test.passThresholdPercentage}%</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#FCA5A5]/60 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#991B1B]">Active Drive Assessment</span>
                <button
                  onClick={() => handleStartTest(test)}
                  className="px-4 py-1.5 bg-[#B94C45] hover:bg-[#991B1B] text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
                >
                  Start Assessment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Drills Section */}
      <div className="bg-white border border-[#E1E5E2] rounded-xl p-5 shadow-2xs space-y-4">
        <div>
          <h2 className="text-sm font-bold text-[#182B32]">
            Practice Tests & Aptitude Drills
          </h2>
          <p className="text-xs text-[#697780] mt-0.5">
            Self-paced practice with instant score computation, explanations, and review flags.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {practiceTests.map(test => (
            <div key={test.id} className="p-4 rounded-lg border border-[#E1E5E2] bg-[#F7F6F2] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-[#387A70]">{test.topic}</span>
                  <span className="text-[10px] font-medium text-[#697780]">{test.durationMinutes} Mins</span>
                </div>
                <h3 className="text-sm font-bold text-[#182B32]">{test.title}</h3>
                <p className="text-xs text-[#697780] mt-1 line-clamp-2">{test.instructions[0]}</p>
                <p className="text-xs text-[#697780] mt-2 font-tabular">
                  {test.questions.length} Questions · Negative marking: -1
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E1E5E2] flex items-center justify-between">
                <span className="text-xs text-[#697780]">Unlimited Practice</span>
                <button
                  onClick={() => handleStartTest(test)}
                  className="px-4 py-1.5 bg-[#3974C6] hover:bg-[#2d60a6] text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
                >
                  Begin Practice Test
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
