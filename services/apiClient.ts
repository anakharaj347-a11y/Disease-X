// API Client stub for future backend integration
// Currently returns demo data directly

const BASE_URL = 'https://api.diseasex.demo/v1';

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string) {
    this.token = token;
  }

  // Stub: In production, this would make actual HTTP requests
  async request<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    // For now, throw to indicate backend is not connected
    throw new Error(`Backend not connected. Endpoint: ${endpoint}`);
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  async put<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }
}

export const apiClient = new ApiClient(BASE_URL);
export default apiClient;
