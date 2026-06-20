import { NavLink } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

const navItems = [
  { to: '/', label: 'Dashboard', icon: 'dashboard' },
  { to: '/employees', label: 'Employees', icon: 'group' },
  { to: '/leave', label: 'Leave Management', icon: 'event_busy' },
  { to: '/payroll', label: 'Payroll', icon: 'payments' },
  { to: '/contracts', label: 'Contracts', icon: 'description' },
  { to: '/settings', label: 'Settings', icon: 'settings' }
]

export default function Sidebar() {
  const { currentUser } = useApp()

  return (
    <aside className="fixed left-0 top-0 h-screen w-sidebar bg-sidebar border-r border-border z-50 flex flex-col py-6 px-4">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-black text-primary">HR Portal</h1>
        <p className="text-[11px] font-semibold tracking-wide text-secondary opacity-70 uppercase">
          Admin Console
        </p>
      </div>

      <nav className="flex-grow space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 ${
                isActive
                  ? 'bg-[#ECEAE7] text-primary font-semibold border-l-2 border-primary scale-[0.98]'
                  : 'text-secondary hover:bg-[#ECEAE7] hover:text-primary'
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-border flex items-center gap-3 px-2">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-[#F1EDEC] flex-shrink-0">
          <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-grow overflow-hidden">
          <p className="text-sm font-semibold truncate">{currentUser.name}</p>
          <p className="text-[10px] text-secondary truncate uppercase tracking-wide font-medium">
            {currentUser.role}
          </p>
        </div>
        <button className="text-secondary hover:text-primary transition-colors" aria-label="Log out">
          <span className="material-symbols-outlined">logout</span>
        </button>
      </div>
    </aside>
  )
}
