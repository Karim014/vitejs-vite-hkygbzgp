import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Employees from './pages/Employees.jsx'
import LeaveManagement from './pages/LeaveManagement.jsx'
import Placeholder from './pages/Placeholder.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/leave" element={<LeaveManagement />} />
      <Route
        path="/payroll"
        element={
          <Placeholder
            title="Payroll"
            icon="payments"
            description="Payroll runs, payslips, and compensation history will live here."
          />
        }
      />
      <Route
        path="/contracts"
        element={
          <Placeholder
            title="Contracts"
            icon="description"
            description="Manage employment contracts and templates for your team."
            showContractAction
          />
        }
      />
      <Route
        path="/settings"
        element={
          <Placeholder
            title="Settings"
            icon="settings"
            description="Configure HR Portal preferences, roles, and integrations."
          />
        }
      />
    </Routes>
  )
}
