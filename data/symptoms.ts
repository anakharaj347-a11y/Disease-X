import { SymptomItem, AssessmentQuestion, AssessmentHistory } from '../types/symptom';

export const symptomItems: SymptomItem[] = [
  { id: 'sym-1', name: 'Fever', category: 'General', bodyPart: 'Whole body', description: 'Elevated body temperature above 38°C (100.4°F)', icon: 'thermometer' },
  { id: 'sym-2', name: 'Headache', category: 'Neurological', bodyPart: 'Head', description: 'Pain in any region of the head', icon: 'alert-circle' },
  { id: 'sym-3', name: 'Cough', category: 'Respiratory', bodyPart: 'Chest/Throat', description: 'Dry or productive cough', icon: 'wind' },
  { id: 'sym-4', name: 'Body Aches', category: 'Musculoskeletal', bodyPart: 'Whole body', description: 'Generalized muscle and joint pain', icon: 'activity' },
  { id: 'sym-5', name: 'Fatigue', category: 'General', bodyPart: 'Whole body', description: 'Unusual tiredness or exhaustion', icon: 'battery-low' },
  { id: 'sym-6', name: 'Nausea', category: 'Gastrointestinal', bodyPart: 'Abdomen', description: 'Feeling of sickness with inclination to vomit', icon: 'alert-triangle' },
  { id: 'sym-7', name: 'Skin Rash', category: 'Skin', bodyPart: 'Skin', description: 'Visible skin changes or eruptions', icon: 'droplet' },
  { id: 'sym-8', name: 'Joint Pain', category: 'Musculoskeletal', bodyPart: 'Joints', description: 'Pain in one or more joints', icon: 'move' },
  { id: 'sym-9', name: 'Sore Throat', category: 'Respiratory', bodyPart: 'Throat', description: 'Pain or irritation in the throat', icon: 'mic-off' },
  { id: 'sym-10', name: 'Shortness of Breath', category: 'Respiratory', bodyPart: 'Chest', description: 'Difficulty breathing or feeling of breathlessness', icon: 'wind' },
  { id: 'sym-11', name: 'Diarrhea', category: 'Gastrointestinal', bodyPart: 'Abdomen', description: 'Frequent loose or watery stools', icon: 'droplet' },
  { id: 'sym-12', name: 'Chills', category: 'General', bodyPart: 'Whole body', description: 'Feeling of cold with shivering', icon: 'thermometer' },
  { id: 'sym-13', name: 'Loss of Taste/Smell', category: 'Neurological', bodyPart: 'Head', description: 'Diminished or absent sense of taste or smell', icon: 'eye-off' },
  { id: 'sym-14', name: 'Abdominal Pain', category: 'Gastrointestinal', bodyPart: 'Abdomen', description: 'Pain in the stomach or abdominal area', icon: 'alert-circle' },
  { id: 'sym-15', name: 'Red Eyes', category: 'General', bodyPart: 'Eyes', description: 'Redness or irritation of the eyes', icon: 'eye' },
  { id: 'sym-16', name: 'Chest Pain', category: 'Cardiovascular', bodyPart: 'Chest', description: 'Discomfort or pain in the chest area', icon: 'heart' },
  { id: 'sym-17', name: 'Vomiting', category: 'Gastrointestinal', bodyPart: 'Abdomen', description: 'Forceful emptying of stomach contents', icon: 'alert-triangle' },
  { id: 'sym-18', name: 'Dizziness', category: 'Neurological', bodyPart: 'Head', description: 'Feeling lightheaded or unsteady', icon: 'loader' },
  { id: 'sym-19', name: 'Bleeding', category: 'General', bodyPart: 'Various', description: 'Unusual bleeding from nose, gums, or other areas', icon: 'droplet' },
  { id: 'sym-20', name: 'Night Sweats', category: 'General', bodyPart: 'Whole body', description: 'Excessive sweating during sleep', icon: 'moon' },
];

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'q1',
    question: 'How long have you been experiencing these symptoms?',
    type: 'single',
    options: ['Less than 24 hours', '1-3 days', '3-7 days', 'More than a week'],
  },
  {
    id: 'q2',
    question: 'How would you rate the severity of your symptoms?',
    type: 'scale',
    options: ['1 - Mild', '2 - Slight', '3 - Moderate', '4 - Significant', '5 - Severe'],
  },
  {
    id: 'q3',
    question: 'Have you traveled to any affected areas recently?',
    type: 'single',
    options: ['No', 'Within Kerala', 'Outside Kerala, within India', 'International travel'],
  },
  {
    id: 'q4',
    question: 'Have you had contact with anyone who was sick?',
    type: 'single',
    options: ['No', 'Yes, household member', 'Yes, at workplace', 'Yes, healthcare setting', 'Unsure'],
  },
  {
    id: 'q5',
    question: 'Do you have any pre-existing conditions?',
    type: 'multiple',
    options: ['None', 'Diabetes', 'Hypertension', 'Heart disease', 'Respiratory condition', 'Immunocompromised', 'Pregnancy'],
  },
  {
    id: 'q6',
    question: 'Have you been exposed to mosquito bites recently?',
    type: 'single',
    options: ['No', 'Occasionally', 'Frequently', 'Unsure'],
  },
  {
    id: 'q7',
    question: 'Are your symptoms getting better or worse?',
    type: 'single',
    options: ['Getting better', 'Staying the same', 'Getting worse', 'Fluctuating'],
  },
];

export const assessmentHistoryData: AssessmentHistory[] = [
  { id: 'ah-1', date: '2026-10-12T14:30:00Z', symptomCount: 4, topCondition: 'Dengue', urgencyLevel: 'Urgent', status: 'Completed' },
  { id: 'ah-2', date: '2026-10-08T09:15:00Z', symptomCount: 3, topCondition: 'Influenza A', urgencyLevel: 'Soon', status: 'Completed' },
  { id: 'ah-3', date: '2026-09-25T16:45:00Z', symptomCount: 2, topCondition: 'Common Cold', urgencyLevel: 'Self-care', status: 'Completed' },
];

export const symptomCategories = [
  'All',
  'General',
  'Respiratory',
  'Gastrointestinal',
  'Neurological',
  'Skin',
  'Musculoskeletal',
  'Cardiovascular',
];
