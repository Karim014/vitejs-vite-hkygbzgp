import { useState, useMemo } from 'react'
import Layout from '../components/Layout.jsx'
import Badge from '../components/Badge.jsx'
import Dropdown from '../components/Dropdown.jsx'
import Modal from '../components/Modal.jsx'
import AddEmployeeModal from '../modals/AddEmployeeModal.jsx'
import { useApp } from '../context/AppContext.jsx'
import { departments, roles } from '../data/mockData.js'

const tabs = ['All Employees', 'Active', 'On Leave', 'Terminated']
const PAGE_SIZE = 5

export default function Employees() {
  const { employees, deleteEmployee, updateEmployee } = useApp()
  const [activeTab, setActiveTab] = useState('All Employees')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [addOpen, setAddOpen] = useState(false)
  const [viewing, setViewing] = useState(null)
  const [editing, setEditing] = useState(null)

  const filtered = useMemo(() => {
    let list = employees
    if (activeTab !== 'All Employees') {
      list = list.filter((e) => e.status === activeTab)
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.department.toLowerCase().includes(q) ||
          e.role.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q)
      )
    }
    return list
  }, [employees, activeTab, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setPage(1)
  }

  const handleSearch = (val) => {
    setQuery(val)
    setPage(1)
  }

  return (
    <Layout title="Employees">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h3 className="text-2xl font-bold">Employees</h3>
        <div className="relative w-full md:max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg">
            search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name, department, or role..."
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-full text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-6 border-b border-border mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`pb-3 px-1 border-b-2 whitespace-nowrap font-medium text-sm transition-colors ${
              activeTab === tab
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-secondary hover:text-primary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-secondary">
                Employee
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-secondary">
                Department
              </th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-secondary">
                Role
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
            {paged.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-secondary text-sm">
                  No employees match your search.
                </td>
              </tr>
            )}
            {paged.map((emp) => (
              <tr key={emp.id} className="hover:bg-background transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-background flex-shrink-0">
                      <img src={emp.avatar} alt={emp.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{emp.name}</p>
                      <p className="text-xs text-secondary">{emp.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{emp.department}</td>
                <td className="px-6 py-4 text-sm text-secondary">{emp.role}</td>
                <td className="px-6 py-4">
                  <Badge>{emp.status}</Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Dropdown
                    items={[
                      { label: 'View', icon: 'visibility', onClick: () => setViewing(emp) },
                      { label: 'Edit', icon: 'edit', onClick: () => setEditing(emp) },
                      {
                        label: 'Delete',
                        icon: 'delete',
                        danger: true,
                        onClick: () => deleteEmployee(emp.id)
                      }
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-secondary">
        <p>
          Showing {paged.length} of {filtered.length}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg hover:bg-background disabled:opacity-30 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">chevron_left</span>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(0, 5)
            .map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  p === currentPage ? 'bg-primary text-white' : 'hover:bg-background'
                }`}
              >
                {p}
              </button>
            ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg hover:bg-background disabled:opacity-30 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setAddOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-50"
        aria-label="Add employee"
      >
        <span className="material-symbols-outlined">add</span>
      </button>

      <AddEmployeeModal open={addOpen} onClose={() => setAddOpen(false)} />

      {/* View modal */}
      <Modal open={!!viewing} onClose={() => setViewing(null)} title="Employee Details">
        {viewing && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-background flex-shrink-0">
                <img src={viewing.avatar} alt={viewing.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold">{viewing.name}</p>
                <p className="text-sm text-secondary">{viewing.role}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Detail label="Email" value={viewing.email} />
              <Detail label="Department" value={viewing.department} />
              <Detail label="Status" value={viewing.status} />
              <Detail label="Joined" value={viewing.joined} />
            </div>
          </div>
        )}
      </Modal>

      {/* Edit modal */}
      <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit Employee">
        {editing && (
          <EditForm
            employee={editing}
            onSave={(updates) => {
              updateEmployee(editing.id, updates)
              setEditing(null)
            }}
            onCancel={() => setEditing(null)}
          />
        )}
      </Modal>
    </Layout>
  )
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-secondary mb-1">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}

function EditForm({ employee, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: employee.name,
    department: employee.department,
    role: employee.role,
    status: employee.status
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSave(form)
      }}
      className="space-y-4"
    >
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-secondary mb-1.5 block">
          Name
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-secondary mb-1.5 block">
            Department
          </label>
          <select
            value={form.department}
            onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-secondary mb-1.5 block">
            Role
          </label>
          <select
            value={form.role}
            onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-secondary mb-1.5 block">
          Status
        </label>
        <select
          value={form.status}
          onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
          className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
        >
          {['Active', 'On Leave', 'Terminated'].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-secondary text-sm hover:bg-background rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          Save Changes
        </button>
      </div>
    </form>
  )
}
