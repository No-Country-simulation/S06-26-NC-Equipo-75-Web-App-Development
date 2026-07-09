import { type FunnelStageType, type DiversityCategory } from './esg.types';

export const selectionFunnelMock: FunnelStageType[] = [
  {
    stage: 'Shortlist',
    value: 150,
    conversion: 53,
  },
  {
    stage: 'Contactados',
    value: 80,
    conversion: 56,
  },
  {
    stage: 'Entrevista',
    value: 45,
    conversion: 40,
  },
  {
    stage: 'Contratados',
    value: 18,
  },
];

export const diversityMock: DiversityCategory[] = [
  {
    name: 'Mujer',
    value: 40,
  },
  {
    name: 'LGBTQ+',
    value: 18,
  },
  {
    name: 'Discapacidad',
    value: 15,
  },
  {
    name: 'Afrodescendiente',
    value: 12,
  },
  {
    name: 'Migrante',
    value: 8,
  },
  {
    name: 'Otro',
    value: 7,
  },
];
