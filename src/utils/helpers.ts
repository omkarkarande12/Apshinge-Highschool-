/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ClassType, SubjectMarks } from '../types';

/**
 * Calculates Maharashtra State Board Grade based on percentage or score
 */
export function getMaharashtraGrade(score: number): string {
  if (score >= 90) return 'अ-१';
  if (score >= 80) return 'अ-२';
  if (score >= 70) return 'ब-१';
  if (score >= 60) return 'ब-२';
  if (score >= 50) return 'क-१';
  if (score >= 40) return 'क-२';
  if (score >= 35) return 'ड';
  return 'ई'; // Failure
}

/**
 * Calculate total and grade for a single subject based on the specific Class criteria
 */
export function calculateSubjectMarks(
  className: ClassType,
  subjectMarks: Partial<SubjectMarks>
): SubjectMarks {
  let total = 0;
  
  if (className === '5th' || className === '6th') {
    const f = subjectMarks.formative_5_6 || { oral: 0, project: 0, selfStudy: 0, openBook: 0, total: 0 };
    const s = subjectMarks.summative_5_6 || { oral_practical: 0, written: 0, total: 0 };
    
    const formativeTotal = f.oral + f.project + f.selfStudy + f.openBook;
    const summativeTotal = s.oral_practical + s.written;
    total = formativeTotal + summativeTotal;
    
    return {
      subjectName: subjectMarks.subjectName || '',
      subjectNameMar: subjectMarks.subjectNameMar || '',
      formative_5_6: {
        oral: f.oral,
        project: f.project,
        selfStudy: f.selfStudy,
        openBook: f.openBook,
        total: formativeTotal
      },
      summative_5_6: {
        oral_practical: s.oral_practical,
        written: s.written,
        total: summativeTotal
      },
      totalMarks: total,
      grade: getMaharashtraGrade(total)
    };
  } else if (className === '7th' || className === '8th') {
    const f = subjectMarks.formative_7_8 || { oral: 0, project: 0, openBook: 0, homework: 0, total: 0 };
    const s = subjectMarks.summative_7_8 || { oral: 0, written: 0, total: 0 };
    
    const formativeTotal = f.oral + f.project + f.openBook + f.homework;
    const summativeTotal = s.oral + s.written;
    total = formativeTotal + summativeTotal;
    
    return {
      subjectName: subjectMarks.subjectName || '',
      subjectNameMar: subjectMarks.subjectNameMar || '',
      formative_7_8: {
        oral: f.oral,
        project: f.project,
        openBook: f.openBook,
        homework: f.homework,
        total: formativeTotal
      },
      summative_7_8: {
        oral: s.oral,
        written: s.written,
        total: summativeTotal
      },
      totalMarks: total,
      grade: getMaharashtraGrade(total)
    };
  } else {
    // 9th and 10th Standard Evaluation (20 + 80)
    const e = subjectMarks.evaluation_9_10 || { oral_practical: 0, written: 0, total: 0 };
    total = e.oral_practical + e.written;
    
    return {
      subjectName: subjectMarks.subjectName || '',
      subjectNameMar: subjectMarks.subjectNameMar || '',
      evaluation_9_10: {
        oral_practical: e.oral_practical,
        written: e.written,
        total: total
      },
      totalMarks: total,
      grade: getMaharashtraGrade(total)
    };
  }
}

/**
 * Trigger browser print
 */
export function printElementById(elementId: string) {
  const printContents = document.getElementById(elementId)?.innerHTML;
  if (!printContents) return;
  
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  window.location.reload(); // Quick restore of page listeners
}

/**
 * Simple CSV Downloader for Excel export
 */
export function downloadCSV(filename: string, headers: string[], rows: string[][]) {
  const csvContent = "data:text/csv;charset=utf-8,\uFEFF" // Add UTF-8 BOM representation for Excel to read Marathi text correctly
    + [headers.join(","), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");
    
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
