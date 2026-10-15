import { outbreakClusters, outbreakIncidents, forecastData, getClusterById, getIncidentsByCluster } from '../data/outbreaks';
import { OutbreakCluster, OutbreakIncident, ForecastData } from '../types/outbreak';

export const outbreakService = {
  getAllClusters(): OutbreakCluster[] {
    return outbreakClusters;
  },
  getClusterById(id: string): OutbreakCluster | undefined {
    return getClusterById(id);
  },
  getAllIncidents(): OutbreakIncident[] {
    return outbreakIncidents;
  },
  getIncidentsByCluster(clusterId: string): OutbreakIncident[] {
    return getIncidentsByCluster(clusterId);
  },
  getForecastData(horizon: string): ForecastData[] {
    return forecastData[horizon] || forecastData['24h'];
  },
};
