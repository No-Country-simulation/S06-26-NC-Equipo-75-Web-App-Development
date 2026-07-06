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

