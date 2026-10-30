export function StatCard({
  label,
  before,
  after,
  unit,
  size = "md",
}: {
  label: string;
  before: number | string;
  after: number | string;
  unit: string;
  size?: "md" | "lg";
}) {
  return (
    <div className="flex h-full min-w-0 flex-col justify-between rounded-[var(--radius-card)] bg-paper p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="t-ui">{label}</p>
        <span className="value-tag whitespace-nowrap">Illustrative</span>
      </div>
      <div className="mt-5">
        <div className="flex items-baseline gap-2">
          <span
            className={`tabular-nums font-medium font-[var(--font-display)] tracking-tight ${
              size === "lg" ? "text-5xl" : "text-4xl"
            }`}
            style={{ color: "var(--color-flare)" }}
          >
            {after}
          </span>
          <span className="t-ui text-soft">{unit}</span>
        </div>
        <p className="t-mono text-soft mt-2">was {before}{unit}</p>
      </div>
    </div>
  );
}
