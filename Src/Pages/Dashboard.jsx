import { useState } from 'react'
import Layout from '../components/Layout.jsx'
import StatCard from '../components/StatCard.jsx'
import Badge from '../components/Badge.jsx'
import { useApp } from '../context/AppContext.jsx'
import AddEmployeeModal from '../modals/AddEmployeeModal.jsx'
import NewContractModal from '../modals/NewContractModal.jsx'
import NewLeaveRequestModal from '../modals/NewLeaveRequestModal.jsx'

const typeColor = {
  Annual: '#2EA043',
  Sick: '#D29922',
  Emergency: '#F85149'
}

export default function Dashboard() {
  const { dashboardStats, recentActivities, upcomingLeaves, headcountDistribution, leaves, showToast } =
    useApp()
  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false)
  const [contractOpen, setContractOpen] = useState(false)
  const [requestOpen, setRequestOpen] = useState(false)

  const pendingCount = leaves.filter((l) => l.status === 'Pending').length

  return (
    <Layout title="Dashboard">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="group" label="Total Employees" value="47" trend="+3 this month" trendUp />
        <StatCard
          icon="event_busy"
          label="Pending Leaves"
          value={String(pendingCount).padStart(2, '0')}
        />
        <StatCard
          icon="payments"
          label="This Month Payroll"
          value={`$${dashboardStats.monthlyPayroll.toLocaleString()}`}
        />
        <StatCard icon="description" label="Active Contracts" value="45" />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left/Main column */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Quick Actions */}
          <section className="bg-card border border-border rounded-card p-6">
            <h4 className="font-bold mb-4">Quick Actions</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <QuickAction icon="person_add" label="Add Employee" onClick={() => setAddEmployeeOpen(true)} />
              <QuickAction
                icon="fact_check"
                label="Approve Leaves"
                onClick={() => showToast(`Reviewing ${pendingCount} pending leave requests`, 'success')}
              />
              <QuickAction
                icon="payments"
                label="Generate Payroll"
                onClick={() => showToast('Payroll generation started for September', 'success')}
              />
              <QuickAction icon="description" label="New Contract" onClick={() => setContractOpen(true)} />
            </div>
          </section>

          {/* Recent Activity */}
          <section className="bg-card border border-border rounded-card p-6">
            <h4 className="font-bold mb-4">Recent Activity</h4>
            <div className="space-y-4">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-background flex-shrink-0">
                    <img src={act.avatar} alt={act.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm">
                      <span className="font-semibold">{act.name}</span>{' '}
                      <span className="text-secondary">{act.action}</span>
                    </p>
                    <p className="text-xs text-secondary">{act.time}</p>
                  </div>
                  <Badge>{act.status}</Badge>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Leaves */}
          <section className="bg-card border border-border rounded-card p-6">
            <h4 className="font-bold mb-4">Upcoming Leaves</h4>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {upcomingLeaves.map((leave) => (
                <div
                  key={leave.id}
                  className="min-w-[200px] border border-border rounded-lg p-4 flex-shrink-0"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-background flex-shrink-0">
                      <img src={leave.avatar} alt={leave.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">{leave.name}</p>
                      <p className="text-xs text-secondary">{leave.dates}</p>
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase px-2 py-1 rounded-full"
                    style={{
                      color: typeColor[leave.type],
                      backgroundColor: `${typeColor[leave.type]}1A`
                    }}
                  >
                    {leave.type}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Headcount Distribution */}
          <section className="bg-card border border-border rounded-card p-6">
            <h4 className="font-bold mb-4">Headcount Distribution</h4>
            <div className="space-y-4">
              {headcountDistribution.map((dept) => (
                <div key={dept.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">{dept.label}</span>
                    <span className="text-secondary font-mono">{dept.count}</span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${dept.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Next Event (dark theme) */}
          <section className="bg-primary text-white rounded-card p-6">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-white/60 mb-3">
              Next Event
            </p>
            <h4 className="text-lg font-bold mb-2">Quarterly All-Hands</h4>
            <p className="text-sm text-white/70 mb-4">Sept 30, 2024 — 10:00 AM — Main Auditorium</p>
            <button
              onClick={() => showToast('Added Quarterly All-Hands to your calendar', 'success')}
              className="w-full px-4 py-2.5 bg-white text-primary text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Add to Calendar
            </button>
          </section>
        </div>
      </div>

      <AddEmployeeModal open={addEmployeeOpen} onClose={() => setAddEmployeeOpen(false)} />
      <NewContractModal open={contractOpen} onClose={() => setContractOpen(false)} />
      <NewLeaveRequestModal open={requestOpen} onClose={() => setRequestOpen(false)} />
    </Layout>
  )
}

function QuickAction({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:bg-background hover:border-border-hover transition-all"
    >
      <span className="material-symbols-outlined text-xl">{icon}</span>
      <span className="text-xs font-medium text-center">{label}</span>
    </button>
  )
}
