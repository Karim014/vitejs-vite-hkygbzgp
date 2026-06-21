import { useState } from 'react'
import Modal from '../components/Modal.jsx'
import { useApp } from '../context/AppContext.jsx'

const leaveTypes = ['Annual', 'Sick', 'Emergency']

export default function NewLeaveRequestModal({ open, onClose }) {
  const { addLeaveRequest } = useApp()
  const [type, setType] = useState('Annual')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')

  const reset = () => {
    setType('Annual')
    setStartDate('')
    setEndDate('')
    setReason('')
    setError('')
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!startDate || !endDate) {
      setError('Please select a start and end date')
      return
    }

    const days =
      Math.round((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1

    if (days < 1) {
      setError('End date must be after the start date')
      return
    }

    addLeaveRequest({
      type,
      period: `${formatDate(startDate)} \u2014 ${formatDate(endDate)}`,
      days,
      reason: reason.trim() || 'No additional notes provided.'
    })

    reset()
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title="New Leave Request">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-secondary mb-1.5 block">
            Leave Type
          </label>
          <div className="flex gap-2">
            {leaveTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                  type === t ? 'border-primary bg-background' : 'border-border hover:bg-background'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-secondary mb-1.5 block">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-secondary mb-1.5 block">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-secondary mb-1.5 block">
            Reason
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            placeholder="Add any context for your manager..."
            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
          />
        </div>

        {error && <p className="text-xs text-danger">{error}</p>}

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
            Submit Request
          </button>
        </div>
      </form>
    </Modal>
  )
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
