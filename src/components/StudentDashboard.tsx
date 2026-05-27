/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  User, BookOpen, FileText, CheckCircle, Clock, AlertCircle, Send, Inbox,
  Download, Award, LogOut, CheckSquare, PlusCircle, HelpCircle, Eye, Printer, Upload, X, ImageIcon
} from 'lucide-react';
import { Student, ClassType, Exam, Question, AcademicResult, Homework, LeaveRequest, Complaint, NMMSResult, Notification, SubjectMarks, OfflineExamMark, ExamSubmission, HomeworkSubmission } from '../types';
import { LanguageCode, translations } from '../utils/translations';
import { getMaharashtraGrade } from '../utils/helpers';

interface StudentDashboardProps {
  student: Student;
  language: LanguageCode;
  onLogout: () => void;
  exams: Exam[];
  homework: Homework[];
  academicResults: AcademicResult[];
  nmmsResults: NMMSResult[];
  leaveRequests: LeaveRequest[];
  complaints: Complaint[];
  notifications: Notification[];
  offlineExamMarks: OfflineExamMark[];
  examSubmissions: ExamSubmission[];
  homeworkSubmissions: HomeworkSubmission[];
  
  // State update handlers to bubble up database changes
  onAddLeaveRequest: (req: Omit<LeaveRequest, 'id' | 'studentId' | 'studentNameMar' | 'studentRoll' | 'className'>) => void;
  onAddComplaint: (subject: string, desc: string) => void;
  onSubmitHomework: (hwId: string, text: string, fileUrl?: string) => void;
  onSubmitExam: (examId: string, answers: Record<string, string>, studentId: string) => void;
}

export default function StudentDashboard({
  student, language, onLogout, exams, homework, academicResults, nmmsResults, leaveRequests, complaints, notifications, offlineExamMarks,
  examSubmissions, homeworkSubmissions,
  onAddLeaveRequest, onAddComplaint, onSubmitHomework, onSubmitExam
}: StudentDashboardProps) {
  
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'profile' | 'exams' | 'homework' | 'leave' | 'complaints' | 'nmms' | 'offlineMarks'>('profile');
  
  // Exam states
  const [examPassword, setExamPassword] = useState('');
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [examStarted, setExamStarted] = useState(false);
  const [examAnswers, setExamAnswers] = useState<Record<string, string>>({});
  const [examTimeRemaining, setExamTimeRemaining] = useState(0);
  const [examError, setExamError] = useState('');
  const [showFinishedScoreCard, setShowFinishedScoreCard] = useState<any | null>(null);
  const [expandedSubmissionId, setExpandedSubmissionId] = useState<string | null>(null);

  // Leave Form States
  const [leaveFrom, setLeaveFrom] = useState('');
  const [leaveTo, setLeaveTo] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveSuccess, setLeaveSuccess] = useState('');

  // Complaint States
  const [complaintSubject, setComplaintSubject] = useState('');
  const [complaintDesc, setComplaintDesc] = useState('');
  const [complaintSuccess, setComplaintSuccess] = useState('');

  // Homework draft inputs & uploaded photo drafts
  const [hwDrafts, setHwDrafts] = useState<Record<string, { text: string; imageUrl?: string }>>({});

  // Get student specific data
  const studentResults = academicResults.find(r => r.studentId === student.id);
  const studentNMMS = nmmsResults.find(n => n.studentId === student.id);
  const studentLeaves = leaveRequests.filter(l => l.studentId === student.id);
  const studentComplaints = complaints.filter(c => c.studentId === student.id);
  const gradeExams = exams.filter(e => e.className === student.class && e.isActive);
  const gradeHomework = homework.filter(h => h.className === student.class);

  // Countdown timer for exam
  useEffect(() => {
    if (!examStarted || examTimeRemaining <= 0) {
      if (examStarted && examTimeRemaining === 0) {
        handleAutoSubmitExam();
      }
      return;
    }
    const timer = setTimeout(() => {
       setExamTimeRemaining(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [examStarted, examTimeRemaining]);

  const handleStartExam = (exam: Exam) => {
    if (examPassword === exam.passwordHash) {
      setSelectedExam(exam);
      setExamStarted(true);
      setExamTimeRemaining(exam.durationMinutes * 60);
      setExamAnswers({});
      setExamError('');
    } else {
      setExamError(language === 'mr' ? 'चुकीचा परीक्षा पासवर्ड! कृपया पुन्हा प्रयत्न करा.' : 'Incorrect exam password! Please retry.');
    }
  };

  const handleAutoSubmitExam = () => {
    if (!selectedExam) return;
    submitAnswers();
  };

  const submitAnswers = () => {
    if (!selectedExam) return;
    onSubmitExam(selectedExam.id, examAnswers, student.id);
    
    // Auto calculate score for MCQ and show immediate feedback
    let score = 0;
    let totalScore = 0;
    const hasDescriptive = selectedExam.questions.some(q => q.type === 'Descriptive');

    selectedExam.questions.forEach(q => {
      totalScore += q.maxMarks;
      if (q.type === 'MCQ' && examAnswers[q.id] === q.correctAnswer) {
        score += q.maxMarks;
      }
    });

    setShowFinishedScoreCard({
      examTitle: language === 'mr' ? selectedExam.titleMar : selectedExam.title,
      obtained: score,
      total: totalScore,
      percent: Math.round((score / totalScore) * 100),
      hasDescriptive
    });

    // Reset States
    setExamStarted(false);
    setSelectedExam(null);
    setExamPassword('');
    // Clear exam answers state
    setExamAnswers({});
  };

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveFrom || !leaveTo || !leaveReason) return;
    onAddLeaveRequest({
      fromDate: leaveFrom,
      toDate: leaveTo,
      reason: leaveReason,
      status: 'PENDING'
    });
    setLeaveSuccess(language === 'mr' ? 'रजा अर्ज यशस्वीरित्या सादर केला! ॲडमिन मंजुरी प्रलंबित आहे.' : 'Leave requested! Admin approval pending.');
    setLeaveFrom('');
    setLeaveTo('');
    setLeaveReason('');
    setTimeout(() => setLeaveSuccess(''), 5000);
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintSubject || !complaintDesc) return;
    onAddComplaint(complaintSubject, complaintDesc);
    setComplaintSuccess(language === 'mr' ? 'तक्रार गुप्तपणे नोंदवली गेली आहे. केवळ ॲडमिन कडून पुनरावलोकन केले जाईल.' : 'Private complaint recorded securely. Viewable only by admin.');
    setComplaintSubject('');
    setComplaintDesc('');
    setTimeout(() => setComplaintSuccess(''), 5000);
  };

  const handleHwSubmit = (hwId: string, text: string, imageUrl?: string) => {
    onSubmitHomework(hwId, text, imageUrl);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* 1. TOP STUDENT INFO FLOATING HEADER BANNER (Glassmorphic) */}
      <header className="bg-linear-to-r from-teal-800 to-cyan-950 text-white p-6 shadow-xl relative z-10 overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-teal-300/20 border-2 border-teal-300 flex items-center justify-center text-white text-3xl font-bold shadow-inner">
              {student.firstName[0]}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/30 uppercase font-mono tracking-wider">
                  STUDENT PORTAL
                </span>
                <span className="text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                  Roll: {student.rollNumber}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight pt-1">
                {language === 'mr' ? student.fullNameMar : student.fullNameEng}
              </h1>
              <p className="text-sm text-slate-300 font-medium">
                {t.classes[student.class]} &bull; Div {student.division} &bull; अपशिंगे हायस्कूल
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-xs text-slate-400 font-bold">USER LOGIN ID</p>
              <p className="text-sm font-mono text-emerald-300 font-bold">{student.username}</p>
            </div>
            <button 
              id="student-logout-btn"
              onClick={onLogout}
              className="cursor-pointer bg-red-600/30 hover:bg-red-600/50 text-red-200 hover:text-white px-4 py-2 rounded-lg border border-red-500/30 transition-all text-xs md:text-sm font-semibold flex items-center space-x-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>{t.logout}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. TABBED MANAGEMENT MENU CONTROLS */}
      <div className="bg-white border-b border-slate-200 shadow-xs sticky top-0 z-20 overflow-x-auto shrink-0">
        <div className="max-w-7xl mx-auto flex space-x-2 p-3 min-w-max">
          {[
            { id: 'profile', label: language === 'mr' ? 'माझे प्रोफाईल' : 'My Profile', icon: User },
            { id: 'exams', label: language === 'mr' ? 'परीक्षा दालन' : 'Exam Portal', icon: FileText },
            { id: 'offlineMarks', label: language === 'mr' ? 'ऑफलाइन परीक्षा गुण (Offline Marks)' : 'Offline Exam Marks', icon: Award },
            { id: 'homework', label: language === 'mr' ? 'गृहपाठ कक्ष' : 'Homework Drawer', icon: BookOpen },
            { id: 'leave', label: language === 'mr' ? 'माझा रजा अर्ज' : 'Leave Requests', icon: CheckSquare },
            { id: 'complaints', label: language === 'mr' ? 'तक्रार समिती' : 'Private Complaints', icon: Inbox },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`student-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`cursor-pointer px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold flex items-center space-x-2 transition-all ${
                  active 
                    ? 'bg-linear-to-tr from-teal-700 to-emerald-800 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-teal-200' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SCROLLABLE TAB PANEL WINDOW */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 overflow-y-auto pb-12">
        
        {/* STUDENT PROFILE PANEL */}
        {activeTab === 'profile' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* LEFT DETAILS COLUMN CARD */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-lg space-y-6">
              <div className="text-center pb-6 border-b border-slate-100 relative">
                <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-slate-200 mx-auto flex items-center justify-center text-slate-400 mb-4 overflow-hidden relative">
                  {/* High quality student portrait vector */}
                  <svg viewBox="0 0 100 100" className="w-full h-full scale-110">
                    <rect width="100" height="100" fill="#f1f5f9" />
                    <circle cx="50" cy="40" r="18" fill="#cbd5e1" />
                    <path d="M20,90 C20,72 34,64 50,64 C66,64 80,72 80,90 Z" fill="#64748b" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800">{language === 'mr' ? student.fullNameMar : student.fullNameEng}</h3>
                <p className="text-xs font-mono font-bold text-slate-400 mt-1">ID: {student.id}</p>
                <div className="mt-4 inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>दालन सुस्थितीत आहे</span>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <h4 className="font-bold text-slate-800 text-sm tracking-wide uppercase">{language === 'mr' ? 'शालेय तपशील' : 'School Credentials'}</h4>
                <div className="grid grid-cols-2 gap-4 text-xs font-medium">
                  <div>
                    <p className="text-slate-400 uppercase font-bold text-[10px]">{language === 'mr' ? 'इयत्ता' : 'Class'}</p>
                    <p className="text-slate-800 text-sm">{t.classes[student.class]}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 uppercase font-bold text-[10px]">{language === 'mr' ? 'तुकडी' : 'Division'}</p>
                    <p className="text-slate-800 text-sm">{student.division}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 uppercase font-bold text-[10px]">{language === 'mr' ? 'हजेरी क्रमांक' : 'Roll No.'}</p>
                    <p className="text-slate-800 text-sm font-mono">{student.rollNumber}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 uppercase font-bold text-[10px]">{language === 'mr' ? 'वाहिनी प्रणाली' : 'Portal ID'}</p>
                    <p className="text-slate-800 text-sm font-mono">{student.username}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COMPREHENSIVE PERSONAL DATA SHEET */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-lg space-y-6">
              <h3 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">
                {language === 'mr' ? 'सविस्तर खाजगी माहिती' : 'Detailed Personal Information Document'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 font-extrabold uppercase">{language === 'mr' ? 'विद्यार्थ्यांचे पूर्ण नाव' : 'Full Name'}</p>
                  <p className="font-semibold text-slate-800">{student.fullNameMar} / {student.fullNameEng}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-slate-400 font-extrabold uppercase">{language === 'mr' ? 'पालकांचे नाव' : 'Guardian Name'}</p>
                  <p className="font-semibold text-slate-800">{student.parentName}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-slate-400 font-extrabold uppercase">{language === 'mr' ? 'आधार क्रमांक' : 'Aadhaar Number'}</p>
                  <p className="font-mono font-bold text-slate-800">{student.aadhaar}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs text-slate-400 font-extrabold uppercase">{language === 'mr' ? 'पालक फोन नंबर' : 'Parent Contact'}</p>
                  <p className="font-mono text-slate-800 mt-1">{student.parentPhone}</p>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <p className="text-xs text-slate-400 font-extrabold uppercase">{language === 'mr' ? 'पत्ता' : 'Home Address'}</p>
                  <p className="text-slate-800">{student.address}</p>
                </div>

                {/* SECURE SCHOLARSHIP BANKING INFORMATION ACCOUNTS */}
                <div className="md:col-span-2 pt-4 border-t border-slate-100 space-y-4">
                  <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">
                    💰 {language === 'mr' ? 'शिष्यवृत्ती व बँक खाते तपशील' : 'Scholarship Account Ledger'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/30">
                    <div>
                      <p className="text-[10px] text-slate-400 font-extrabold uppercase">{language === 'mr' ? 'बँकेचे नाव' : 'Bank Name'}</p>
                      <p className="font-semibold text-slate-800 text-xs mt-0.5">{student.bankName || 'नॉन-नोंदणीकृत (Not set)'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-extrabold uppercase">{language === 'mr' ? 'पासबुक नंबर' : 'Passbook Account No.'}</p>
                      <p className="font-mono font-semibold text-slate-800 text-xs mt-0.5">{student.passbookNo || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-extrabold uppercase">IFSC {language === 'mr' ? 'कोड' : 'Code'}</p>
                      <p className="font-mono font-semibold text-slate-800 text-xs mt-0.5">{student.ifsc || 'Not set'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-extrabold uppercase">{language === 'mr' ? 'शिष्यवृत्ती सविस्तर तपशील' : 'Scholarship/Academic Award Details'}</p>
                    <p className="text-xs text-slate-600 mt-1 italic font-medium bg-amber-50 text-amber-900 border border-amber-200/50 p-2.5 rounded-lg w-fit">
                      {student.scholarshipDetails || (language === 'mr' ? "शिष्यवृत्ती सराव नोंद पात्र लाभार्थी" : "Registered for high-priority NMMS scholarship test modules.")}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* EXAM PORTAL GATEWAY */}
        {activeTab === 'exams' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {showFinishedScoreCard && (
              <div className="bg-emerald-500 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="bg-emerald-600/30 px-3 py-1 text-xs font-bold rounded-full w-fit">SUCCESSFULLY SUBMITTED</div>
                  <h3 className="text-xl font-bold mt-2">{showFinishedScoreCard.examTitle}</h3>
                  <p className="text-sm text-emerald-100 mt-1">
                    {showFinishedScoreCard.hasDescriptive 
                      ? (language === 'mr' ? 'उदाहरणात्मक बहुपर्यायी गुण मोजले गेले आहेत. वर्णनात्मक उत्तरे शिक्षकांकडून तपासणीच्या प्रतीक्षेत आहेत. आपण खालील "माझे निकाल" विभागात पाहू शकता.' : 'Auto-graded MCQ part evaluated. Descriptive answers are pending Mrs. Karande M.D.\'s evaluation. See full state below.')
                      : (language === 'mr' ? `यशस्वीरित्या परीक्षा सबमिट केली! स्वयंचलित अंतिम निकाल खाली जोडला गेला आहे: ${showFinishedScoreCard.obtained} / ${showFinishedScoreCard.total} गुण.` : `Successfully auto-graded! Final results logged: ${showFinishedScoreCard.obtained} / ${showFinishedScoreCard.total} Marks.`)}
                  </p>
                </div>
                <div className="bg-white text-emerald-900 px-6 py-4 rounded-xl text-center self-start md:self-center">
                  <p className="text-xs uppercase font-extrabold font-mono tracking-widest text-slate-500">PERCENTAGE</p>
                  <p className="text-3xl font-black">{showFinishedScoreCard.percent}%</p>
                </div>
              </div>
            )}

            {!examStarted ? (
              <>
                <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-lg space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-slate-900">{language === 'mr' ? 'सक्रिय परीक्षा दालन' : 'Active Mid-Term Examinations'}</h3>
                  <p className="text-xs md:text-sm text-slate-500">
                    Below are the tests matching your class ({t.classes[student.class]}). Enter the security exam passcode provided by Mrs. Karande M.D. to unlock.
                  </p>
                </div>

                {gradeExams.length === 0 ? (
                  <div className="bg-slate-50 p-8 rounded-xl border border-dashed border-slate-200 text-center text-slate-400 text-sm">
                    No active examinations found for your class currently.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {gradeExams.map((exam) => (
                      <div key={exam.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-800 text-base">
                            {language === 'mr' ? exam.titleMar : exam.title}
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">
                            ⏱️ Duration: <span className="font-mono font-bold text-slate-700">{exam.durationMinutes} Minutes</span> &bull; 📝 Questions: <span className="font-bold text-slate-700">{exam.questions.length}</span>
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3">
                          <input 
                            type="password"
                            placeholder={t.enterExamPassword}
                            className="bg-slate-100 border border-slate-200 py-1.5 px-3 r-form rounded-lg text-xs font-mono font-bold text-center focus:outline-teal-800"
                            onChange={(e) => setExamPassword(e.target.value)}
                          />
                          <button 
                            id={`start-exam-${exam.id}`}
                            onClick={() => handleStartExam(exam)}
                            className="bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer flex items-center space-x-1"
                          >
                            <span>परीक्षा सुरू करा</span>
                          </button>
                        </div>
                      </div>
                    ))}
                    {examError && (
                      <div className="bg-red-50 text-red-800 p-3 rounded-lg border border-red-200 text-xs font-semibold flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span>{examError}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* COMPLETED ONLINE EXAMS & SCORE CARDS SECTION */}
              <div id="completed-exams-history" className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-lg space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span>{language === 'mr' ? 'झालेल्या परीक्षा व तुमचे गुण' : 'My Completed Exam Results'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    {language === 'mr' ? 'खालील यादीमध्ये तुमच्या सबमिट केलेल्या सर्व परीक्षा, उत्तरे आणि मिळालेले गुण दिसतील.' : 'Check your completed exam records, scored MCQs, graded descriptive papers, and feedback.'}
                  </p>
                </div>

                {examSubmissions.filter(s => s.studentId === student.id).length === 0 ? (
                  <div className="bg-slate-50 p-8 rounded-xl border border-dashed border-slate-200 text-center text-slate-400 text-xs md:text-sm">
                    {language === 'mr' ? 'तुम्ही अद्याप कोणत्याही ऑनलाईन परीक्षेस उपस्थित राहिलेले नाही.' : 'You have not submitted any online examinations yet.'}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {examSubmissions.filter(s => s.studentId === student.id).map((submission) => {
                      const exam = exams.find(e => e.id === submission.examId);
                      const isExpanded = expandedSubmissionId === submission.id;
                      
                      const totalObtained = Object.values(submission.marksObtained).reduce((sum, val) => sum + val, 0);
                      const percentage = Math.round((totalObtained / submission.totalExamMarks) * 100);

                      return (
                        <div key={submission.id} className="border border-slate-150 rounded-xl overflow-hidden shadow-xs hover:border-slate-300 transition-all bg-slate-50/50">
                          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border-b border-slate-100">
                            <div className="space-y-1">
                              <span className="bg-slate-100 text-slate-600 font-mono font-bold text-[9px] px-2 py-0.5 rounded-full border border-slate-200/60">
                                {new Date(submission.submittedAt).toLocaleDateString()}
                              </span>
                              <h4 className="font-bold text-slate-900 text-sm md:text-base">
                                {exam ? (language === 'mr' ? exam.titleMar : exam.title) : (language === 'mr' ? 'मागील परीक्षा' : 'Past Examination')}
                              </h4>
                              <p className="text-xs font-mono text-slate-400">ID: {submission.examId}</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 justify-between sm:justify-end w-full sm:w-auto">
                              {submission.evaluated ? (
                                <div className="text-right">
                                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide inline-block">
                                    {language === 'mr' ? 'निकाल घोषित ✅' : 'GRADED & COMPLETED'}
                                  </span>
                                  <div className="text-sm font-black text-slate-800 mt-1">
                                    {totalObtained} / {submission.totalExamMarks} Marks ({percentage}%)
                                  </div>
                                </div>
                              ) : (
                                <div className="text-right">
                                  <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide inline-block">
                                    {language === 'mr' ? 'तपासणी प्रलंबित ⏳' : 'PENDING EVALUATION'}
                                  </span>
                                  <div className="text-xs font-bold text-slate-500 mt-1">
                                    MCQ: {submission.totalMarksObtained} M (Descriptive Pending)
                                  </div>
                                </div>
                              )}

                              <button
                                onClick={() => setExpandedSubmissionId(isExpanded ? null : submission.id)}
                                className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg border border-slate-600 cursor-pointer shadow-xs"
                              >
                                {isExpanded ? (language === 'mr' ? 'तपशील लपवा ▲' : 'Hide Details') : (language === 'mr' ? 'उत्तरपत्रिका पहा ▼' : 'View Answers')}
                              </button>
                            </div>
                          </div>

                          {isExpanded && exam && (
                            <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-4 text-xs md:text-sm">
                              <h5 className="font-bold text-slate-700 border-b border-slate-200/60 pb-1 uppercase tracking-wider text-[10px] font-mono">
                                {language === 'mr' ? 'घटकनिहाय उत्तरे आणि गुणांची पडताळणी' : 'Question & Answer Verification'}
                              </h5>

                              <div className="space-y-4 divide-y divide-slate-200/60">
                                {exam.questions.map((q, idx) => {
                                  const studentAns = submission.answers[q.id] || '';
                                  const marksAwarded = submission.marksObtained[q.id] ?? 0;
                                  const isCorrectMCQ = q.type === 'MCQ' && studentAns === q.correctAnswer;

                                  return (
                                    <div key={q.id} className="pt-3 first:pt-0 space-y-2">
                                      <div className="flex items-start gap-2.5">
                                        <span className="bg-slate-200 text-slate-800 font-mono font-bold text-[10px] px-2 py-0.5 rounded-sm mt-0.5">
                                          Q{idx + 1}
                                        </span>
                                        <div className="flex-1">
                                          <p className="font-bold text-slate-800 text-[13px]">
                                            {language === 'mr' ? q.questionTextMar : q.questionText}
                                          </p>
                                          <p className="text-[10px] text-slate-400 font-mono mt-0.5 uppercase">
                                            TYPE: {q.type} &bull; MAX MARKS: {q.maxMarks}
                                          </p>
                                        </div>
                                        <span className={`font-mono font-bold text-xs px-2.5 py-1 rounded-sm ${
                                          q.type === 'MCQ' 
                                            ? (isCorrectMCQ ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800')
                                            : (submission.evaluated ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-200 text-slate-600')
                                        }`}>
                                          {marksAwarded} / {q.maxMarks} M
                                        </span>
                                      </div>

                                      {q.type === 'MCQ' && q.options && (
                                        <div className="ml-8 space-y-1 bg-white p-2.5 rounded-lg border border-slate-250">
                                          <p className="text-xs text-slate-500">
                                            {language === 'mr' ? 'तुम्ही निवडलेला पर्याय:' : 'Your Selection:'}{' '}
                                            <span className={`font-bold ${isCorrectMCQ ? 'text-emerald-700' : 'text-red-700'}`}>
                                              {studentAns !== '' ? `${parseInt(studentAns) + 1}) ${language === 'mr' ? (q.optionsMar ? q.optionsMar[parseInt(studentAns)] : q.options[parseInt(studentAns)]) : q.options[parseInt(studentAns)]}` : 'None'}
                                            </span>
                                          </p>
                                          {!isCorrectMCQ && q.correctAnswer && (
                                            <p className="text-xs text-emerald-700 font-semibold">
                                              {language === 'mr' ? 'योग्य उत्तर:' : 'Correct Answer:'}{' '}
                                              {parseInt(q.correctAnswer) + 1}) {language === 'mr' ? (q.optionsMar ? q.optionsMar[parseInt(q.correctAnswer)] : q.options[parseInt(q.correctAnswer)]) : q.options[parseInt(q.correctAnswer)]}
                                            </p>
                                          )}
                                        </div>
                                      )}

                                      {q.type === 'Descriptive' && (
                                        <div className="ml-8 space-y-1 bg-white p-3 rounded-lg border border-slate-250">
                                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                            {language === 'mr' ? 'तुमचे उत्तर (Your Answer):' : 'Submitted Long Written Answer:'}
                                          </p>
                                          <p className="text-xs text-slate-800 italic font-medium whitespace-pre-wrap leading-relaxed mt-1">
                                            {studentAns || 'No Answer Submitted.'}
                                          </p>
                                          {!submission.evaluated && (
                                            <p className="text-[11px] text-amber-700 font-extrabold italic mt-1 bg-amber-50 p-1 px-2 rounded border border-amber-200/50 w-fit">
                                              ⚠️ {language === 'mr' ? 'वर्णनात्मक उतारा: शिक्षिका श्रीमती करंदे मैडम द्वारे तपासणे शिल्लक आहे.' : 'Descriptive Answer: Awaiting evaluation by Mrs. Karande M.D.'}
                                            </p>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>

                              {submission.evaluatorRemarks && (
                                <div className="mt-3 p-3 bg-teal-50 border border-teal-200 rounded-xl">
                                  <p className="font-extrabold text-teal-900 text-[11px] uppercase tracking-wider font-mono">
                                    {language === 'mr' ? 'शिक्षकांचा शेरा / अभिप्राय:' : 'Teacher Evaluator Remarks:'}
                                  </p>
                                  <p className="text-xs text-teal-800 mt-1 font-semibold">{submission.evaluatorRemarks}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              </>
            ) : (
              // EXAM RUNTIME TIMER BASED SCREEN
              <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-lg space-y-6">
                <div className="bg-linear-to-r from-teal-800 to-teal-900 p-4 rounded-xl text-white flex justify-between items-center sm:flex-row flex-col gap-4">
                  <div>
                    <p className="text-xs font-mono text-emerald-300 font-bold uppercase">LIVE EXAMINATION ACTIVE</p>
                    <h3 className="text-lg font-bold mt-1">
                      {language === 'mr' ? selectedExam?.titleMar : selectedExam?.title}
                    </h3>
                  </div>
                  <div className="bg-red-500/20 text-red-200 border border-red-500/30 px-4 py-2 rounded-lg font-mono font-black text-center text-sm md:text-base tracking-wide flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-red-400 animate-spin" />
                    <span>{t.remainingTime}: {Math.floor(examTimeRemaining / 60)}:{String(examTimeRemaining % 60).padStart(2, '0')}</span>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 max-h-[60vh] overflow-y-auto pr-2 space-y-6">
                  {selectedExam?.questions.map((q, idx) => (
                    <div key={q.id} className="pt-6 space-y-4">
                      <div className="flex items-start space-x-3">
                        <span className="bg-slate-100 text-slate-800 font-mono font-bold text-xs px-2.5 py-1 rounded-md">
                          Q{idx + 1}
                        </span>
                        <div>
                          <p className="font-bold text-slate-800 text-sm md:text-base leading-relaxed">
                            {language === 'mr' ? q.questionTextMar : q.questionText}
                          </p>
                          <span className="text-[10px] text-slate-400 font-extrabold font-mono mt-1 block">MARKS: {q.maxMarks} &bull; TYPE: {q.type}</span>
                        </div>
                      </div>

                      {q.type === 'MCQ' && q.options && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-10">
                          {q.options.map((opt, oIdx) => {
                            const optTextMar = q.optionsMar ? q.optionsMar[oIdx] : opt;
                            const isSelected = examAnswers[q.id] === String(oIdx);
                            return (
                              <button
                                key={oIdx}
                                id={`question-${q.id}-opt-${oIdx}`}
                                onClick={() => setExamAnswers(prev => ({ ...prev, [q.id]: String(oIdx) }))}
                                className={`cursor-pointer border text-left p-3 text-xs md:text-sm font-bold rounded-xl transition-all ${
                                  isSelected 
                                    ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-xs' 
                                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                <span className="inline-flex mr-2 bg-slate-100 text-slate-600 rounded-full w-5 h-5 items-center justify-center text-[10px] font-black">{oIdx + 1}</span>
                                <span>{language === 'mr' ? optTextMar : opt}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {q.type === 'Descriptive' && (
                        <div className="pl-10 space-y-1">
                          <textarea 
                            rows={3}
                            placeholder={language === 'mr' ? 'येथे तुमचे उत्तर मराठीमध्ये किंवा इंग्रजीमध्ये टाईप करा...' : 'Type your detailed descriptive answer here...'}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs md:text-sm focus:outline-teal-800 focus:bg-white"
                            value={examAnswers[q.id] || ''}
                            onChange={(e) => setExamAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button 
                    id="submit-answers-btn"
                    onClick={submitAnswers}
                    className="cursor-pointer bg-emerald-600 hover:bg-emerald-500 hover:scale-105 active:scale-95 text-white font-extrabold px-6 py-3 rounded-lg flex items-center space-x-2 transition-all shadow-md text-sm"
                  >
                    <span>{language === 'mr' ? 'परीक्षा सादर करा (Submit)' : 'Submit Exam'}</span>
                    <Send className="w-4 h-4 text-emerald-200" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* OFFLINE EXAM MARKS PORTAL SECTION */}
        {activeTab === 'offlineMarks' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 font-sans"
          >
            <div className="bg-[#FAF6EE] p-6 rounded-2xl border border-dotted border-[#F4A261]/40 shadow-xs space-y-3">
              <span className="bg-[#7ED9B4]/30 text-[#0F5132] border border-[#7ED9B4]/50 text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full uppercase">
                OFFLINE EXAMINATION RECORD
              </span>
              <h3 className="text-xl font-black text-[#7c5031]">
                {language === 'mr' ? 'ऑफलाइन परीक्षा अंतर्गत प्राप्त गुणतक्ता' : 'My Offline Classroom Exam Marks'}
              </h3>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                {language === 'mr' 
                  ? 'शिक्षकांनी वर्गात घेतलेल्या ऑफलाइन चाचण्यांचे व परीक्षांचे तुमचे गुण येथे एका दृष्टीक्षेपात उपलब्ध आहेत.' 
                  : 'View individual performance scorecards for written classroom tests deployed offline by your teachers.'}
              </p>
            </div>

            {offlineExamMarks.filter(sh => sh.className === student.class).length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-slate-200/60 shadow-lg space-y-2">
                <p className="text-slate-400 font-bold text-xs">
                  {language === 'mr' 
                    ? 'या इयत्तेसाठी अजूनपर्यंत कोणत्याही ऑफलाइन परीक्षांचे गुण शिक्षकांनी प्रविष्ट केलेले नाहीत.' 
                    : 'Your teachers haven\'t published any offline test marks for your class yet.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {offlineExamMarks.filter(sh => sh.className === student.class).map((sheet) => {
                  const scoreStr = sheet.marks[student.id] || '0';
                  const score = Number(scoreStr) || 0;
                  const total = sheet.totalMarks || 50;
                  const pct = Math.round((score / total) * 100);

                  let gradeText = '';
                  let gradeTextEng = '';
                  let colorClass = 'bg-[#7ED9B4]'; // green
                  let textColClass = 'text-teal-800';

                  if (pct >= 85) {
                    gradeText = 'उत्कृष्ट (Out-standing)';
                    gradeTextEng = 'Outstanding';
                  } else if (pct >= 70) {
                    gradeText = 'चांगले (Very Good)';
                    gradeTextEng = 'Very Good';
                  } else if (pct >= 50) {
                    gradeText = 'प्रामाणिक (Good)';
                    gradeTextEng = 'Good';
                    colorClass = 'bg-[#F4A261]'; // orange
                    textColClass = 'text-amber-800';
                  } else {
                    gradeText = 'सुधारणा हवी (Improvement Needed)';
                    gradeTextEng = 'Needs Improvement';
                    colorClass = 'bg-[#FBECE5] border-red-200';
                    textColClass = 'text-rose-700';
                  }

                  return (
                    <div 
                      key={sheet.id} 
                      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md hover:shadow-lg transition-all flex flex-col justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="bg-slate-100 text-slate-600 font-bold px-2.5 py-0.5 rounded text-[10px] tracking-wide uppercase border">
                            {sheet.date}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">ID: {sheet.id}</span>
                        </div>
                        <h4 className="font-black text-slate-900 text-base">{sheet.examName}</h4>
                      </div>

                      {/* Marks Score display */}
                      <div className="bg-[#FAF6EE]/50 border rounded-xl p-4 flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">{language === 'mr' ? 'मिळालेले गुण' : 'Marks Secured'}</p>
                          <p className="text-2xl font-black text-[#7c5031]">
                            {score} <span className="text-sm font-medium text-slate-400">/ {total}</span>
                          </p>
                        </div>

                        <div className="text-right space-y-1">
                          <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">{language === 'mr' ? 'टक्केवारी व शेरा' : 'Grade / Status'}</p>
                          <div className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase text-center ${colorClass} ${textColClass}`}>
                            {language === 'mr' ? gradeText : gradeTextEng}
                          </div>
                        </div>
                      </div>

                      {/* Visual score horizontal track bar representing percentage performance */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-500 font-extrabold">
                          <span>{language === 'mr' ? 'प्रगती स्तर' : 'Progress'}</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-linear-to-r from-[#F4A261] to-[#7ED9B4] h-full rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }} 
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* HOMEWORK COMPARTMENT */}
        {activeTab === 'homework' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-lg space-y-6">
              <h3 className="text-xl font-extrabold text-slate-900">{language === 'mr' ? 'गृहपाठ कक्ष (Homework)' : 'Academic Homework Submissions'}</h3>
              
              {gradeHomework.length === 0 ? (
                <div className="bg-slate-50 p-8 rounded-xl border border-dashed border-slate-200 text-center text-slate-400 text-sm">
                  No homework assignments released for your class currently.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {gradeHomework.map((hw) => {
                    const submission = homeworkSubmissions.find(sub => sub.homeworkId === hw.id && sub.studentId === student.id);
                    const draft = hwDrafts[hw.id] || { text: '', imageUrl: '' };
                    return (
                      <div key={hw.id} className="py-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="space-y-3 max-w-2xl">
                          <div className="flex items-center space-x-2 bg-linear-to-tr from-cyan-50 to-blue-50 text-cyan-800 font-bold px-3 py-1 rounded-full text-xs border border-cyan-200/50 w-fit">
                            <span>Subject: {language === 'mr' ? hw.subjectMar : hw.subject}</span>
                          </div>
                          <h4 className="font-extrabold text-slate-800 text-base">{hw.title}</h4>
                          <p className="text-xs text-slate-600 leading-relaxed font-semibold">{hw.description}</p>
                          <div className="text-[10px] text-slate-400 font-extrabold font-mono pt-1">
                            📅 RELEASED: {hw.createdAt} &bull; 🚨 DEADLINE: {hw.deadlineDate}
                          </div>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 min-w-xs space-y-3 shrink-0">
                          <p className="text-xs font-extrabold text-slate-500 uppercase">SUBMISSION STATUS</p>
                          
                          {submission ? (
                            <div className="space-y-2">
                              {submission.status === 'APPROVED' ? (
                                <div className="bg-emerald-50 text-emerald-800 border border-emerald-250 p-2.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5">
                                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                                  <span>{language === 'mr' ? 'गृहपाठ मंजूर (Approved)' : 'Homework Approved!'}</span>
                                </div>
                              ) : submission.status === 'REJECTED' ? (
                                <div className="bg-rose-50 text-rose-800 border border-rose-250 p-2.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5">
                                  <X className="w-4 h-4 text-rose-600 shrink-0" />
                                  <span>{language === 'mr' ? 'गृहपाठ नाकारला (Rejected)' : 'Homework Rejected'}</span>
                                </div>
                              ) : (
                                <div className="bg-amber-50 text-amber-800 border border-amber-250 p-2.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5">
                                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                                  <span>{language === 'mr' ? 'तपासणी प्रलंबित (Pending Review)' : 'Pending Review'}</span>
                                </div>
                              )}

                              {submission.textSubmission && (
                                <div className="bg-white border rounded p-2 text-[11px] text-slate-600 max-w-[240px] truncate leading-normal">
                                  <span className="font-bold block text-slate-400 text-[9px] uppercase">{language === 'mr' ? 'उत्तर (Content)' : 'Your Content'}:</span>
                                  {submission.textSubmission}
                                </div>
                              )}

                              {submission.fileUrl && (
                                <div className="mt-1">
                                  <span className="font-bold block text-slate-400 text-[9px] uppercase mb-1">{language === 'mr' ? 'आपला फोटो' : 'Submitted Image'}:</span>
                                  <img src={submission.fileUrl} className="w-full max-h-32 object-cover rounded-lg border shadow-xs" />
                                </div>
                              )}

                              {submission.remarks && (
                                <div className="bg-slate-100 border p-2 rounded text-[10px] text-slate-600 leading-tight">
                                  <span className="font-bold block text-slate-500 uppercase">{language === 'mr' ? 'अभिप्राय (Remarks)' : 'Remarks'}:</span>
                                  {submission.remarks}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <textarea 
                                rows={2}
                                value={draft.text || ''}
                                placeholder={language === 'mr' ? 'तुमचा स्वाध्याय सारांश / उत्तर येथे लिहा...' : 'Provide short text content overview...'}
                                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:outline-teal-800"
                                onChange={(e) => setHwDrafts(prev => ({
                                  ...prev,
                                  [hw.id]: { ...draft, text: e.target.value }
                                }))}
                              />
                              
                              {/* Simple file selection system */}
                              <div className="relative">
                                <label className="cursor-pointer border border-dashed border-slate-300 bg-white hover:bg-slate-50 p-2.5 rounded-lg text-xs text-slate-500 flex items-center justify-center space-x-1.5 transition-all">
                                  <Upload className="w-4 h-4 text-slate-400" />
                                  <span className="font-bold">{language === 'mr' ? 'गृहपाठ फोटो अपलोड करा' : 'Upload Homework Photo'}</span>
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          setHwDrafts(prev => ({
                                            ...prev,
                                            [hw.id]: { ...draft, imageUrl: reader.result as string }
                                          }));
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                </label>
                              </div>

                              {draft.imageUrl && (
                                <div className="relative border rounded-lg p-1.5 bg-white flex items-center justify-between">
                                  <div className="flex items-center space-x-1.5 overflow-hidden">
                                    <img src={draft.imageUrl} className="w-10 h-10 object-cover rounded border" />
                                    <span className="text-[10px] text-emerald-700 font-bold">{language === 'mr' ? 'फोटो जोडण्यात आला' : 'Photo attached'}</span>
                                  </div>
                                  <button 
                                    type="button" 
                                    onClick={() => setHwDrafts(prev => ({ ...prev, [hw.id]: { ...draft, imageUrl: undefined } }))}
                                    className="p-1 hover:bg-slate-100 text-rose-600 rounded"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              )}

                              <button 
                                id={`submit-hw-${hw.id}`}
                                onClick={() => handleHwSubmit(hw.id, draft.text, draft.imageUrl)}
                                className="cursor-pointer bg-teal-800 hover:bg-teal-700 text-white font-bold text-xs py-2 w-full rounded-lg text-center shadow-xs transition-all"
                              >
                                {language === 'mr' ? 'सबमिट करा' : 'Submit Now'}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}



        {/* LEAVE SYSTEM APPLICATION */}
        {activeTab === 'leave' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* SUBMIT LEAVE REQUEST FORM */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-lg space-y-4">
              <h3 className="text-lg font-extrabold text-slate-900">{t.leaveApp}</h3>
              
              <form onSubmit={handleLeaveSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">{t.leaveForm.fromDate}</label>
                  <input 
                    type="date"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-teal-800"
                    value={leaveFrom}
                    onChange={(e) => setLeaveFrom(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">{t.leaveForm.toDate}</label>
                  <input 
                    type="date"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-teal-800"
                    value={leaveTo}
                    onChange={(e) => setLeaveTo(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">{t.leaveForm.reason}</label>
                  <textarea 
                    rows={3}
                    required
                    placeholder={language === 'mr' ? 'रजा घेण्याचे सविस्तर कारण येथे लिहा...' : 'Provide specific reason details...'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs focus:outline-teal-800"
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                  />
                </div>
                
                <button 
                  id="submit-leave-btn"
                  type="submit"
                  className="w-full bg-teal-800 hover:bg-teal-700 text-white font-bold text-xs py-2.5 rounded-lg text-center transition-all shadow-md cursor-pointer"
                >
                  {t.leaveForm.submit}
                </button>
              </form>

              {leaveSuccess && (
                <div className="bg-emerald-50 text-emerald-800 p-3 rounded-lg border border-emerald-200 text-xs font-semibold">
                  {leaveSuccess}
                </div>
              )}
            </div>

            {/* HISTORICAL LEAVE SUBMISSION LISTS WITH ADMIN APPROVAL REMARKS */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-lg space-y-4">
              <h3 className="text-lg font-extrabold text-slate-900">{language === 'mr' ? 'मागील रजा अर्ज इतिहास' : 'Leave History & Approvals'}</h3>
              
              {studentLeaves.length === 0 ? (
                <div className="bg-slate-50 p-6 rounded-xl text-center text-slate-400 text-xs">
                  No leave requests submitted yet.
                </div>
              ) : (
                <div className="space-y-4 overflow-y-auto max-h-[50vh]">
                  {studentLeaves.map((l) => (
                    <div key={l.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 flex flex-col justify-between gap-3 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-slate-400 font-bold">REQ: {l.id}</span>
                        <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                          l.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                          l.status === 'REJECTED' ? 'bg-red-50 text-red-800 border border-red-200' :
                          'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}>
                          {t.leaveForm[l.status.toLowerCase() as any] || l.status}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">
                          ⏱️ Period: <span className="font-mono">{l.fromDate}</span> {language === 'mr' ? 'ते' : 'to'} <span className="font-mono">{l.toDate}</span>
                        </p>
                        <p className="text-slate-500 italic mt-1 font-semibold">Reason: "{l.reason}"</p>
                      </div>
                      
                      {l.remarks && (
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200/50 text-teal-900 leading-relaxed font-bold">
                          ✍️ {t.leaveForm.remarks}: {l.remarks}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* PRIVATE COMPLAINT COMMITTEE */}
        {activeTab === 'complaints' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* SUBMIT COMPLAINT FORM */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-lg space-y-4">
              <h3 className="text-lg font-extrabold text-slate-900">{t.complaints}</h3>
              <p className="text-xs text-rose-600 font-semibold bg-rose-50 border border-rose-150 p-3 rounded-lg leading-relaxed">
                🚨 {language === 'mr' 
                  ? 'टीप: ही एक पूर्णपणे गुप्त समिती आहे. तुमच्या तक्रारी केवळ अधिकृत मुख्याध्यापक / ॲडमिन कडे जातील. कोणत्याही वर्गमित्राला समजणार नाही.' 
                  : 'Highly confidential. Your reports and complaints bypass standard teacher lists and reach the Principal directly.'}
              </p>

              <form onSubmit={handleComplaintSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">{language === 'mr' ? 'तक्रार विषय' : 'Complaint Subject/Topic'}</label>
                  <input 
                    type="text"
                    required
                    placeholder={language === 'mr' ? 'उदा. स्वच्छतागृह अडचण / वर्गातील फॅन नादुरुस्त...' : 'Provide quick subject header...'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-rose-800 font-semibold"
                    value={complaintSubject}
                    onChange={(e) => setComplaintSubject(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">{language === 'mr' ? 'तक्रारीचा सविस्तर तपशील' : 'Detailed Narrative'}</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder={language === 'mr' ? 'घटनेची तारीख, वेळ व संपूर्ण सविस्तर तपशील लिहा जेणेकरून ॲडमिन तात्काळ कारवाई करतील...' : 'Explain the context or event...'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs focus:outline-rose-800"
                    value={complaintDesc}
                    onChange={(e) => setComplaintDesc(e.target.value)}
                  />
                </div>
                
                <button 
                  id="submit-complaint-btn"
                  type="submit"
                  className="w-full bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs py-2.5 rounded-lg text-center transition-all shadow-md cursor-pointer"
                >
                  {language === 'mr' ? 'तक्रार गुप्तपणे सबमिट करा' : 'Securely Send Confidential Complaint'}
                </button>
              </form>

              {complaintSuccess && (
                <div className="bg-emerald-50 text-emerald-800 p-3 rounded-lg border border-emerald-200 text-xs font-semibold">
                  {complaintSuccess}
                </div>
              )}
            </div>

            {/* MY COMPLAINTS LOGS VIEW */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-lg space-y-4">
              <h3 className="text-lg font-extrabold text-slate-900">{language === 'mr' ? 'माझ्या गुप्त तक्रारींची सद्यस्थिती' : 'My Secure Complaints Audit Log'}</h3>
              
              {studentComplaints.length === 0 ? (
                <div className="bg-slate-50 p-6 rounded-xl text-center text-slate-400 text-xs">
                  No secure complaints submitted.
                </div>
              ) : (
                <div className="space-y-4 overflow-y-auto max-h-[50vh]">
                  {studentComplaints.map((c) => (
                    <div key={c.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 flex flex-col justify-between gap-3 text-xs relative">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-rose-500 font-extrabold">SECURE-ID: {c.id}</span>
                        <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                          c.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                          'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}>
                          {c.status}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">
                          📌 {c.subject}
                        </p>
                        <p className="text-slate-500 italic mt-1 font-semibold">"{c.description}"</p>
                        <span className="text-[10px] text-slate-400 font-mono font-bold mt-1 block">SUBMITTED AT: {c.submittedAt}</span>
                      </div>
                      
                      {c.adminRemarks && (
                        <div className="bg-rose-900/5 p-2.5 rounded-lg border border-rose-200/20 text-rose-950 font-bold">
                          ✍️ Principal Action Remark: {c.adminRemarks}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

      </main>

    </div>
  );
}
