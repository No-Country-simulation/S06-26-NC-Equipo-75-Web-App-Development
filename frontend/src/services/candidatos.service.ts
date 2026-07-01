export interface Candidato {
  id: string;
  score: number;
  nombre: string;
  nivel: string;
  habilidades: string[];
  diversidad: string;
  region: string;
  estado: string;
}

const MOCK_CANDIDATOS: Candidato[] = [
  { id: '1', score: 95, nombre: 'Ana García',     nivel: 'Senior',      habilidades: ['Python', 'SQL', 'ML', 'AWS'],               diversidad: 'Mujer',         region: 'Belo Horizonte - Brasil',  estado: 'Contratado'  },
  { id: '2', score: 88, nombre: 'Carlos Pérez',   nivel: 'Semi Senior', habilidades: ['Python', 'SQL', 'Data Analysis'],            diversidad: 'LGBTQ+',        region: 'São Paulo - Brasil',       estado: 'Entrevista'  },
  { id: '3', score: 82, nombre: 'Rafaela Santos', nivel: 'Junior',      habilidades: ['Python', 'FastAPI', 'Docker', 'PostgreSQL'], diversidad: 'Discapacidad',  region: 'Quito - Ecuador',         estado: 'Rechazado'   },
  { id: '4', score: 74, nombre: 'Fernanda Lima',  nivel: 'Trainee',     habilidades: ['SQL', 'Tableau', 'Power BI', 'Excel'],       diversidad: 'Indígena',      region: 'Buenos Aires - Argentina', estado: 'Contactado'  },
  { id: '5', score: 68, nombre: 'Mariana Costa',  nivel: 'Senior',      habilidades: ['SQL', 'React', 'Node.js'],                   diversidad: 'Sin badge',     region: 'Lima - Perú',             estado: 'Aplicó'      },
  { id: '6', score: 91, nombre: 'Diego Ramírez',  nivel: 'Senior',      habilidades: ['Java', 'Spring', 'Kubernetes'],              diversidad: 'Mujer',         region: 'Bogotá - Colombia',       estado: 'Entrevista'  },
  { id: '7', score: 79, nombre: 'Sofía Mendoza',  nivel: 'Semi Senior', habilidades: ['React', 'TypeScript', 'Node.js'],            diversidad: 'LGBTQ+',        region: 'Santiago - Chile',        estado: 'Contactado'  },
  { id: '8', score: 85, nombre: 'Lucas Oliveira', nivel: 'Senior',      habilidades: ['Python', 'TensorFlow', 'MLflow'],            diversidad: 'Sin badge',     region: 'São Paulo - Brasil',      estado: 'Aplicó'      },
];

export const candidatosService = {
  async getAll(): Promise<Candidato[]> {
    return MOCK_CANDIDATOS;
  },
};