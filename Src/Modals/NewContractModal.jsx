import { useState } from 'react'
import Modal from '../components/Modal.jsx'
import { useApp } from '../context/AppContext.jsx'

const templates = [
  { id: 'full-time', label: 'Full-Time Employment', icon: 'work' },
  { id: 'part-time', label: 'Part-Time Agreement', icon: 'schedule' },
  { id: 'contractor', label: 'Independent Contractor', icon: 'badge' },
  { id: 'nda', label: 'NDA & Confidentiality', icon: 'lock' }
]

export default function NewContractModal({ open, onClose }) {
  const { showToast, employees } = useApp()
  const [selected, setSelected] = useState(null)
  const [employeeId, setEmployeeId] = useState('')

  const handleClose = () => {
    setSelected(null)
    setEmployeeId('')
    onClose()
  }

  const handleCreate = () => {
    if (!selected) return
    const template = templates.find((t) => t.id === selected)
    const employee = employees.find((e) => e.id === employeeId)
    showToast(
      `${template.label} contract drafted${employee ? ` for ${employee.name}` : ''}`,
      'success'
    )
    handleClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title="New Contract">
      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-secondary mb-1.5 block">
            Assign To
          </label>
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
          >
            <option value="">Select an employee</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-secondary mb-2 block">
            Choose Template
          </label>
          <div className="grid grid-cols-2 gap-2">
            {templates.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelected(t.id)}
                className={`flex flex-col items-start gap-2 p-3 rounded-lg border text-left transition-all ${
                  selected === t.id
                    ? 'border-primary bg-background'
                    : 'border-border hover:bg-background'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{t.icon}</span>
                <span className="text-sm font-medium">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-secondary text-sm hover:bg-background rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!selected}
            className="px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Create Contract
          </button>
        </div>
      </div>
    </Modal>
  )
}
