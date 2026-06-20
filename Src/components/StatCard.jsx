export default function StatCard({ icon, label, value, suffix, trend, trendUp }) {
  return (
    <div className="bg-card border border-border rounded-card p-5 hover:shadow-card hover:border-border-hover transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="w-9 h-9 rounded-lg bg-background flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-lg">{icon}</span>
        </span>
        {trend && (
          <span
            className={`text-xs font-semibold flex items-center gap-0.5 ${
              trendUp ? 'text-success' : 'text-danger'
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {trendUp ? 'trending_up' : 'trending_down'}
            </span>
            {trend}
          </span>
        )}
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-secondary mb-1">{label}</p>
      <p className="font-mono text-2xl font-bold text-primary">
        {value}
        {suffix && <span className="text-sm font-normal text-secondary ml-1">{suffix}</span>}
      </p>
    </div>
  )
}
