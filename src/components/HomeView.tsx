/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Award, Users, FileText, Calendar, MapPin, Phone, Mail, 
  ArrowRight, Clock, Star, Landmark, Volume2, ChevronLeft, ChevronRight, CheckSquare, Image as ImageIcon
} from 'lucide-react';
import { Student, AcademicResult, CulturalEvent, Notification, NMMSResult, Teacher, Topper, SchoolStats, GalleryItem } from '../types';
import { LanguageCode, translations } from '../utils/translations';
import { initialTeacher, initialSchoolStats } from '../data/initialData';
// @ts-ignore
import teacherPhoto from '../o.jpeg';

interface HomeViewProps {
  language: LanguageCode;
  onNavigate: (view: 'home' | 'cultural' | 'student-login' | 'admin-login') => void;
  notifications: Notification[];
  events: CulturalEvent[];
  nmmsResults: NMMSResult[];
  teacher?: Teacher;
  toppers?: Topper[];
  schoolStats?: SchoolStats;
  galleryItems?: GalleryItem[];
}

export default function HomeView({ 
  language, 
  onNavigate, 
  notifications, 
  events, 
  nmmsResults, 
  teacher = initialTeacher, 
  toppers = [], 
  schoolStats = initialSchoolStats,
  galleryItems: propGalleryItems = []
}: HomeViewProps) {
  const t = translations[language];
  const [activeNoticeIndex, setActiveNoticeIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Auto scroll notifications
  useEffect(() => {
    if (notifications.length <= 1) return;
    const interval = setInterval(() => {
      setActiveNoticeIndex((prev) => (prev + 1) % notifications.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [notifications]);

  // Gallery fallback if none is saved/passed from props
  const defaultGalleryItems: GalleryItem[] = [
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

  const galleryItems = propGalleryItems && propGalleryItems.length > 0 ? propGalleryItems : defaultGalleryItems;

  const handleNextGallery = () => {
    setGalleryIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrevGallery = () => {
    setGalleryIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <div className="min-h-screen text-slate-800 bg-slate-50 flex flex-col font-sans">
      
      {/* 2. DYNAMIC BROADCAST / ANNOUNCEMENT TICKER SECTION */}
      <AnimatePresence mode="wait">
        {notifications.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-amber-500 text-slate-900 border-y border-amber-600 px-4 py-3 shadow-md flex items-center justify-center"
          >
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="bg-amber-600 rounded-lg p-1 text-white animate-bounce shrink-0">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold bg-amber-600 text-white px-2 py-0.5 rounded-sm uppercase tracking-wide tracking-tight shrink-0">
                  {language === 'mr' ? 'महत्त्वाची सूचना' : 'ALERT'}
                </div>
                <div className="truncate text-xs md:text-sm font-semibold text-amber-950">
                  {language === 'mr' 
                    ? notifications[activeNoticeIndex].titleMar + ": " + notifications[activeNoticeIndex].messageMar
                    : notifications[activeNoticeIndex].title + ": " + notifications[activeNoticeIndex].message}
                </div>
              </div>
              
              <div className="flex items-center space-x-1 shrink-0 bg-amber-600/15 py-1 px-2 rounded-md hidden md:flex">
                <Clock className="w-4 h-4 text-amber-900" />
                <span className="text-xs font-mono font-medium">{notifications[activeNoticeIndex].date}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO HEADER HEADER BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-[#E6E0D5] via-[#EFEBE4] to-[#F5F2EB] text-slate-800 pt-10 pb-20 px-4 border-b border-slate-200">
        {/* Background glowing particles */}
        <div className="absolute top-0 left-0 w-full h-full opacity-35 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#E5DCD0]/60 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#DCD4C8]/50 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Main Title Banner & Branding */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-[#FAF6EE] text-[#5C2314] md:px-4 md:py-2 px-3 py-1 rounded-full text-xs md:text-sm font-bold border border-[#EADDC9] self-start"
            >
              <Landmark className="md:w-5 md:h-5 w-4 h-4 text-[#D45D3B]" />
              <span>महाराष्ट्र शासन मान्यताप्राप्त माध्यमिक शाळा | सातारा</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none text-slate-900 font-sans">
                {language === 'mr' ? 'अपशिंगे हायस्कूल अपशिंगे' : 'Apshinge High School'}
              </h1>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button 
                id="hero-student-btn"
                onClick={() => onNavigate('student-login')}
                className="cursor-pointer bg-white text-slate-900 font-bold px-6 py-3 rounded-full shadow-lg shadow-slate-200/50 hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 text-sm md:text-base border border-slate-200"
              >
                <span>{t.studentLogin}</span>
                <ArrowRight className="w-5 h-5 text-[#BC4B2D]" />
              </button>
              <button 
                id="hero-admin-btn"
                onClick={() => onNavigate('admin-login')}
                className="cursor-pointer bg-indigo-600 hover:bg-indigo-505 text-white font-extrabold px-6 py-3 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 text-xs md:text-sm"
              >
                <span>{t.adminLogin}</span>
              </button>
              <button 
                id="hero-cultural-btn"
                onClick={() => onNavigate('cultural')}
                className="cursor-pointer bg-white hover:bg-slate-100 text-[#3B160C] font-semibold px-6 py-3 rounded-full border border-slate-300 text-xs md:text-sm shadow-xs transition-all"
              >
                <span>{t.culturalDept}</span>
              </button>
            </motion.div>
          </div>

          {/* Teacher Section Profile (Prominent Hero Graphic Display) */}
          <div className="lg:col-span-5 relative mt-4 md:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative bg-white rounded-3xl p-6 border border-slate-200/60 shadow-xl overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/30 rounded-full blur-2xl group-hover:bg-indigo-100/40 transition-all duration-500"></div>
              
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Custom Teacher Representation - Loaded from user photograph o.jpeg */}
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full p-1.5 bg-gradient-to-tr from-indigo-300 to-teal-300 shadow-md overflow-hidden aspect-square flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-slate-100 overflow-hidden relative flex items-center justify-center">
                    <img 
                      src={teacherPhoto} 
                      alt={language === 'mr' ? teacher?.nameMar || 'Mangal Dattatray Karande' : teacher?.name || 'Mangal Dattatray Karande'} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Glowing state badge */}
                  <span className="absolute bottom-2 right-2 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-800 tracking-wide">
                    {language === 'mr' ? teacher.nameMar : teacher.name}
                  </h3>
                  <p className="text-[#E76F51] font-mono text-xs md:text-sm font-bold uppercase tracking-wider">
                    {language === 'mr' ? 'वर्ग शिक्षिका' : 'Class Teacher / Invalidation In-charge'}
                  </p>
                  <div className="text-xs text-slate-600 font-semibold space-y-1.5 pt-2.5 border-t border-slate-100 mt-2.5 max-w-sm">
                    <p>🎓 {t.subjects.english} & {t.subjects.marathi} Expert</p>
                    <p>💼 {language === 'mr' ? `पात्रता: ${teacher.qualification}` : `Qualification: ${teacher.qualification}`}</p>
                    <p>📍 {language === 'mr' ? `पत्ता: ${teacher.address}` : `Residency: ${teacher.address}`}</p>
                  </div>
                </div>

                {/* Message Quote Panel */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed italic text-left max-w-sm relative mt-2.5 font-medium">
                  <span className="absolute -top-3 -left-1 text-4xl text-[#EADDC9] select-none font-serif opacity-40">“</span>
                  {language === 'mr' 
                    ? 'शाळेतील प्रत्येक विद्यार्थी गुणवत्ता यादीत यावा आणि त्याचा बौद्धिक विकास व्हावा यासाठी आम्ही सतत कटिबद्ध आहोत.'
                    : 'We strive for extreme academic excellence, scholarship preparation like NMMS and value education to prepare every rural student of Satara for global leadership.'}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 3. SHINY INTERACTIVE STATS SECTION COUNTERS */}
      <section className="-mt-8 pb-12 px-4 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          
          <div className="bg-white/80 backdrop-blur-md border border-slate-100 p-5 rounded-2xl shadow-xl flex items-center space-x-4">
            <div className="bg-gradient-to-tr from-indigo-500 to-violet-600 rounded-xl p-3 text-white shadow-md shadow-indigo-150">
              <Users className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-slate-900">
                {language === 'mr' ? schoolStats.totalStudentsMar : schoolStats.totalStudents}
              </p>
              <p className="text-xs md:text-sm font-medium text-slate-500">{language === 'mr' ? 'एकूण विद्यार्थी' : 'Total Enrolled Students'}</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-slate-100 p-5 rounded-2xl shadow-xl flex items-center space-x-4">
            <div className="bg-gradient-to-tr from-pink-500 to-rose-600 rounded-xl p-3 text-white shadow-md shadow-pink-150">
              <Star className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-slate-900">
                {language === 'mr' ? schoolStats.sscPassPercentageMar : schoolStats.sscPassPercentage}
              </p>
              <p className="text-xs md:text-sm font-medium text-slate-500">{language === 'mr' ? '१० वी एसएससी निकाल' : 'SSC 10th Pass Percentage'}</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-slate-100 p-5 rounded-2xl shadow-xl flex items-center space-x-4">
            <div className="bg-gradient-to-tr from-purple-500 to-violet-600 rounded-xl p-3 text-white shadow-md shadow-violet-150">
              <Award className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-slate-900">
                {language === 'mr' ? schoolStats.nmmsQualifiersMar : schoolStats.nmmsQualifiers}
              </p>
              <p className="text-xs md:text-sm font-medium text-slate-500">{language === 'mr' ? 'एनएमएमएस शिष्यवृत्तीधारक' : 'NMMS Scholarship Qualifiers'}</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-slate-100 p-5 rounded-2xl shadow-xl flex items-center space-x-4">
            <div className="bg-gradient-to-tr from-amber-500 to-orange-600 rounded-xl p-3 text-white shadow-md shadow-amber-150">
              <CheckSquare className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-extrabold text-slate-900">
                {language === 'mr' ? schoolStats.highlyQualifiedTeachersMar : schoolStats.highlyQualifiedTeachers}
              </p>
              <p className="text-xs md:text-sm font-medium text-slate-500">{language === 'mr' ? 'तज्ज्ञ शिक्षक वृंद' : 'Highly Qualified Teachers'}</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. MAIN ENTRANCE DESCRIPTIONS / PRINCIPAL'S DESK */}
      <section className="py-12 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative">
          <div className="absolute top-4 left-4 w-full h-full bg-slate-200 / rounded-2xl -z-10 border border-slate-200"></div>
          {/* Glass banner representing campus drawing illustration */}
          <div className="bg-gradient-to-br from-indigo-800 to-violet-950 p-8 rounded-2xl text-white shadow-2xl relative overflow-hidden h-80 flex flex-col justify-between">
            <div className="absolute top-0 right-0 opacity-15 w-48 h-48 rounded-full border border-white"></div>
            <div>
              <span className="bg-indigo-500/20 text-indigo-350 border border-indigo-500/40 font-mono text-xs font-bold uppercase rounded-full px-3 py-1">Apshinge High School</span>
              <h3 className="text-3xl font-extrabold text-white mt-4 tracking-tight leading-8">
                {language === 'mr' ? 'आदर्श शैक्षणिक केंद्र अपशिंगे' : 'Model Rural High School - Satara'}
              </h3>
            </div>
            <div className="border-t border-white/15 pt-4">
              <p className="text-xs text-indigo-200">Established in Satara, Maharashtra State.</p>
              <p className="text-sm font-bold text-white mt-1">✓ Smart Classroom Equipped</p>
              <p className="text-sm font-bold text-white">✓ Free NMMS Training Modules</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center space-x-4 bg-gradient-to-r from-[#EDE6DC] to-[#F5EFE6] p-4 rounded-xl border border-[#DCD4C8] shadow-2xs self-start">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-[#E76F51] border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-xs">M</div>
              <div className="w-10 h-10 rounded-full bg-[#357D5D] border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-xs">A</div>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">{language === 'mr' ? 'शैक्षणिक प्रमुख' : 'Lead Educators / Panel'}</p>
              <p className="text-sm font-bold text-slate-800 font-sans">M. D. Karande & Board of Directors</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TOPPERS HALL OF FAME Podium Grid */}
      <section className="bg-gradient-to-b from-[#1E293B] to-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-indigo-400 font-extrabold uppercase text-xs md:text-sm tracking-widest">{language === 'mr' ? 'गुणवंत यशोमंदीर' : 'ACADEMIC HALL OF FAME'}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {language === 'mr' ? 'परीक्षा गुणवत्ताधारक व विशेष शिष्यवृत्ती विजेते' : 'Toppers & Outstanding Achievers'}
            </h2>
            <div className="w-24 h-1 bg-indigo-500 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6 pb-4">
            {toppers.map((topper, idx) => {
              const theme = 
                topper.examName === 'NMMS' 
                  ? (idx === 0 
                      ? { gradient: 'from-yellow-400 to-amber-500', text: 'text-amber-300', border: 'border-yellow-400' }
                      : { gradient: 'from-slate-300 to-slate-400', text: 'text-slate-300', border: 'border-slate-300' })
                  : { gradient: 'from-emerald-400 to-cyan-500', text: 'text-emerald-300', border: 'border-emerald-400' };
              
              const avatarColors = 
                topper.avatarSelection === 'female' 
                  ? { primary: '#fcd34d', secondary: '#ea580c' } 
                  : topper.avatarSelection === 'male'
                  ? { primary: '#cbd5e1', secondary: '#0284c7' }
                  : { primary: '#a7f3d0', secondary: '#047857' };

              return (
                <motion.div 
                  key={topper.id}
                  whileHover={{ y: -6 }}
                  className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/60 shadow-xl flex flex-col items-center text-center relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${theme.gradient}`}></div>
                  <div className={`absolute top-4 right-4 bg-slate-500/10 text-[10px] px-2.5 py-1 rounded-full font-bold border border-slate-500/20 ${theme.text}`}>
                    {topper.examName === 'NMMS' ? `⭐ NMMS ${language === 'mr' ? topper.rankMar : topper.rank}` : `🎓 SSC ${language === 'mr' ? topper.rankMar : topper.rank}`}
                  </div>
                  
                  <div className={`w-28 h-28 rounded-full border-4 shadow-md flex items-center justify-center bg-slate-950 mt-4 overflow-hidden ${theme.border}`}>
                    {topper.photoUrl ? (
                      <img 
                        src={topper.photoUrl} 
                        alt={topper.name} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer" 
                      />
                    ) : (
                      <svg viewBox="0 0 40 40" className="w-20 h-20 text-slate-300">
                        <path d="M20,10 C22.7,10 25,12.3 25,15 C25,17.7 22.7,20 20,20 C17.3,20 15,17.7 15,15 C15,12.3 17.3,10 20,10 Z" fill={avatarColors.primary} />
                        <path d="M10,32 C10,26.5 14.5,23 20,23 C25.5,23 30,26.5 30,32 L10,32 Z" fill={avatarColors.secondary} />
                      </svg>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mt-4">
                    {language === 'mr' ? topper.nameMar : topper.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-semibold font-mono mt-1">
                    {topper.examName === 'NMMS' 
                      ? `${language === 'mr' ? 'एकूण प्राप्त गुण' : 'Total Score'}: ${topper.marksOrPercentage}`
                      : `${language === 'mr' ? 'टक्केवारी' : 'Percentage'}: ${topper.marksOrPercentage}`
                    }
                  </p>
                  <p className="text-sm text-slate-300 mt-2 italic leading-relaxed">
                    "{language === 'mr' ? topper.descriptionMar : topper.descriptionEng}"
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. DYNAMIC TEXT SLIDE / GALLERY ILLUSTRATION */}
      <section className="py-16 px-4 bg-slate-100">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl relative font-sans">
          
          <div className={`p-8 md:p-12 text-white bg-gradient-to-br ${galleryItems[galleryIndex].bgGradient || 'from-teal-650 to-teal-900'} relative transition-all duration-700 h-[28rem] flex flex-col justify-between overflow-hidden rounded-3xl`}>
            {galleryItems[galleryIndex].photoUrl && (
              <>
                <img 
                  src={galleryItems[galleryIndex].photoUrl} 
                  alt={galleryItems[galleryIndex].titleMar} 
                  className="absolute inset-0 w-full h-full object-cover z-0" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-900/60 z-10 animate-fade-in"></div>
              </>
            )}
            
            <div className="flex justify-between items-center relative z-20">
              <span className="font-mono text-xs uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" /> 
                {language === 'mr' ? 'गॅलरी चित्रदालन' : 'Photo Gallery'} &bull; {galleryIndex + 1}/{galleryItems.length}
              </span>
              <ImageIcon className="w-8 h-8 opacity-40" />
            </div>

            <div className="space-y-4 relative z-20">
              <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                {language === 'mr' ? galleryItems[galleryIndex].titleMar : galleryItems[galleryIndex].titleEng}
              </h3>
              <p className="text-lg text-white/90 font-medium leading-relaxed max-w-xl">
                {language === 'mr' ? galleryItems[galleryIndex].descrMar : galleryItems[galleryIndex].descrEng}
              </p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/10 relative z-20">
              <div className="text-xs text-white/60">
                अपशिंगे हायस्कूल अपशिंगे &copy; २०२६
              </div>
              <div className="flex space-x-2">
                <button 
                  id="gallery-prev"
                  onClick={handlePrevGallery} 
                  className="cursor-pointer bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-md transition-all border border-white/10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  id="gallery-next"
                  onClick={handleNextGallery} 
                  className="cursor-pointer bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-md transition-all border border-white/10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. HIGHLY ACCENTED CULTURAL & EXTRA-CURRICULAR SLIDER SECTION */}
      <section className="py-16 px-4 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-emerald-700 font-extrabold uppercase text-sm tracking-wider">{t.culturalDept}</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              {language === 'mr' ? 'सांस्कृतिक दिन आणि सण उत्सव' : 'Vibrant Cultural & Extra-Curricular Events'}
            </h2>
          </div>
          <button 
            id="more-cultural-btn"
            onClick={() => onNavigate('cultural')}
            className="cursor-pointer bg-emerald-700 hover:bg-emerald-600 font-semibold text-white text-xs md:text-sm px-5 py-2.5 rounded-lg flex items-center space-x-1 border border-emerald-600 transition-all shadow-md self-start"
          >
            <span>{language === 'mr' ? 'सर्व उपक्रम पहा' : 'View All Activites'}</span>
            <ArrowRight className="w-4 h-4 text-emerald-200" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.slice(0, 2).map((event) => (
            <div key={event.id} className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-lg flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 bg-pink-100 text-pink-800 font-bold px-3 py-1 rounded-full text-xs self-start w-fit">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{event.date}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{language === 'mr' ? event.titleMar : event.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {language === 'mr' ? event.descriptionMar : event.description}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 mt-4 text-xs font-mono font-bold text-slate-400">
                CATEGORY: {language === 'mr' ? event.categoryMar : event.category}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FOOTER WITH MAP SIMULATION & ACCENT CARDS */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-slate-800 pb-12">
          
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-2xl font-extrabold text-white tracking-tight">{t.schoolName}</h3>
            <p className="text-sm leading-relaxed text-slate-400">
              {language === 'mr' 
                ? 'गुणवत्तापूर्ण माध्यमिक शिक्षण आणि ग्रामीण महाराष्ट्रातील तरुणांचे उज्ज्वल भविष्य घडवण्यासाठी स्थापन झालेले आग्रहाचे केंद्र.'
                : 'A premium educational center dedicated to offering dynamic learning tools, NMMS preparations, and top-tier state-board evaluations in Apshinge.'}
            </p>
            <p className="text-xs text-slate-500 font-mono">Dise Code: 27310505102 &bull; Satara</p>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-lg font-bold text-white tracking-wide">{t.contactUs}</h4>
            <div className="space-y-3 text-sm font-medium">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>{language === 'mr' ? 'मु. पो. अपशिंगे, तालुका कोरेगाव, जिल्हा सातारा, महाराष्ट्र - ४१५५११' : 'At/Post Apshinge, Taluka Koregaon, District Satara, Maharashtra - 415511'}</span>
              </div>
            </div>
          </div>

          {/* Interactive Simulated Map Graphic */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-lg font-bold text-white tracking-wide">{language === 'mr' ? 'शालेय नकाशा' : 'Geographic Location'}</h4>
            <div className="bg-slate-900 h-40 rounded-xl border border-slate-800 relative z-10 overflow-hidden flex flex-col justify-between p-4">
              <div className="absolute top-0 left-0 w-full h-full opacity-35 pointer-events-none">
                {/* Simulated geographic grids vector */}
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#22c55e" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  <circle cx="120" cy="60" r="14" fill="#ef4444" opacity="0.6" className="animate-pulse" />
                  <circle cx="120" cy="60" r="4" fill="#ef4444" />
                </svg>
              </div>
              <div className="text-xs font-bold text-emerald-400 font-mono tracking-widest flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>GPS: 17.6974&deg; N, 74.0754&deg; E</span>
              </div>
              <div className="text-xs text-slate-400 bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
                Apshinge High School, Near Koregaon-Satara Road Junction.
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between text-xs text-slate-500 font-medium">
          <p className="mb-4 lg:mb-0">&copy; २०२६ अपशिंगे हायस्कूल अपशिंगे. सर्व हक्क सुरक्षित.</p>
          <div className="bg-slate-900/90 border border-indigo-500/25 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 shadow-lg text-xs">
            <div className="flex items-center gap-1.5">
              <span className="bg-indigo-500/10 text-indigo-400 font-black px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">Developer</span>
              <span className="text-slate-200 font-black text-sm">Omkar vilas Karande</span>
            </div>
            <div className="hidden sm:block text-slate-700">|</div>
            <div className="flex items-center gap-2">
              <span className="text-[#E1306C] font-extrabold">Instagram:</span>
              <a href="https://instagram.com/omkarkarande12" target="_blank" rel="noopener noreferrer" className="font-mono font-bold text-slate-100 hover:underline">@omkarkarande12</a>
            </div>
            <div className="hidden sm:block text-slate-700">|</div>
            <div className="flex items-center gap-2">
              <span className="text-teal-400 font-extrabold">Mobile:</span>
              <a href="tel:+919834534812" className="font-mono font-bold text-slate-100 hover:underline">9834534812</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
