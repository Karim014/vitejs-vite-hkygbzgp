const variants = {
  success: 'bg-[#2EA043]/10 text-[#2EA043] border-[#2EA043]/20',
  warning: 'bg-[#D29922]/10 text-[#D29922] border-[#D29922]/20',
  danger: 'bg-[#F85149]/10 text-[#F85149] border-[#F85149]/20',
  neutral: 'bg-[#1A1A1A]/5 text-secondary border-border'
}

const statusVariant = {
  Active: 'success',
  Approved: 'success',
  Completed: 'success',
  'On Leave': 'warning',
  Pending: 'warning',
  Updated: 'warning',
  Terminated: 'danger',
  Rejected: 'danger'
}

export default function Badge({ children, variant }) {
  const v = variant || statusVariant[children] || 'neutral'
  return (
    <span
      className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wide border ${variants[v]}`}
    >
      {children}
    </span>
  )
}
