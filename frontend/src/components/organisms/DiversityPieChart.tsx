import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLORS = [
  '#14B8A6',
  '#0F172A',
  '#2563EB',
  '#F59E0B',
  '#22C55E',
  '#EF4444',
];

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

export default function DiversityPieChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={110} label>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
