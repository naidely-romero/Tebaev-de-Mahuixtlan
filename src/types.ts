/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Subject {
  name: string;
  category: "Básica" | "Propedéutica" | "Para el Trabajo" | "Cocurricular";
  hours: number;
  description: string;
}

export interface SemesterData {
  number: number;
  roman: string;
  subjects: Subject[];
}

export interface TrainingPath {
  id: string;
  name: string;
  description: string;
  subjects?: string[];
  skills: string[];
  icon: string;
}

export interface Inquiry {
  id: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  secondarySchool: string;
  gpa: number;
  trainingPath: string;
  status: "Pendiente" | "Revisado" | "Aprobado";
  folio: string;
  timestamp: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
