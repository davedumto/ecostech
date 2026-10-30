"use client";

import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from "recharts";

export function MetricChart({
  label,
  before,
  after,
  unit,
  highlightAfter = true,
}: {
  label: string;
  before: number;
  after: number;
  unit: string;
  highlightAfter?: boolean;
}) {
  const data = [
    { name: "Before", value: before },
    { name: "After", value: after },
  ];

  return (
    <div className="rounded-[var(--radius-card)] bg-paper p-5">
      <div className="flex items-start justify-between gap-2">
        <p className="t-ui">{label}</p>
        <span className="value-tag whitespace-nowrap">Illustrative</span>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="t-h3 tabular-nums">{after}</span>
        <span className="t-ui text-soft">{unit}</span>
        <span className="t-mono text-soft">was {before}{unit}</span>
      </div>
      <div className="mt-3 h-24">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "var(--color-grey-500)" }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={40}>
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={
                    index === 1 && highlightAfter
                      ? "var(--color-flare)"
                      : "var(--color-grey-200)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
