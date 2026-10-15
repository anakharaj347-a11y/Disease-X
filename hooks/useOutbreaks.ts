import { useState, useMemo } from 'react';
import { outbreakService } from '../services/outbreakService';

export function useOutbreaks() {
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>('cluster-1');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [forecastHorizon, setForecastHorizon] = useState('24h');

  const clusters = outbreakService.getAllClusters();
  const selectedCluster = selectedClusterId ? outbreakService.getClusterById(selectedClusterId) : undefined;

  const incidents = useMemo(() => {
    const all = outbreakService.getAllIncidents();
    if (selectedSeverity === 'All') return all;
    return all.filter(i => i.severity === selectedSeverity);
  }, [selectedSeverity]);

  const forecasts = useMemo(() => {
    return outbreakService.getForecastData(forecastHorizon);
  }, [forecastHorizon]);

  return {
    clusters, selectedCluster, selectedClusterId, setSelectedClusterId,
    incidents, selectedSeverity, setSelectedSeverity,
    forecasts, forecastHorizon, setForecastHorizon,
  };
}
