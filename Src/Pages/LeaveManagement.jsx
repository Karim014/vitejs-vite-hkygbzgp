import { useState, useMemo } from 'react'
import Layout from '../components/Layout.jsx'
import Dropdown from '../components/Dropdown.jsx'
import { useApp } from '../context/AppContext.jsx'

const tabs = ['My Leaves', 'Team Leaves', 'Pending Approvals']

const typeStyle = {
  Annual: { color: '#2EA043' },
  Sick: { color: '#D29922' },
  Emergency: { color: '#F85149' }
}

const SEP_2024_DAYS = [
  { d: 28, dim: true },
  { d: 29, dim: true },
  { d: 30, dim: true },
  { d: 31, dim: true },
  { d: 1 },
  { d: 2 },
  { d: 3 },
  { d: 4 },
  { d: 5 },
  { d: 6 },
  { d: 7 },
  { d: 8 },
  { d: 9 },
  { d: 10 },
  { d: 11 },
  { d: 12, today: true },
  { d: 13 },
  { d: 14 },
  { d: 15 },
  { d: 16, leave: 'Emergency' },
  { d: 17, leave: 'Emergency' },
  { d: 18 },
  { d: 19 },
  { d: 20 },
  { d: 21 },
  { d: 22 },
  { d: 23 },
  { d: 24, leave: 'Annual' },
  { d: 25, leave: 'Annual' },
  { d: 26, leave: 'Annual' },
  { d: 27, leave: 'Annual' },
  { d: 28, leave: 'Annual' },
  { d: 29 },
  { d: 30 },
  { d: 1, dim: true }
]

export default function LeaveManagement() {
  const { leaves, approveLeave, rejectLeave, showToast } = useApp()
  const [activeTab, setActiveTab] = useState('Pending Approvals')
  const [filters, setFilters] = useState({ Annual: true, Sick: true, Emergency: true })
  const [selectedDate, setSelectedDate] = useState(null)

  const pending = leaves.filter((l) => l.status === 'Pending')
  const approvedOrRejected = leaves.filter((l) => l.status !== 'Pending')

  const visiblePending = useMemo(
    () => pending.filter((l) => filters[l.type]),
    [pending, filters]
  )

  const toggleFilter = (type) => setFilters((f) => ({ ...f, [type]: !f[type] }))

  const handleDateClick = (day) => {
    setSelectedDate(day.d)
    if (day.leave) {
      showToast(`${day.leave} leave scheduled on Sep ${day.d}, 2024`, 'success')
    }
  }

  return (
    <Layout title="Leave Management">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h3 className="text-2xl font-bold mb-3">Leave Management</h3>
          <div className="flex gap-6 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 border-b-2 flex items-center gap-2 font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'border-primary text-primary font-semibold'
                    : 'border-transparent text-secondary hover:text-primary'
                }`}
              >
                {tab}
                {tab === 'Pending Approvals' && (
                  <span className="px-1.5 py-0.5 bg-danger/10 text-danger text-[10px] font-bold rounded-full">
                    {pending.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <div className="bg-card border border-border p-4 rounded-card min-w-[110px]">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-secondary mb-1">
              Annual Balance
            </p>
            <p className="font-mono font-black text-lg">
              18 <span className="text-xs font-normal text-secondary">days</span>
            </p>
          </div>
          <div className="bg-card border border-border p-4 rounded-card min-w-[110px]">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-secondary mb-1">
              Sick Balance
            </p>
            <p className="font-mono font-black text-lg">
              06 <span className="text-xs font-normal text-secondary">days</span>
            </p>
          </div>
        </div>
      </div>

      {activeTab !== 'Pending Approvals' && (
        <div className="mb-6 bg-card border border-border rounded-card p-6 text-sm text-secondary">
          {activeTab === 'My Leaves'
            ? 'Your personal leave history and balances are shown alongside the calendar below.'
            : 'Showing leave activity across your team. Switch to Pending Approvals to take action on requests.'}
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <section className="bg-card border border-border rounded-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-sm">September 2024</h4>
              <div className="flex gap-1">
                <button className="p-1 hover:bg-background rounded transition-colors">
                  <span className="material-symbols-outlined text-base">chevron_left</span>
                </button>
                <button className="p-1 hover:bg-background rounded transition-colors">
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 text-center mb-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <span key={i} className="text-[10px] font-semibold text-secondary">
                  {d}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center font-mono text-sm">
              {SEP_2024_DAYS.map((day, i) => {
                const leaveColor = day.leave ? typeStyle[day.leave].color : null
                const isSelected = selectedDate === day.d && !day.dim
                return (
                  <button
                    key={i}
                    onClick={() => !day.dim && handleDateClick(day)}
                    disabled={day.dim}
                    className={`py-2 rounded-lg transition-colors ${
                      day.dim ? 'text-border cursor-default' : 'cursor-pointer hover:bg-background'
                    } ${day.today ? 'bg-primary text-white font-bold' : ''} ${
                      isSelected && !day.today ? 'ring-1 ring-primary' : ''
                    }`}
                    style={
                      day.leave && !day.today
                        ? { backgroundColor: `${leaveColor}1A`, color: leaveColor, fontWeight: 700 }
                        : undefined
                    }
                    title={day.leave ? `${day.leave} Leave` : undefined}
                  >
                    {day.d}
                  </button>
                )
              })}
            </div>
          </section>

          <section className="bg-card border border-border rounded-card p-6">
            <h4 className="font-bold text-sm mb-4">Quick Filter</h4>
            <div className="space-y-3">
              {['Annual', 'Sick', 'Emergency'].map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters[type]}
                    onChange={() => toggleFilter(type)}
                    className="rounded border-border text-primary focus:ring-primary w-4 h-4"
                  />
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: typeStyle[type].color }}
                  />
                  <span className="text-sm text-secondary group-hover:text-primary transition-colors">
                    {type} Leave
                  </span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h4 className="font-bold text-sm">Pending Requests ({visiblePending.length})</h4>
            <button className="text-sm text-secondary hover:text-primary transition-colors">
              View All Archive
            </button>
          </div>

          {visiblePending.length === 0 && (
            <div className="bg-card border border-border rounded-card p-10 text-center text-secondary text-sm">
              No pending requests match your filters.
            </div>
          )}

          {visiblePending.map((req) => (
            <div
              key={req.id}
              className={`bg-card border border-border rounded-card p-6 hover:shadow-card hover:border-border-hover transition-all ${
                req.type === 'Emergency' ? 'border-l-4 border-l-danger' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-background flex-shrink-0">
                    <img src={req.avatar} alt={req.employeeName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold">{req.employeeName}</h5>
                    <p className="text-sm text-secondary">{req.role}</p>
                  </div>
                </div>
                <span
                  className="px-3 py-1 text-[10px] font-bold rounded-full border uppercase"
                  style={{
                    color: typeStyle[req.type].color,
                    backgroundColor: `${typeStyle[req.type].color}1A`,
                    borderColor: `${typeStyle[req.type].color}33`
                  }}
                >
                  {req.type} Leave
                </span>
              </div>
              <div className="grid grid-cols-2 gap-8 mb-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-secondary mb-1">
                    Duration
                  </p>
                  <p className="text-sm font-semibold">{req.period}</p>
                  <p className="text-xs text-secondary">
                    {req.days} Working Day{req.days > 1 ? 's' : ''}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-secondary mb-1">
                    Reason
                  </p>
                  <p className="text-sm">{req.reason}</p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => rejectLeave(req.id)}
                  className="px-4 py-2 text-secondary text-sm hover:bg-background rounded-lg transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={() => approveLeave(req.id)}
                  className="px-6 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h4 className="font-bold text-sm mb-4 px-1">Recently Approved</h4>
        <div className="bg-card border border-border rounded-card overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-secondary">
                  Employee
                </th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-secondary">
                  Type
                </th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-secondary">
                  Period
                </th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-secondary">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-secondary text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {approvedOrRejected.map((row) => (
                <tr key={row.id} className="hover:bg-background transition-colors">
                  <td className="px-6 py-4 text-sm font-medium">{row.employeeName}</td>
                  <td className="px-6 py-4">
                    <span
                      className="w-2 h-2 inline-block rounded-full mr-2"
                      style={{ backgroundColor: typeStyle[row.type].color }}
                    />
                    <span className="text-sm">{row.type}</span>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm">{row.period}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase ${
                        row.status === 'Approved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Dropdown
                      items={[
                        {
                          label: 'View',
                          icon: 'visibility',
                          onClick: () => showToast(`Viewing ${row.employeeName}'s leave record`, 'success')
                        }
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
