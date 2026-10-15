import { useState, useMemo } from 'react';
import { diseaseService } from '../services/diseaseService';

export function useDiseases() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const diseases = useMemo(() => {
    if (searchQuery) return diseaseService.search(searchQuery);
    return diseaseService.getByCategory(selectedCategory);
  }, [searchQuery, selectedCategory]);

  return { diseases, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory };
}
