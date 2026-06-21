import { useState } from 'react'

export default function Topbar({ title, onNewRequest }) {
  const [notifOpen, setNotifOpen] = useState(false)

  return (
    <header className="fixed top-0 right-0 left-sidebar h-topbar bg-card border-b border-border z-40 flex justify-between items-center px-8">
      <div className="flex items-center gap-6 flex-grow">
        <h2 className="text-lg font-bold text-primary whitespace-nowrap">{title}</h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="relative p-2 text-secondary hover:text-primary transition-colors"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-card border border-border rounded-lg shadow-lg p-4 animate-modal-in">
              <p className="text-sm font-semibold mb-2">Notifications</p>
              <p className="text-xs text-secondary">
                You have pending leave approvals and contract renewals to review.
              </p>
            </div>
          )}
        </div>
        <div className="h-8 w-px bg-border mx-1" />
        <button
          onClick={onNewRequest}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border hover:bg-background transition-colors"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span className="text-xs font-semibold uppercase tracking-wide">New Request</span>
        </button>
      </div>
    </header>
  )
}
