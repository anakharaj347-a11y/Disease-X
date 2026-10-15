export interface SymptomItem {
  id: string;
  name: string;
  category: SymptomCategory;
  bodyPart: string;
  description: string;
  icon: string;
}

export type SymptomCategory =
  | 'General'
  | 'Respiratory'
  | 'Gastrointestinal'
  | 'Neurological'
  | 'Skin'
  | 'Musculoskeletal'
  | 'Cardiovascular';

export interface SymptomAssessment {
  id: string;
  selectedSymptoms: string[];
  answers: AssessmentAnswer[];
  result?: AssessmentResult;
  createdAt: string;
  status: 'in-progress' | 'completed';
}

export interface AssessmentAnswer {
  questionId: string;
  answer: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'scale' | 'text';
  options?: string[];
  dependsOn?: string;
}

export interface AssessmentResult {
  possibleConditions: PossibleCondition[];
  urgencyLevel: 'Emergency' | 'Urgent' | 'Soon' | 'Routine' | 'Self-care';
  recommendations: string[];
  disclaimer: string;
}

export interface PossibleCondition {
  disease: string;
  diseaseId: string;
  matchPercentage: number;
  matchedSymptoms: string[];
  description: string;
}

export interface AssessmentHistory {
  id: string;
  date: string;
  symptomCount: number;
  topCondition: string;
  urgencyLevel: string;
  status: string;
}
