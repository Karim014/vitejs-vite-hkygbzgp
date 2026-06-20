import { useApp } from '../context/AppContext.jsx'

const iconFor = {
  success: 'check_circle',
  danger: 'cancel',
  warning: 'warning'
}

const colorFor = {
  success: 'text-success',
  danger: 'text-danger',
  warning: 'text-warning'
}

export default function ToastContainer() {
  const { toasts, dismissToast } = useApp()

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 items-center">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="animate-toast-in flex items-center gap-2 bg-primary text-white px-4 py-3 rounded-xl shadow-lg min-w-[260px] max-w-sm"
        >
          <span className={`material-symbols-outlined text-lg ${colorFor[t.variant] || 'text-success'}`}>
            {iconFor[t.variant] || 'check_circle'}
          </span>
          <p className="text-sm flex-grow">{t.message}</p>
          <button
            onClick={() => dismissToast(t.id)}
            className="text-white/60 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      ))}
    </div>
  )
}
