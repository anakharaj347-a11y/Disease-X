import { symptomItems, assessmentQuestions, assessmentHistoryData } from '../data/symptoms';

export const symptomService = {
  getAllSymptoms() { return symptomItems; },
  getQuestions() { return assessmentQuestions; },
  getHistory() { return assessmentHistoryData; },
  getSymptomsByCategory(category: string) {
    if (category === 'All') return symptomItems;
    return symptomItems.filter(s => s.category === category);
  },
};
