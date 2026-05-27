/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ClassType = '5th' | '6th' | '7th' | '8th' | '9th' | '10th';

export interface Student {
  id: string; // rollNumber + class or random
  firstName: string;
  middleName: string;
  surname: string;
  fullNameMar: string; // Marathi full name
  fullNameEng: string; // English full name
  email: string;
  phone: string;
  aadhaar: string;
  pan?: string;
  address: string;
  class: ClassType;
  division: string;
  rollNumber: string;
  parentName: string;
  parentPhone: string;
  bankName?: string;
  passbookNo?: string;
  ifsc?: string;
  scholarshipDetails?: string;
  photoUrl?: string;
  username: string; // generated
  passwordHash: string; // plain text for simplicity of demo login
  notes?: string;
}

export interface Teacher {
  name: string;
  nameMar: string;
  qualification: string;
  dob: string;
  address: string;
  photoUrl?: string;
}

export interface Exam {
  id: string;
  title: string;
  titleMar: string;
  className: ClassType;
  durationMinutes: number;
  passwordHash: string;
  isActive: boolean;
  questions: Question[];
}

export interface Question {
  id: string;
  type: 'MCQ' | 'Descriptive';
  questionText: string;
  questionTextMar: string;
  options?: string[]; // four options for MCQ
  optionsMar?: string[];
  correctAnswer?: string; // option index or descriptive keyword
  maxMarks: number;
}

export interface ExamSubmission {
  id: string;
  studentId: string;
  examId: string;
  submittedAt: string;
  answers: Record<string, string>; // questionId -> studentAnswer
  evaluated: boolean;
  marksObtained: Record<string, number>; // questionId -> marks
  totalMarksObtained: number;
  totalExamMarks: number;
  evaluatorRemarks?: string;
}

export interface Homework {
  id: string;
  title: string;
  className: ClassType;
  subject: string;
  subjectMar: string;
  deadlineDate: string;
  description: string;
  fileUrl?: string;
  createdAt: string;
}

export interface HomeworkSubmission {
  id: string;
  homeworkId: string;
  studentId: string;
  submittedAt: string;
  fileUrl?: string; // base64, mock or details
  textSubmission?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  remarks?: string;
}

// Complex assessment schemes as requested
export interface AcademicResult {
  studentId: string;
  class: ClassType;
  semester: 'Sem1' | 'Sem2' | 'Combined';
  year: string;
  
  // Subject-specific details
  subjects: {
    marathi: SubjectMarks;
    english: SubjectMarks;
    hindi: SubjectMarks;
    maths: SubjectMarks;
    science: SubjectMarks;
    socialScience: SubjectMarks;
    art?: SubjectMarks;
    karyaAnubhav?: SubjectMarks;
    physicalEdu?: SubjectMarks;
  };

  finalTotal: number;
  percentage: number;
  grade: string;
  rank?: number;
}

export interface SubjectMarks {
  subjectName: string;
  subjectNameMar: string;

  // 7th & 8th Specific Evaluation
  formative_7_8?: {
    oral: number; // 10
    project: number; // 10
    openBook: number; // 10
    homework: number; // 10
    total: number; // 40
  };
  summative_7_8?: {
    oral: number; // 10
    written: number; // 50
    total: number; // 60
  };

  // 5th & 6th Specific Evaluation
  formative_5_6?: {
    oral: number; // 10
    project: number; // 20
    selfStudy: number; // 10
    openBook: number; // 10
    total: number; // 50
  };
  summative_5_6?: {
    oral_practical: number; // 10
    written: number; // 40
    total: number; // 50
  };

  // 9th & 10th Specific Evaluation
  evaluation_9_10?: {
    oral_practical: number; // 20
    written: number; // 80
    total: number; // 100
  };

  // Simple override/total (for fast Entry or simplified displays)
  totalMarks: number; // 100 max
  grade: string;
}

export interface NMMSResult {
  id: string;
  studentId: string;
  studentNameMar: string;
  testName: string;
  className: ClassType;
  marksObtained: number;
  totalMarks: number;
  rank: number;
  remarksMar?: string;
  photoUrl?: string; // to render toppers
}

export interface LeaveRequest {
  id: string;
  studentId: string;
  studentRoll: string;
  studentNameMar: string;
  className: ClassType;
  fromDate: string;
  toDate: string;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  remarks?: string;
}

export interface Complaint {
  id: string;
  studentId: string;
  studentRoll: string;
  studentNameMar: string;
  className: ClassType;
  subject: string;
  description: string;
  submittedAt: string;
  adminRemarks?: string;
  status: 'PENDING' | 'RESOLVED';
}

export interface CulturalEvent {
  id: string;
  title: string;
  titleMar: string;
  date: string;
  description: string;
  descriptionMar: string;
  photoUrl?: string;
  category: 'Annual Gathering' | 'Festival' | 'Competition' | 'State Level';
  categoryMar: string;
}

export interface Notification {
  id: string;
  title: string;
  titleMar: string;
  message: string;
  messageMar: string;
  date: string;
  targetRole: 'ALL' | 'STUDENT' | 'ADMIN';
}

export interface Topper {
  id: string;
  name: string;
  nameMar: string;
  examName: 'NMMS' | 'SSC 10th';
  examNameMar: string;
  marksOrPercentage: string;
  rank: string;
  rankMar: string;
  descriptionMar: string;
  descriptionEng: string;
  avatarSelection: 'male' | 'female' | 'star';
  photoUrl?: string;
}

export interface GalleryItem {
  id: string;
  titleMar: string;
  titleEng: string;
  descrMar: string;
  descrEng: string;
  bgGradient: string;
  photoUrl?: string;
}

export interface OfflineExamMark {
  id: string;
  examName: string;
  className: ClassType;
  totalMarks: number;
  marks: Record<string, string>; // studentId -> marksObtained (as string or number, string allows empty/editing easily)
  date: string;
}

export interface SchoolStats {
  totalStudents: string;
  totalStudentsMar: string;
  sscPassPercentage: string;
  sscPassPercentageMar: string;
  nmmsQualifiers: string;
  nmmsQualifiersMar: string;
  highlyQualifiedTeachers: string;
  highlyQualifiedTeachersMar: string;
}


