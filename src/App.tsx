/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Award, Users, FileText, Calendar, Shield, User, Landmark, 
  MapPin, Phone, Mail, ChevronRight, Menu, X, ArrowRight, Star
} from 'lucide-react';

import { Student, ClassType, Exam, Homework, AcademicResult, LeaveRequest, Complaint, CulturalEvent, Notification, NMMSResult, Teacher, Topper, OfflineExamMark, SchoolStats, ExamSubmission, GalleryItem, HomeworkSubmission } from './types';
import { 
  initialTeacher, initialStudents, initialAcademicResults, initialNMMSResults,
  initialExams, initialHomework, initialLeaveRequests, initialComplaints, initialEvents, initialNotifications, initialToppers, initialSchoolStats
} from './data/initialData';
import { LanguageCode, translations } from './utils/translations';

// Components
import HomeView from './components/HomeView';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [language, setLanguage] = useState<LanguageCode>('mr');
  const t = translations[language];

  // Global State Database (In-Memory with LocalStorage persistence and safety)
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem('school_students');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Recovering students from initialData:', e);
    }
    return initialStudents;
  });
  const [academicResults, setAcademicResults] = useState<AcademicResult[]>(() => {
    try {
      const saved = localStorage.getItem('school_academic_results');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Recovering academic results:', e);
    }
    return initialAcademicResults;
  });
  const [exams, setExams] = useState<Exam[]>(() => {
    try {
      const saved = localStorage.getItem('school_exams');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Recovering exams:', e);
    }
    return initialExams;
  });
  const [homework, setHomework] = useState<Homework[]>(() => {
    try {
      const saved = localStorage.getItem('school_homework');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Recovering homework:', e);
    }
    return initialHomework;
  });
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(() => {
    try {
      const saved = localStorage.getItem('school_leaves');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Recovering leaves:', e);
    }
    return initialLeaveRequests;
  });
  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    try {
      const saved = localStorage.getItem('school_complaints');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Recovering complaints:', e);
    }
    return initialComplaints;
  });
  const [events, setEvents] = useState<CulturalEvent[]>(() => {
    try {
      const saved = localStorage.getItem('school_events');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Recovering events:', e);
    }
    return initialEvents;
  });
  const [nmmsResults, setNmmsResults] = useState<NMMSResult[]>(() => {
    try {
      const saved = localStorage.getItem('school_nmms');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Recovering nmms results:', e);
    }
    return initialNMMSResults;
  });
  const [offlineExamMarks, setOfflineExamMarks] = useState<OfflineExamMark[]>(() => {
    try {
      const saved = localStorage.getItem('school_offline_exam_marks');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Recovering offline exam marks:', e);
    }
    return [
      {
        id: 'off-1',
        examName: 'घटक चाचणी १ (Unit Test 1)',
        className: '7th',
        totalMarks: 50,
        marks: {
          '701': '42',
          '702': '35',
          '703': '46'
        },
        date: '2026-05-15'
      },
      {
        id: 'off-2',
        examName: 'सराव परीक्षा (Practice Exam)',
        className: '6th',
        totalMarks: 100,
        marks: {
          '601': '85',
          '602': '78',
          '603': '92'
        },
        date: '2026-05-20'
      }
    ];
  });
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      const saved = localStorage.getItem('school_notifications');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Recovering notifications:', e);
    }
    return initialNotifications;
  });

  const [schoolStats, setSchoolStats] = useState<SchoolStats>(() => {
    try {
      const saved = localStorage.getItem('school_stats');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.totalStudents) return parsed;
      }
    } catch (e) {
      console.warn('Recovering school stats:', e);
    }
    return initialSchoolStats;
  });
  const [teacher, setTeacher] = useState<Teacher>(() => {
    try {
      const saved = localStorage.getItem('school_teacher');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.name && parsed.qualification) return parsed;
      }
    } catch (e) {
      console.warn('Recovering teacher profile:', e);
    }
    return initialTeacher;
  });
  const [toppers, setToppers] = useState<Topper[]>(() => {
    try {
      const saved = localStorage.getItem('school_toppers');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].examName) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Recovering toppers:', e);
    }
    return initialToppers;
  });
  const [adminCredentials, setAdminCredentials] = useState(() => {
    try {
      const saved = localStorage.getItem('school_admin_credentials');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.username) return parsed;
      }
    } catch (e) {
      console.warn('Recovering admin credentials:', e);
    }
    return { username: 'mangalkarande', password: 'Omkar@1' };
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('school_gallery_items');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Recovering gallery items:', e);
    }
    return [
      {
        id: 'g1',
        titleMar: "शालेय इमारत परिसर",
        titleEng: "School Premises",
        bgGradient: "from-teal-600 to-teal-900",
        descrMar: "स्वच्छ, सुंदर आणि निसर्गरम्य शैक्षणिक वातावरण.",
        descrEng: "Clean, scenic, and supportive educational atmosphere."
      },
      {
        id: 'g2',
        titleMar: "विज्ञान प्रयोगशाळा",
        titleEng: "Science Laboratory",
        bgGradient: "from-indigo-600 to-indigo-900",
        descrMar: "अद्ययावत उपकरणांनी सज्ज स्वतंत्र हुशार कट्टा.",
        descrEng: "Equipped modern physics and chemistry labs."
      },
      {
        id: 'g3',
        titleMar: "डिजिटल संगणक कक्ष",
        titleEng: "Digital Computer Lab",
        bgGradient: "from-teal-700 to-indigo-700",
        descrMar: "भविष्याची पावले: डिजिटल साक्षरता आणि प्रोग्रॅमिंग वर्ग.",
        descrEng: "Empowering tomorrow: coding and internet modules."
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('school_gallery_items', JSON.stringify(galleryItems));
  }, [galleryItems]);

  const [homeworkSubmissions, setHomeworkSubmissions] = useState<HomeworkSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('school_homework_submissions');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Recovering homework submissions:', e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('school_homework_submissions', JSON.stringify(homeworkSubmissions));
  }, [homeworkSubmissions]);

  const [examSubmissions, setExamSubmissions] = useState<ExamSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('school_exam_submissions');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Recovering exam submissions:', e);
    }
    return [
      {
        id: "submission-1",
        studentId: "701",
        examId: "exam101",
        submittedAt: "2026-05-24T10:00:00Z",
        answers: {
          "q1": "1",
          "q2": "1",
          "q3": "NMMS program provides crucial scholarship opportunities for bright rural students to continue secondary education without financial strain."
        },
        evaluated: false,
        marksObtained: {
          "q1": 2,
          "q2": 2,
          "q3": 0
        },
        totalMarksObtained: 4,
        totalExamMarks: 9
      },
      {
        id: "submission-2",
        studentId: "702",
        examId: "exam101",
        submittedAt: "2026-05-24T11:15:00Z",
        answers: {
          "q1": "2",
          "q2": "1",
          "q3": "It helps poor students who get high marks in 8th standard with a monthly scholarship of Rs 1000 so they don't drop out."
        },
        evaluated: false,
        marksObtained: {
          "q1": 0,
          "q2": 2,
          "q3": 0
        },
        totalMarksObtained: 2,
        totalExamMarks: 9
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('school_exam_submissions', JSON.stringify(examSubmissions));
  }, [examSubmissions]);

  // Sync to LocalStorage on modifications
  useEffect(() => {
    localStorage.setItem('school_students', JSON.stringify(students));
  }, [students]);
  useEffect(() => {
    localStorage.setItem('school_academic_results', JSON.stringify(academicResults));
  }, [academicResults]);
  useEffect(() => {
    localStorage.setItem('school_exams', JSON.stringify(exams));
  }, [exams]);
  useEffect(() => {
    localStorage.setItem('school_homework', JSON.stringify(homework));
  }, [homework]);
  useEffect(() => {
    localStorage.setItem('school_leaves', JSON.stringify(leaveRequests));
  }, [leaveRequests]);
  useEffect(() => {
    localStorage.setItem('school_complaints', JSON.stringify(complaints));
  }, [complaints]);
  useEffect(() => {
    localStorage.setItem('school_events', JSON.stringify(events));
  }, [events]);
  useEffect(() => {
    localStorage.setItem('school_nmms', JSON.stringify(nmmsResults));
  }, [nmmsResults]);
  useEffect(() => {
    localStorage.setItem('school_offline_exam_marks', JSON.stringify(offlineExamMarks));
  }, [offlineExamMarks]);
  useEffect(() => {
    localStorage.setItem('school_teacher', JSON.stringify(teacher));
  }, [teacher]);
  useEffect(() => {
    localStorage.setItem('school_toppers', JSON.stringify(toppers));
  }, [toppers]);
  useEffect(() => {
    localStorage.setItem('school_admin_credentials', JSON.stringify(adminCredentials));
  }, [adminCredentials]);
  useEffect(() => {
    localStorage.setItem('school_notifications', JSON.stringify(notifications));
  }, [notifications]);
  useEffect(() => {
    localStorage.setItem('school_stats', JSON.stringify(schoolStats));
  }, [schoolStats]);

  // Session states
  const [currentView, setCurrentView] = useState<'home' | 'cultural' | 'student-portal' | 'admin-dashboard'>('home');
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Login forms states
  const [showStudentLogin, setShowStudentLogin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Input states for login
  const [studentUser, setStudentUser] = useState('');
  const [studentPass, setStudentPass] = useState('');
  const [studentErr, setStudentErr] = useState('');

  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [adminErr, setAdminErr] = useState('');

  // Student Actions Handlers
  const handleAddLeaveRequest = (req: Omit<LeaveRequest, 'id' | 'studentId' | 'studentNameMar' | 'studentRoll' | 'className'>) => {
    if (!currentStudent) return;
    const newLeave: LeaveRequest = {
      ...req,
      id: `l-${Date.now()}`,
      studentId: currentStudent.id,
      studentNameMar: currentStudent.fullNameMar,
      studentRoll: currentStudent.rollNumber,
      className: currentStudent.class
    };
    setLeaveRequests(prev => [newLeave, ...prev]);
  };

  const handleAddComplaint = (subject: string, desc: string) => {
    if (!currentStudent) return;
    const newComplaint: Complaint = {
      id: `c-${Date.now()}`,
      studentId: currentStudent.id,
      studentRoll: currentStudent.rollNumber,
      studentNameMar: currentStudent.fullNameMar,
      className: currentStudent.class,
      subject,
      description: desc,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'PENDING'
    };
    setComplaints(prev => [newComplaint, ...prev]);
  };

  const handleSubmitHomework = (hwId: string, text: string, fileUrl?: string) => {
    if (!currentStudent) return;
    
    const newSubmission: HomeworkSubmission = {
      id: `hs-${Date.now()}`,
      homeworkId: hwId,
      studentId: currentStudent.id,
      submittedAt: new Date().toISOString().split('T')[0],
      textSubmission: text,
      fileUrl: fileUrl,
      status: 'PENDING'
    };
    
    setHomeworkSubmissions(prev => {
      const filtered = prev.filter(sub => !(sub.homeworkId === hwId && sub.studentId === currentStudent.id));
      return [newSubmission, ...filtered];
    });
  };

  const handleSubmitExam = (examId: string, answers: Record<string, string>, studentId: string) => {
    const exam = exams.find(e => e.id === examId);
    if (!exam) return;

    const hasDescriptive = exam.questions.some(q => q.type === 'Descriptive');
    const marksObtained: Record<string, number> = {};
    let totalScore = 0;

    exam.questions.forEach(q => {
      if (q.type === 'MCQ') {
        if (answers[q.id] === q.correctAnswer) {
          marksObtained[q.id] = q.maxMarks;
          totalScore += q.maxMarks;
        } else {
          marksObtained[q.id] = 0;
        }
      } else {
        marksObtained[q.id] = 0;
      }
    });

    const totalExamMarks = exam.questions.reduce((sum, q) => sum + q.maxMarks, 0);

    const newSubmission: ExamSubmission = {
      id: `sub-${Date.now()}`,
      studentId: studentId,
      examId: examId,
      submittedAt: new Date().toISOString(),
      answers,
      evaluated: !hasDescriptive,
      marksObtained,
      totalMarksObtained: totalScore,
      totalExamMarks
    };

    setExamSubmissions(prev => {
      const filtered = prev.filter(s => !(s.studentId === studentId && s.examId === examId));
      return [...filtered, newSubmission];
    });
  };

  // Login Form Submissions
  const handleStudentLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = students.find(s => s.username === studentUser && s.passwordHash === studentPass);
    if (found) {
      setCurrentStudent(found);
      setCurrentView('student-portal');
      setShowStudentLogin(false);
      setStudentUser('');
      setStudentPass('');
      setStudentErr('');
    } else {
      setStudentErr(language === 'mr' ? 'अवैध युझरनेम किंवा पासवर्ड!' : 'Invalid username or password!');
    }
  };

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser === adminCredentials.username && adminPass === adminCredentials.password) {
      setIsAdminLoggedIn(true);
      setCurrentView('admin-dashboard');
      setShowAdminLogin(false);
      setAdminUser('');
      setAdminPass('');
      setAdminErr('');
    } else {
      setAdminErr(language === 'mr' ? 'अवैध ॲडमिन क्रेडेंशियल्स!' : 'Invalid administrator credentials!');
    }
  };

  const handleLogout = () => {
    setCurrentStudent(null);
    setIsAdminLoggedIn(false);
    setCurrentView('home');
  };

  const handleQuickStudentSelect = (username: string) => {
    setStudentUser(username);
    setStudentPass('student123');
  };

  return (
    <div className="min-h-screen text-slate-800 bg-slate-50 flex flex-col font-sans">
      
      {/* 1. TOP GLOBAL NAVIGATION HEADER */}
      {currentView !== 'student-portal' && currentView !== 'admin-dashboard' && (
        <nav className="sticky top-0 z-45 bg-white/80 backdrop-blur-md border-b border-indigo-100 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('home')}>
                <div className="bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl p-2 text-white shadow-md shadow-indigo-200">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-base md:text-lg font-black tracking-tight text-indigo-950 uppercase">
                    {t.schoolName}
                  </h1>
                  <p className="text-[9px] text-indigo-600 font-bold tracking-widest leading-none mt-0.5 font-mono">
                    {language === 'mr' ? 'ज्ञान मंदिर सातारा' : 'ACADEMIC CENTRAL PORTAL'}
                  </p>
                </div>
              </div>

              {/* Desktop Menu links */}
              <div className="hidden lg:flex items-center space-x-6 text-sm font-bold text-slate-700">
                <button 
                  id="nav-home"
                  onClick={() => setCurrentView('home')} 
                  className={`cursor-pointer hover:text-indigo-600 transition-all ${currentView === 'home' ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' : ''}`}
                >
                  {t.home}
                </button>
                <button 
                  id="nav-cultural"
                  onClick={() => setCurrentView('cultural')} 
                  className={`cursor-pointer hover:text-indigo-600 transition-all ${currentView === 'cultural' ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' : ''}`}
                >
                  {t.culturalDept}
                </button>
                <button 
                  id="nav-student-login"
                  onClick={() => setShowStudentLogin(true)} 
                  className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-full transition-all flex items-center space-x-1 border border-slate-200"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>{t.studentLogin}</span>
                </button>
                <button 
                  id="nav-admin-login"
                  onClick={() => setShowAdminLogin(true)} 
                  className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center space-x-1"
                >
                  <Shield className="w-4 h-4 text-indigo-200" />
                  <span>{t.adminLogin}</span>
                </button>

                {/* LANGUAGE SWITCH DIAL */}
                <div className="border-l border-slate-200 pl-4 flex space-x-1">
                  <button 
                    id="lang-mr-btn"
                    onClick={() => setLanguage('mr')} 
                    className={`px-2 py-1 text-xs rounded-lg font-black transition-all ${language === 'mr' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'}`}
                  >
                    मराठी
                  </button>
                  <button 
                    id="lang-en-btn"
                    onClick={() => setLanguage('en')} 
                    className={`px-2 py-1 text-xs rounded-lg font-black transition-all ${language === 'en' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'}`}
                  >
                    ENG
                  </button>
                </div>
              </div>

              {/* Mobile Menu Icon */}
              <div className="lg:hidden flex items-center space-x-2">
                {/* Language support toggle fast for mobile */}
                <button 
                  onClick={() => setLanguage(language === 'mr' ? 'en' : 'mr')}
                  className="bg-slate-100 p-2 rounded-lg text-xs font-black text-slate-700 border"
                >
                  {language === 'mr' ? 'ENG' : 'मराठी'}
                </button>
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                  className="p-2 text-slate-600 hover:text-emerald-700"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>

            </div>
          </div>

          {/* Mobile responsive drawer overlay */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-6 space-y-3 flex flex-col font-bold text-sm text-slate-800"
              >
                <button 
                  onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }} 
                  className="text-left py-2 hover:text-indigo-600"
                >
                  {t.home}
                </button>
                <button 
                  onClick={() => { setCurrentView('cultural'); setMobileMenuOpen(false); }} 
                  className="text-left py-2 hover:text-indigo-600"
                >
                  {t.culturalDept}
                </button>
                <button 
                  onClick={() => { setShowStudentLogin(true); setMobileMenuOpen(false); }} 
                  className="py-2.5 px-4 bg-slate-100 text-slate-700 rounded-lg flex items-center justify-center space-x-1.5 border"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>{t.studentLogin}</span>
                </button>
                <button 
                  onClick={() => { setShowAdminLogin(true); setMobileMenuOpen(false); }} 
                  className="py-2.5 px-4 bg-indigo-600 text-white rounded-lg flex items-center justify-center space-x-1.5 shadow-md"
                >
                  <Shield className="w-4 h-4 text-indigo-300" />
                  <span>{t.adminLogin}</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      )}

      {/* 2. BODY CONTENT PANEL ROUTER */}
      <div className="flex-1">
        
        {currentView === 'home' && (
          <HomeView 
            language={language}
            onNavigate={(v: any) => {
              if (v === 'student-login') setShowStudentLogin(true);
              else if (v === 'admin-login') setShowAdminLogin(true);
              else setCurrentView(v);
            }}
            notifications={notifications}
            events={events}
            nmmsResults={nmmsResults}
            teacher={teacher}
            toppers={toppers}
            schoolStats={schoolStats}
            galleryItems={galleryItems}
          />
        )}

        {currentView === 'cultural' && (
          <section className="py-12 px-4 max-w-7xl mx-auto space-y-12">
            <div className="space-y-3">
              <span className="text-indigo-600 font-extrabold uppercase text-xs md:text-sm tracking-widest">{t.culturalDept}</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-none">
                {language === 'mr' ? 'कला व सांस्कृतिक उपक्रम दालन' : 'Creative & Extra-Curricular Timeline'}
              </h2>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-3xl">
                विद्यार्थ्यांच्या अंगीभूत सुप्त कलागुणांना वाव देण्यासाठी स्नेहसंमेलन, स्पर्धात्मक शिबिरे व विविध राष्ट्रीय सण उत्सवांचे सुंदर आयोजन.
              </p>
              <div className="w-16 h-1 bg-indigo-600 rounded-full mt-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-lg flex flex-col justify-between h-[18rem] hover:shadow-xl transition-all">
                  <div className="space-y-4">
                    <span className="bg-pink-100 text-pink-800 font-mono font-bold px-3 py-1 rounded-full text-[10px] w-fit block">{event.date}</span>
                    <h3 className="text-lg font-black text-slate-900 leading-snug">{language === 'mr' ? event.titleMar : event.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                      {language === 'mr' ? event.descriptionMar : event.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 mt-4 text-[10px] font-mono font-extrabold text-slate-400">
                    CATEGORY: {language === 'mr' ? event.categoryMar : event.category}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {currentView === 'student-portal' && currentStudent && (
          <StudentDashboard 
            student={currentStudent}
            language={language}
            onLogout={handleLogout}
            exams={exams}
            homework={homework}
            academicResults={academicResults}
            nmmsResults={nmmsResults}
            leaveRequests={leaveRequests}
            complaints={complaints}
            notifications={notifications}
            offlineExamMarks={offlineExamMarks}
            examSubmissions={examSubmissions}
            homeworkSubmissions={homeworkSubmissions}
            onAddLeaveRequest={handleAddLeaveRequest}
            onAddComplaint={handleAddComplaint}
            onSubmitHomework={handleSubmitHomework}
            onSubmitExam={handleSubmitExam}
          />
        )}

        {currentView === 'admin-dashboard' && isAdminLoggedIn && (
          <AdminDashboard 
            language={language}
            onLogout={handleLogout}
            students={students}
            exams={exams}
            homework={homework}
            academicResults={academicResults}
            leaveRequests={leaveRequests}
            complaints={complaints}
            events={events}
            nmmsResults={nmmsResults}
            notifications={notifications}
            offlineExamMarks={offlineExamMarks}
            schoolStats={schoolStats}
            examSubmissions={examSubmissions}
            homeworkSubmissions={homeworkSubmissions}
            setStudents={setStudents}
            setAcademicResults={setAcademicResults}
            setExams={setExams}
            setHomework={setHomework}
            setLeaveRequests={setLeaveRequests}
            setComplaints={setComplaints}
            setEvents={setEvents}
            setNmmsResults={setNmmsResults}
            setOfflineExamMarks={setOfflineExamMarks}
            setNotifications={setNotifications}
            setSchoolStats={setSchoolStats}
            setExamSubmissions={setExamSubmissions}
            setHomeworkSubmissions={setHomeworkSubmissions}
            teacher={teacher}
            setTeacher={setTeacher}
            toppers={toppers}
            setToppers={setToppers}
            adminCredentials={adminCredentials}
            setAdminCredentials={setAdminCredentials}
            galleryItems={galleryItems}
            setGalleryItems={setGalleryItems}
          />
        )}

      </div>

      {/* 3. CONFIDENTIAL MODALS DIALOG SLIDERS (Confidential Login Gates) */}
      
      {/* Student Login Gate Overlay Drawer */}
      <AnimatePresence>
        {showStudentLogin && (
          <div className="fixed inset-0 bg-slate-950/45 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden max-w-md w-full relative"
            >
              <button 
                id="close-student-login"
                onClick={() => { setShowStudentLogin(false); setStudentErr(''); }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-6 md:p-8 space-y-6">
                <div className="text-center space-y-1">
                  <div className="bg-linear-to-tr from-cyan-50 to-blue-50 text-cyan-800 p-3 rounded-full w-14 h-14 mx-auto flex items-center justify-center border border-cyan-200">
                    <User className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight pt-2">{t.studentPortal}</h3>
                  <p className="text-xs text-slate-500 font-semibold">{language === 'mr' ? 'तुमचा युझरनेम आणि पासवर्ड टाकून लॉगिन करा' : 'Enter your username and password to log in'}</p>
                </div>

                <form onSubmit={handleStudentLoginSubmit} className="space-y-4 text-xs font-bold font-sans">
                  <div className="space-y-1">
                    <label className="text-slate-500 uppercase">{t.username}</label>
                    <input 
                      type="text" 
                      required 
                      id="student-username-input"
                      placeholder={language === 'mr' ? 'युझरनेम प्रविष्ट करा' : 'Enter username'}
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg text-sm font-mono"
                      value={studentUser}
                      onChange={(e) => setStudentUser(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-500 uppercase">{t.password}</label>
                    <input 
                      type="password" 
                      required 
                      id="student-password-input"
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg text-sm font-mono"
                      value={studentPass}
                      onChange={(e) => setStudentPass(e.target.value)}
                    />
                  </div>

                  {studentErr && (
                    <div className="bg-red-50 text-red-800 p-2.5 rounded-lg border border-red-200/50 text-xs font-semibold">
                      {studentErr}
                    </div>
                  )}

                  <button 
                    id="submit-student-login"
                    type="submit" 
                    className="cursor-pointer bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-extrabold py-3 w-full rounded-lg text-center shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    {t.loginBtn}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Login Gate Overlay Drawer */}
      <AnimatePresence>
        {showAdminLogin && (
          <div className="fixed inset-0 bg-slate-950/45 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden max-w-md w-full relative"
            >
              <button 
                id="close-admin-login"
                onClick={() => { setShowAdminLogin(false); setAdminErr(''); }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-6 md:p-8 space-y-6">
                <div className="text-center space-y-1">
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-800 p-3 rounded-full w-14 h-14 mx-auto flex items-center justify-center border border-indigo-200">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight pt-2">{t.adminPanel}</h3>
                  <p className="text-xs text-slate-500 font-semibold">{language === 'mr' ? 'शालेय व्यवस्थापन नियंत्रण कक्ष' : 'School System Administrator access'}</p>
                </div>

                <form onSubmit={handleAdminLoginSubmit} className="space-y-4 text-xs font-bold">
                  <div className="space-y-1">
                    <label className="text-slate-500 uppercase">{t.username}</label>
                    <input 
                      type="text" 
                      required 
                      id="admin-username-input"
                      placeholder={language === 'mr' ? 'युझरनेम प्रविष्ट करा' : 'Enter username'}
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg text-sm font-mono"
                      value={adminUser}
                      onChange={(e) => setAdminUser(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-500 uppercase">{t.password}</label>
                    <input 
                      type="password" 
                      required 
                      id="admin-password-input"
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg text-sm font-mono"
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                    />
                  </div>

                  {adminErr && (
                    <div className="bg-red-50 text-red-800 p-2.5 rounded-lg border border-red-200/50 text-xs font-semibold">
                      {adminErr}
                    </div>
                  )}

                  <button 
                    id="submit-admin-login"
                    type="submit" 
                    className="cursor-pointer bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-extrabold py-3 w-full rounded-lg text-center shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    {t.loginBtn}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
