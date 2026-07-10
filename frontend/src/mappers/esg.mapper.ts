import {
  type ESGBadgesResponse,
  type ESGFunnelResponse,
} from '../services/indicadores.service';

import {
  type DiversityCategory,
  type FunnelStageType,
} from '../mocks/esg.types';

/**
 * Convierte la respuesta del endpoint /dashboard/badges
 * al formato utilizado por DiversityPieChart.
 */
export function mapBadgesResponse(
  response: ESGBadgesResponse,
): DiversityCategory[] {
  return response.categories
    .filter((category) => category.percentage > 0)
    .map((category) => ({
      name: category.name,
      value: category.percentage,
    }));
}

/**
 * Convierte la respuesta del endpoint /dashboard/funnel
 * al formato utilizado por SelectionFunnel y
 * AbandonmentRateChart.
 */
export function mapFunnelResponse(
  response: ESGFunnelResponse,
): FunnelStageType[] {
  return [
    {
      stage: 'Shortlist',
      value: response.shortlist,
      conversion: response.shortlistToContact,
    },
    {
      stage: 'Contactados',
      value: response.contacted,
      conversion: response.contactToInterview,
    },
    {
      stage: 'Entrevista',
      value: response.interview,
      conversion: response.interviewToHire,
    },
    {
      stage: 'Contratados',
      value: response.hired,
    },
  ];
}
