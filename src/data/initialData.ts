/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Student, Teacher, Exam, Homework, AcademicResult, NMMSResult, LeaveRequest, Complaint, CulturalEvent, Notification, Topper, SchoolStats } from '../types';

export const initialTeacher: Teacher = {
  name: "Mangal Dattatray Karande",
  nameMar: "मंगळ दत्तात्रय कारंडे",
  qualification: "MA MEd (एम.ए. एम.एड.)",
  dob: "1982-07-21",
  address: "मु. पो. कोरेगाव, ता. कोरेगाव, जि. सातारा",
};

// Initial students pre-populated with actual names from the uploaded screen captures
export const initialStudents: Student[] = [
  // Class 6th Students (from Term 1 Exam spreadsheet)
  {
    id: "601",
    firstName: "Akshara",
    middleName: "Nitin",
    surname: "Bhosle",
    fullNameMar: "भोसले अक्षरा नितीन",
    fullNameEng: "Bhosle Akshara Nitin",
    email: "aksharab@gmail.com",
    phone: "9876543201",
    aadhaar: "4532-8765-1011",
    address: "अपशिंगे, कोरेगाव",
    class: "6th",
    division: "A",
    rollNumber: "1",
    parentName: "नितीन भोसले",
    parentPhone: "9876543200",
    bankName: "State Bank of India",
    passbookNo: "30514210998",
    ifsc: "SBIN0001221",
    scholarshipDetails: "NMMS पात्र लाभार्थी",
    username: "akshara6",
    passwordHash: "student123"
  },
  {
    id: "602",
    firstName: "Durga",
    middleName: "Sunil",
    surname: "Bhosle",
    fullNameMar: "भोसले दुर्गा सुनिल",
    fullNameEng: "Bhosle Durga Sunil",
    email: "durgab@gmail.com",
    phone: "9876543202",
    aadhaar: "4532-8765-1012",
    address: "अपशिंगे, कोरेगाव",
    class: "6th",
    division: "A",
    rollNumber: "2",
    parentName: "सुनिल भोसले",
    parentPhone: "9876543202",
    bankName: "Bank of Baroda",
    passbookNo: "21049818820",
    ifsc: "BARBOAPS24",
    username: "durga6",
    passwordHash: "student123"
  },
  {
    id: "603",
    firstName: "Tanvi",
    middleName: "Kiran",
    surname: "Bhosle",
    fullNameMar: "भोसले तन्वी किरण",
    fullNameEng: "Bhosle Tanvi Kiran",
    email: "tanvib@gmail.com",
    phone: "9876543203",
    aadhaar: "4532-8765-1013",
    address: "अ/प अपशिंगे",
    class: "6th",
    division: "A",
    rollNumber: "3",
    parentName: "किरण भोसले",
    parentPhone: "9876543203",
    username: "tanvi6",
    passwordHash: "student123"
  },
  {
    id: "604",
    firstName: "Sanskruti",
    middleName: "Ramesh",
    surname: "Gurav",
    fullNameMar: "गुरव संस्कृती रमेश",
    fullNameEng: "Gurav Sanskruti Ramesh",
    email: "sanskrutig@gmail.com",
    phone: "9876543204",
    aadhaar: "4532-8765-1014",
    address: "अपशिंगे, कोरेगाव",
    class: "6th",
    division: "A",
    rollNumber: "4",
    parentName: "रमेश गुरव",
    parentPhone: "9876543204",
    username: "sanskruti6",
    passwordHash: "student123"
  },
  {
    id: "605",
    firstName: "Purva",
    middleName: "Dinesh",
    surname: "Madane",
    fullNameMar: "मदने पुर्वा दिनेश",
    fullNameEng: "Madane Purva Dinesh",
    email: "purvam@gmail.com",
    phone: "9876543205",
    aadhaar: "4532-8765-1015",
    address: "कोरेगाव रोड, अपशिंगे",
    class: "6th",
    division: "A",
    rollNumber: "5",
    parentName: "दिनेश मदने",
    parentPhone: "9876543205",
    username: "purva6",
    passwordHash: "student123"
  },
  {
    id: "606",
    firstName: "Shravani",
    middleName: "Anil",
    surname: "Mane",
    fullNameMar: "माने श्रावणी अनिल",
    fullNameEng: "Mane Shravani Anil",
    email: "shravanim@gmail.com",
    phone: "9876543206",
    aadhaar: "4532-8765-1016",
    address: "अ/प कोरेगाव जवळ, अपशिंगे",
    class: "6th",
    division: "A",
    rollNumber: "6",
    parentName: "अनिल माने",
    parentPhone: "9876543206",
    username: "shravani6",
    passwordHash: "student123"
  },

  // Class 9th Students (from English evaluation spreadsheet)
  {
    id: "901",
    firstName: "Ishwari",
    middleName: "Sachin",
    surname: "Bhosle",
    fullNameMar: "भोसले ईश्वरी सचिन",
    fullNameEng: "Bhosle Ishwari Sachin",
    email: "ishwarisb@gmail.com",
    phone: "9102938475",
    aadhaar: "8821-4433-2211",
    address: "अपशिंगे गावठाण",
    class: "9th",
    division: "B",
    rollNumber: "1",
    parentName: "सचिन भोसले",
    parentPhone: "9102938400",
    bankName: "Bank of Maharashtra",
    ifsc: "MAHB0000854",
    passbookNo: "60512849202",
    username: "ishwari9",
    passwordHash: "student123"
  },
  {
    id: "902",
    firstName: "Tanvi",
    middleName: "Krishnat",
    surname: "Bhosle",
    fullNameMar: "भोसले तन्वी कृष्णत",
    fullNameEng: "Bhosle Tanvi Krishnat",
    email: "tanvikb@gmail.com",
    phone: "9102938476",
    aadhaar: "8821-4433-2212",
    address: "अपशिंगे गावठाण",
    class: "9th",
    division: "B",
    rollNumber: "2",
    parentName: "कृष्णत भोसले",
    parentPhone: "9102938401",
    username: "tanvik9",
    passwordHash: "student123"
  },
  {
    id: "903",
    firstName: "Vaishnavi",
    middleName: "Sopan",
    surname: "Bhosle",
    fullNameMar: "भोसले वैष्णवी सोपान",
    fullNameEng: "Bhosle Vaishnavi Sopan",
    email: "vaishnavisb@gmail.com",
    phone: "9102938477",
    aadhaar: "8821-4433-2213",
    address: "नवी वस्ती, अपशिंगे",
    class: "9th",
    division: "B",
    rollNumber: "3",
    parentName: "सोपान भोसले",
    parentPhone: "9102938402",
    username: "vaishnavi9",
    passwordHash: "student123"
  },
  {
    id: "904",
    firstName: "Anushka",
    middleName: "Deepak",
    surname: "Budhavale",
    fullNameMar: "बुधावले अनुष्का दिपक",
    fullNameEng: "Budhavale Anushka Deepak",
    email: "anushkab@gmail.com",
    phone: "9102938478",
    aadhaar: "8821-4433-2214",
    address: "बुधावले गल्ली, अपशिंगे",
    class: "9th",
    division: "B",
    rollNumber: "4",
    parentName: "दिपक बुधावले",
    parentPhone: "9102938403",
    username: "anushka9",
    passwordHash: "student123"
  },
  {
    id: "905",
    firstName: "Kartiki",
    middleName: "Dadaso",
    surname: "Budhavale",
    fullNameMar: "बुधावले कार्तिकी दादासो",
    fullNameEng: "Budhavale Kartiki Dadaso",
    email: "kartikib@gmail.com",
    phone: "9102938479",
    aadhaar: "8821-4433-2215",
    address: "बुधावले गल्ली, अपशिंगे",
    class: "9th",
    division: "B",
    rollNumber: "5",
    parentName: "दादासो बुधावले",
    parentPhone: "9102938404",
    username: "kartiki9",
    passwordHash: "student123"
  }
];

// Pre-populate actual academic marks matching exactly the photos shared!
export const initialAcademicResults: AcademicResult[] = [
  // Class 6th First Term Marks matching image 2 exactly
  {
    studentId: "601", // Bhosle Akshara Nitin
    class: "6th",
    semester: "Sem1",
    year: "2024-25",
    subjects: {
      marathi: { subjectName: "Marathi", subjectNameMar: "मराठी", totalMarks: 83, grade: "અ-૨", formative_5_6: { oral: 8, project: 17, selfStudy: 8, openBook: 9, total: 42 }, summative_5_6: { oral_practical: 8, written: 33, total: 41 } },
      hindi: { subjectName: "Hindi", subjectNameMar: "हिंदी", totalMarks: 83, grade: "અ-૨" },
      english: { subjectName: "English", subjectNameMar: "इंग्रजी", totalMarks: 96, grade: "અ-१" },
      maths: { subjectName: "Maths", subjectNameMar: "गणित", totalMarks: 89, grade: "અ-२" },
      science: { subjectName: "Science", subjectNameMar: "विज्ञान", totalMarks: 84, grade: "અ-२" },
      socialScience: { subjectName: "Social Science", subjectNameMar: "स.शास्त्र", totalMarks: 87, grade: "અ-२" },
      art: { subjectName: "Art", subjectNameMar: "कला", totalMarks: 89, grade: "અ-२" },
      karyaAnubhav: { subjectName: "Work Experience", subjectNameMar: "कार्यानुभव", totalMarks: 94, grade: "અ-१" },
      physicalEdu: { subjectName: "Physical Education", subjectNameMar: "शा.शिक्षण", totalMarks: 88, grade: "અ-२" },
    },
    finalTotal: 793,
    percentage: 88.1,
    grade: "अ-२",
    rank: 2,
  },
  {
    studentId: "602", // Bhosle Durga Sunil
    class: "6th",
    semester: "Sem1",
    year: "2024-25",
    subjects: {
      marathi: { subjectName: "Marathi", subjectNameMar: "मराठी", totalMarks: 86, grade: "અ-२" },
      hindi: { subjectName: "Hindi", subjectNameMar: "हिंदी", totalMarks: 91, grade: "અ-१" },
      english: { subjectName: "English", subjectNameMar: "इंग्रजी", totalMarks: 93, grade: "અ-१" },
      maths: { subjectName: "Maths", subjectNameMar: "गणित", totalMarks: 89, grade: "અ-२" },
      science: { subjectName: "Science", subjectNameMar: "विज्ञान", totalMarks: 87, grade: "અ-२" },
      socialScience: { subjectName: "Social Science", subjectNameMar: "स.शास्त्र", totalMarks: 87, grade: "અ-२" },
      art: { subjectName: "Art", subjectNameMar: "कला", totalMarks: 96, grade: "અ-१" },
      karyaAnubhav: { subjectName: "Work Experience", subjectNameMar: "कार्यानुभव", totalMarks: 97, grade: "અ-१" },
      physicalEdu: { subjectName: "Physical Education", subjectNameMar: "शा.शिक्षण", totalMarks: 82, grade: "અ-२" },
    },
    finalTotal: 808,
    percentage: 89.8,
    grade: "अ-२",
    rank: 1,
  },
  {
    studentId: "603", // Bhosle Tanvi Kiran
    class: "6th",
    semester: "Sem1",
    year: "2024-25",
    subjects: {
      marathi: { subjectName: "Marathi", subjectNameMar: "मराठी", totalMarks: 72, grade: "ब-१" },
      hindi: { subjectName: "Hindi", subjectNameMar: "हिंदी", totalMarks: 65, grade: "ब-२" },
      english: { subjectName: "English", subjectNameMar: "इंग्रजी", totalMarks: 65, grade: "ब-२" },
      maths: { subjectName: "Maths", subjectNameMar: "गणित", totalMarks: 76, grade: "ब-१" },
      science: { subjectName: "Science", subjectNameMar: "विज्ञान", totalMarks: 71, grade: "ब-१" },
      socialScience: { subjectName: "Social Science", subjectNameMar: "स.शास्त्र", totalMarks: 74, grade: "ब-१" },
      art: { subjectName: "Art", subjectNameMar: "कला", totalMarks: 80, grade: "अ-२" },
      karyaAnubhav: { subjectName: "Work Experience", subjectNameMar: "कार्यानुभव", totalMarks: 71, grade: "ब-१" },
      physicalEdu: { subjectName: "Physical Education", subjectNameMar: "शा.शिक्षण", totalMarks: 84, grade: "अ-२" },
    },
    finalTotal: 658,
    percentage: 73.1,
    grade: "ब-१",
    rank: 3,
  },

  // 9th English marks matching image 4 exactly
  {
    studentId: "901", // Bhosle Ishwari Sachin
    class: "9th",
    semester: "Combined",
    year: "2025-26",
    subjects: {
      english: {
        subjectName: "English",
        subjectNameMar: "इंग्रजी",
        totalMarks: 77,
        grade: "ब-१",
        evaluation_9_10: { oral_practical: 16, written: 61, total: 77 }
      },
      marathi: { subjectName: "Marathi", subjectNameMar: "मराठी", totalMarks: 82, grade: "अ-२" },
      hindi: { subjectName: "Hindi", subjectNameMar: "हिंदी", totalMarks: 79, grade: "ब-१" },
      maths: { subjectName: "Maths", subjectNameMar: "गणित", totalMarks: 85, grade: "अ-२" },
      science: { subjectName: "Science", subjectNameMar: "विज्ञान", totalMarks: 83, grade: "अ-२" },
      socialScience: { subjectName: "Social Science", subjectNameMar: "स.शास्त्र", totalMarks: 80, grade: "अ-२" },
    },
    finalTotal: 486,
    percentage: 81.0,
    grade: "अ-२",
    rank: 2,
  },
  {
    studentId: "902", // Bhosle Tanvi Krishnat
    class: "9th",
    semester: "Combined",
    year: "2025-26",
    subjects: {
      english: {
        subjectName: "English",
        subjectNameMar: "इंग्रजी",
        totalMarks: 83,
        grade: "अ-२",
        evaluation_9_10: { oral_practical: 18, written: 65, total: 83 }
      },
      marathi: { subjectName: "Marathi", subjectNameMar: "मराठी", totalMarks: 88, grade: "अ-२" },
      hindi: { subjectName: "Hindi", subjectNameMar: "हिंदी", totalMarks: 84, grade: "अ-२" },
      maths: { subjectName: "Maths", subjectNameMar: "गणित", totalMarks: 87, grade: "अ-२" },
      science: { subjectName: "Science", subjectNameMar: "विज्ञान", totalMarks: 85, grade: "अ-२" },
      socialScience: { subjectName: "Social Science", subjectNameMar: "स.शास्त्र", totalMarks: 86, grade: "अ-२" },
    },
    finalTotal: 513,
    percentage: 85.5,
    grade: "अ-२",
    rank: 1,
  }
];

// NMMS Initial Marks and Toppers
export const initialNMMSResults: NMMSResult[] = [
  {
    id: "n1",
    studentId: "601",
    studentNameMar: "भोसले अक्षरा नितीन",
    testName: "NMMS सराव परीक्षा १",
    className: "8th", // standard NMMS class
    marksObtained: 162,
    totalMarks: 180,
    rank: 1,
    remarksMar: "राज्य गुणवत्ता यादीत प्रथम",
  },
  {
    id: "n2",
    studentId: "602",
    studentNameMar: "भोसले दुर्गा सुनिल",
    testName: "NMMS सराव परीक्षा १",
    className: "8th",
    marksObtained: 154,
    totalMarks: 180,
    rank: 2,
    remarksMar: "जिल्हा गुणवत्ता यादीत द्वितीय",
  }
];

export const initialExams: Exam[] = [
  {
    id: "exam101",
    title: "Scholarship Practice Test 2026",
    titleMar: "शिष्यवृत्ती सराव परीक्षा २०२६",
    className: "8th",
    durationMinutes: 30,
    passwordHash: "aps8",
    isActive: true,
    questions: [
      {
        id: "q1",
        type: "MCQ",
        questionText: "Which is the smallest prime number?",
        questionTextMar: "सर्वात लहान मूळ संख्या कोणती आहे?",
        options: ["1", "2", "3", "5"],
        optionsMar: ["१", "२", "३", "५"],
        correctAnswer: "1", // option '2' (index 1)
        maxMarks: 2
      },
      {
        id: "q2",
        type: "MCQ",
        questionText: "What represents the 'Golden Ratio' approximately?",
        questionTextMar: "खालीलपैकी कोणते मूल्य 'सुवर्ण गुणोत्तर' (Golden Ratio) दर्शवते?",
        options: ["1.414", "1.618", "3.141", "2.718"],
        optionsMar: ["१.४१४", "१.६१८", "३.१४१", "२.७१८"],
        correctAnswer: "1",
        maxMarks: 2
      },
      {
        id: "q3",
        type: "Descriptive",
        questionText: "Explain the importance of NMMS program in your words.",
        questionTextMar: "एनएमएमएस (NMMS) योजनेचे महत्त्व तुमच्या शब्दांत थोडक्यात लिहा.",
        maxMarks: 5
      }
    ]
  },
  {
    id: "exam102",
    title: "Unit Test - Mathematics",
    titleMar: "घटक चाचणी - गणित",
    className: "6th",
    durationMinutes: 20,
    passwordHash: "sixmath",
    isActive: true,
    questions: [
      {
        id: "q6_1",
        type: "MCQ",
        questionText: "What is 15% of 200?",
        questionTextMar: "२०० चे १५% किती होतात?",
        options: ["15", "30", "45", "60"],
        optionsMar: ["१५", "३०", "४५", "६०"],
        correctAnswer: "1", // index 1 is 30
        maxMarks: 2
      }
    ]
  }
];

export const initialHomework: Homework[] = [
  {
    id: "hw101",
    title: "स्वाध्याय - संतवाणी भावार्थ",
    className: "9th",
    subject: "Marathi",
    subjectMar: "मराठी",
    deadlineDate: "2026-06-10",
    description: "मराठी पाठ्यपुस्तकातील संतवाणीचा संपूर्ण भावार्थ सुंदर अक्षरात वहीत लिहून त्याचा फोटो काढून अपलोड करावा.",
    createdAt: "2026-05-20"
  },
  {
    id: "hw102",
    title: "English Grammar - Tenses exercises",
    className: "6th",
    subject: "English",
    subjectMar: "इंग्रजी",
    deadlineDate: "2026-06-05",
    description: "Write 5 examples for each of the Simple Present, Simple Past, and Simple Future Tenses.",
    createdAt: "2026-05-24"
  }
];

export const initialLeaveRequests: LeaveRequest[] = [
  {
    id: "l1",
    studentId: "601",
    studentRoll: "1",
    studentNameMar: "भोसले अक्षरा नितीन",
    className: "6th",
    fromDate: "2026-06-01",
    toDate: "2026-06-03",
    reason: "भावाच्या लग्नानिमित्त गावी जाणे असल्याने ३ दिवस रजा मिळावी नम्र विनंती.",
    status: "PENDING"
  }
];

export const initialComplaints: Complaint[] = [
  {
    id: "c1",
    studentId: "901",
    studentRoll: "1",
    studentNameMar: "भोसले ईश्वरी सचिन",
    className: "9th",
    subject: "वर्गातील पंखा नादुरुस्त असण्याबाबत",
    description: "आमच्या वर्गातील (इयत्ता नववी) मागील बाजूचा पंखा चालत नाही, त्यामुळे खूप उकाडा होतो. कृपया दुरुस्त करून द्यावा ही विनंती.",
    submittedAt: "2026-05-24",
    status: "PENDING"
  }
];

export const initialEvents: CulturalEvent[] = [
  {
    id: "e1",
    title: "Shiv Jayanti Sohala",
    titleMar: "शिवजयंती सोहळा व भव्य मिरवणूक",
    date: "2026-02-19",
    description: "Grand celebration of Chhatrapati Shivaji Maharaj Jayanti with cultural programs, lezim and speeches.",
    descriptionMar: "छत्रपती शिवाजी महाराज जयंती निमित्त शाळेमध्ये लेझीम प्रात्यक्षिके, ऐतिहासिक पोवाडे आणि वक्तृत्व स्पर्धेचे भव्य आयोजन करण्यात आले होते.",
    category: "Festival",
    categoryMar: "उत्सव आणि सण"
  },
  {
    id: "e2",
    title: "Annual Gathering & Prize Distribution",
    titleMar: "वार्षिक स्नेहसंमेलन व बक्षीस वितरण समारंभ",
    date: "2026-01-10",
    description: "Colorful dance performances, drama and distribution of academic and sports achievement awards.",
    descriptionMar: "विद्यार्थ्यांच्या कलागुणांना वाव देण्यासाठी वार्षिक स्नेहसंमेलन व गुणवंत विद्यार्थ्यांचा सत्कार सोहळा अत्यंत प्रेक्षणीय स्वरूपात पार पडला.",
    category: "Annual Gathering",
    categoryMar: "वार्षिक स्नेहसंमेलन"
  }
];

export const initialNotifications: Notification[] = [
  {
    id: "n1",
    title: "NMMS Examination Notice",
    titleMar: "एनएमएमएस (NMMS) परीक्षा नोंदणी सुरू",
    message: "Students of 8th standard are requested to submit registration details of NMMS Exam.",
    messageMar: "इयत्ता आठवीच्या सर्व विद्यार्थ्यांना सूचित करण्यात येते की, एनएमएमएस परीक्षा नोंदणी अर्ज भरावे. शुल्क व कागदपत्रांचे तपशील वर्गतज्ज्ञांकडे जमा करावेत.",
    date: "2026-05-25",
    targetRole: "ALL"
  },
  {
    id: "n2",
    title: "Exam System Active",
    titleMar: "ऑनलाइन सराव चाचणी पोर्टल सक्रिय",
    message: "New mock tests are launched for student practice on portal.",
    messageMar: "सर्व विद्यार्थ्यांसाठी नवीन ऑनलाइन सराव परीक्षा सुरू करण्यात आल्या आहेत. युझरनेम आणि पासवर्ड वापरून परीक्षा दालनात लॉगिन करून चाचणी द्यावी.",
    date: "2026-05-24",
    targetRole: "STUDENT"
  }
];

export const initialToppers: Topper[] = [
  {
    id: "top1",
    name: "Bhosle Akshara Nitin",
    nameMar: "भोसले अक्षरा नितीन",
    examName: "NMMS",
    examNameMar: "एनएमएमएस परीक्षा ६वी",
    marksOrPercentage: "१६२ / १८०",
    rank: "Rank 1 (प्रथम)",
    rankMar: "सातारा जिल्ह्यात प्रथम क्रमांक",
    descriptionMar: "एनएमएमएस राज्य गुणवत्ता यादीत सातारा जिल्ह्यात प्रथम क्रमांक मिळवून हायस्कूलचा नावलौकिक वाढवला.",
    descriptionEng: "Ranked 1st in Satara district for the NMMS State Level Scholarship exam.",
    avatarSelection: "female"
  },
  {
    id: "top2",
    name: "Bhosle Durga Sunil",
    nameMar: "भोसले दुर्गा सुनिल",
    examName: "NMMS",
    examNameMar: "एनएमएमएस परीक्षा ६वी",
    marksOrPercentage: "१५४ / १८०",
    rank: "Rank 2 (द्वितीय)",
    rankMar: "शिष्यवृत्ती यादीत द्वितीय क्रमांक",
    descriptionMar: "अत्यंत प्रतिकूल परिस्थितीत चिकाटीने अभ्यास करून शिष्यवृत्ती यादीत स्थान संपादन केले.",
    descriptionEng: "Dedicated scholastic study and continuous mock series performance secured NMMS list position.",
    avatarSelection: "female"
  },
  {
    id: "top3",
    name: "Madane Purva Dinesh",
    nameMar: "मदने पुर्वा दिनेश",
    examName: "SSC 10th",
    examNameMar: "एसएससी इयत्ता १० वी",
    marksOrPercentage: "९७.६०% (९५०/१०००)",
    rank: "Board Topper (अव्वल)",
    rankMar: "कोरेगाव तालुक्यात अव्वल क्रमांक",
    descriptionMar: "इयत्ता १० वी एसएससी महामंडळ परीक्षेत ९७.६०% गुण प्राप्त करून तालुक्यात अव्वल यश मिळवले.",
    descriptionEng: "Scored outstanding 97.60% in Secondary School Board Examinations.",
    avatarSelection: "star"
  }
];

export const initialSchoolStats: SchoolStats = {
  totalStudents: "350+",
  totalStudentsMar: "३५०+",
  sscPassPercentage: "100%",
  sscPassPercentageMar: "१००%",
  nmmsQualifiers: "42+",
  nmmsQualifiersMar: "४२+",
  highlyQualifiedTeachers: "16+",
  highlyQualifiedTeachersMar: "१६+"
};

