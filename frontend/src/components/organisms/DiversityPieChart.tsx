import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
  'var(--color-status-error)',
];

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

export default function DiversityPieChart({ data }: Props) {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-10">
      {/* Gráfico */}
      <div className="h-80 w-full lg:w-1/2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Leyenda personalizada */}
      <div className="w-full lg:w-1/2 px-24">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full shrink-0"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              />

              <span className="text-sm text-gray-700">{item.name}</span>
            </div>

            <span className="text-sm font-semibold text-gray-900">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
