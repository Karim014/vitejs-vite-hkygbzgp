import { useState, useEffect, useRef } from 'react'

export default function Dropdown({ items }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-secondary hover:text-primary p-1 rounded-lg hover:bg-background transition-colors"
        aria-label="More actions"
      >
        <span className="material-symbols-outlined text-lg">more_horiz</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-36 bg-card border border-border rounded-lg shadow-lg py-1 z-50 animate-modal-in">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                setOpen(false)
                item.onClick()
              }}
              className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-background transition-colors ${
                item.danger ? 'text-danger' : 'text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
