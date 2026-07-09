import { apiClient } from './apiClient';

// ======================
// Tipos
// ======================

export interface ESGDashboardMetrics {
  diversityContactRate: number;
  diversityHiringRate: number;
  averageDiversityRate: number;
  abandonmentRate: number;
}

export interface BadgeCategory {
  id: string;
  name: string;
  candidateCount: number;
  percentage: number;
}

export interface ESGBadgesResponse {
  totalCandidatesWithBadge: number;
  categories: BadgeCategory[];
}

export interface ESGFunnelResponse {
  shortlist: number;
  contacted: number;
  interview: number;
  hired: number;
  shortlistToContact: number;
  contactToInterview: number;
  interviewToHire: number;
  overallConversion: number;
}

// ======================
// Servicio
// ======================

export const indicadoresService = {
  /**
   * KPIs del Dashboard ESG
   */
  async getMetrics(companyId: string): Promise<ESGDashboardMetrics> {
    return apiClient<ESGDashboardMetrics>(
      `/empresas/${companyId}/dashboard/esg`,
    );
  },

  /**
   * Distribución de badges (gráfico de torta)
   */
  async getBadges(companyId: string): Promise<ESGBadgesResponse> {
    return apiClient<ESGBadgesResponse>(
      `/empresas/${companyId}/dashboard/badges`,
    );
  },

  /**
   * Embudo de selección
   */
  async getFunnel(companyId: string): Promise<ESGFunnelResponse> {
    return apiClient<ESGFunnelResponse>(
      `/empresas/${companyId}/dashboard/funnel`,
    );
  },
};
