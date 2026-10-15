import { diseases, getDiseaseById, getDiseasesByCategory, searchDiseases } from '../data/diseases';
import { Disease } from '../types/disease';

// Service layer that currently returns demo data
// Replace with API calls when backend is connected

export const diseaseService = {
  getAll(): Disease[] {
    return diseases;
  },

  getById(id: string): Disease | undefined {
    return getDiseaseById(id);
  },

  getByCategory(category: string): Disease[] {
    return getDiseasesByCategory(category);
  },

  search(query: string): Disease[] {
    return searchDiseases(query);
  },
};
