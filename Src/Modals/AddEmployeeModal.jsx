import { useState } from 'react'
import Modal from '../components/Modal.jsx'
import { departments, roles } from '../data/mockData.js'
import { useApp } from '../context/AppContext.jsx'

const empty = { name: '', email: '', department: departments[0], role: roles[0] }

export default function AddEmployeeModal({ open, onClose }) {
  const { addEmployee } = useApp()
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Enter a valid email'

    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }

    addEmployee(form)
    setForm(empty)
    setErrors({})
    onClose()
  }

  const handleClose = () => {
    setForm(empty)
    setErrors({})
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title="Add Employee">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-secondary mb-1.5 block">
            Full Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="e.g. Taylor Reed"
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
          />
          {errors.name && <p className="text-xs text-danger mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-secondary mb-1.5 block">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="taylor.reed@company.com"
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
          />
          {errors.email && <p className="text-xs text-danger mt-1">{errors.email}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-secondary mb-1.5 block">
              Department
            </label>
            <select
              value={form.department}
              onChange={(e) => update('department', e.target.value)}
              className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
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
              onChange={(e) => update('role', e.target.value)}
              className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-secondary text-sm hover:bg-background rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Add Employee
          </button>
        </div>
      </form>
    </Modal>
  )
}
