import { useState } from 'react';
import { symptomService } from '../services/symptomService';
import { SymptomItem } from '../types/symptom';

export function useSymptomAssessment() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0); // 0=select, 1=questions, 2=review, 3=result
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedCategory, setSelectedCategory] = useState('All');

  const symptoms = symptomService.getSymptomsByCategory(selectedCategory);
  const questions = symptomService.getQuestions();
  const history = symptomService.getHistory();

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const setAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const reset = () => {
    setSelectedSymptoms([]);
    setCurrentStep(0);
    setAnswers({});
  };

  return {
    selectedSymptoms, toggleSymptom, currentStep, setCurrentStep,
    answers, setAnswer, symptoms, questions, history, selectedCategory,
    setSelectedCategory, reset,
  };
}
