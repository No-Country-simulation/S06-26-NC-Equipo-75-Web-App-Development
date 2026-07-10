export interface Candidato {
  id: string;
  score: number;
  nombre: string;
  nivel: string;
  area?: string;
  habilidades: string[];
  diversidad: string;
  region: string;
  estado: string;
  badges: string[];
  consentimientoUbicacion: boolean;
  skillsScore?: number;
  experienciaScore?: number;
  regionScore?: number;
}

const MOCK_CANDIDATOS: Candidato[] = [
  {
    id: '1',
    score: 95,
    nombre: 'Ana García',
    nivel: 'Senior',
    area: 'Data Science',
    habilidades: ['Python', 'SQL', 'ML', 'AWS'],
    diversidad: 'Mujer, Región periférica',
    region: 'Belo Horizonte - Brasil',
    estado: 'Contratado',
    badges: [
      'Mujer en área tecnológica o STEM',
      'Resido en región periférica o de baja representación laboral',
    ],
    consentimientoUbicacion: true,
    skillsScore: 0.90,
    experienciaScore: 0.95,
    regionScore: 0.80,
  },
  {
    id: '2',
    score: 88,
    nombre: 'Carlos Pérez',
    nivel: 'Semi Senior',
    area: 'Backend',
    habilidades: ['Python', 'SQL', 'Data Analysis'],
    diversidad: 'Discapacidad',
    region: 'São Paulo - Brasil',
    estado: 'Entrevista',
    badges: ['Tengo discapacidad certificada o auto-declarada'],
    consentimientoUbicacion: false,
    skillsScore: 0.85,
    experienciaScore: 0.70,
    regionScore: 0.90,
  },
  {
    id: '3',
    score: 82,
    nombre: 'Rafaela Santos',
    nivel: 'Junior',
    area: 'Full Stack',
    habilidades: ['Python', 'FastAPI', 'Docker', 'PostgreSQL'],
    diversidad: 'Sin badge',
    region: 'Quito - Ecuador',
    estado: 'Rechazado',
    badges: [],
    consentimientoUbicacion: false,
    skillsScore: 0.80,
    experienciaScore: 0.60,
    regionScore: 0.50,
  },
  {
    id: '4',
    score: 74,
    nombre: 'Fernanda Lima',
    nivel: 'Trainee',
    area: 'Data Science',
    habilidades: ['SQL', 'Tableau', 'Power BI', 'Excel'],
    diversidad: 'Sin badge',
    region: 'Buenos Aires - Argentina',
    estado: 'Contactado',
    badges: [],
    consentimientoUbicacion: true,
    skillsScore: 0.70,
    experienciaScore: 0.50,
    regionScore: 0.85,
  },
  {
    id: '5',
    score: 68,
    nombre: 'Mariana Costa',
    nivel: 'Senior',
    area: 'Frontend',
    habilidades: ['SQL', 'React', 'Node.js'],
    diversidad: 'Sin badge',
    region: 'Lima - Perú',
    estado: 'Aplicó',
    badges: [],
    consentimientoUbicacion: true,
    skillsScore: 0.65,
    experienciaScore: 0.80,
    regionScore: 0.60,
  },
  {
    id: '6',
    score: 91,
    nombre: 'Diego Ramírez',
    nivel: 'Senior',
    area: 'Backend',
    habilidades: ['Java', 'Spring', 'Kubernetes'],
    diversidad: 'Mujer',
    region: 'Bogotá - Colombia',
    estado: 'Entrevista',
    badges: ['Mujer en área tecnológica o STEM'],
    consentimientoUbicacion: false,
    skillsScore: 0.88,
    experienciaScore: 0.92,
    regionScore: 0.75,
  },
  {
    id: '7',
    score: 79,
    nombre: 'Sofía Mendoza',
    nivel: 'Semi Senior',
    area: 'Full Stack',
    habilidades: ['React', 'TypeScript', 'Node.js'],
    diversidad: 'Discapacidad',
    region: 'Santiago - Chile',
    estado: 'Contactado',
    badges: ['Tengo discapacidad certificada o auto-declarada'],
    consentimientoUbicacion: false,
    skillsScore: 0.75,
    experienciaScore: 0.68,
    regionScore: 0.90,
  },
  {
    id: '8',
    score: 85,
    nombre: 'Lucas Oliveira',
    nivel: 'Senior',
    area: 'Machine Learning',
    habilidades: ['Python', 'TensorFlow', 'MLflow'],
    diversidad: 'Sin badge',
    region: 'São Paulo - Brasil',
    estado: 'Aplicó',
    badges: [],
    consentimientoUbicacion: true,
    skillsScore: 0.82,
    experienciaScore: 0.88,
    regionScore: 0.70,
  },
];

export const candidatosService = {
  async getAll(): Promise<Candidato[]> {
    return MOCK_CANDIDATOS;
  },
  async getById(id: string): Promise<Candidato> {
    const candidato = MOCK_CANDIDATOS.find((c) => c.id === id);
    if (!candidato) throw new Error('Candidato no encontrado');
    return candidato;
  },
};