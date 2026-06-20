import React, { createContext, useContext, useState, useCallback } from 'react'
import {
  initialEmployees,
  initialLeaves,
  recentActivities,
  upcomingLeaves,
  headcountDistribution,
  dashboardStats,
  currentUser
} from '../data/mockData.js'

const AppContext = createContext(null)

let toastIdCounter = 1

export function AppProvider({ children }) {
  const [employees, setEmployees] = useState(initialEmployees)
  const [leaves, setLeaves] = useState(initialLeaves)
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, variant = 'success') => {
    const id = toastIdCounter++
    setToasts((prev) => [...prev, { id, message, variant }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addEmployee = useCallback(
    (employee) => {
      const id = `emp-${Date.now()}`
      setEmployees((prev) => [
        {
          id,
          status: 'Active',
          avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(
            employee.name
          )}&backgroundColor=f1edec`,
          joined: new Date().toISOString().slice(0, 10),
          ...employee
        },
        ...prev
      ])
      showToast(`${employee.name} was added to the team`, 'success')
    },
    [showToast]
  )

  const updateEmployee = useCallback(
    (id, updates) => {
      setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)))
      showToast('Employee details updated', 'success')
    },
    [showToast]
  )

  const deleteEmployee = useCallback(
    (id) => {
      setEmployees((prev) => prev.filter((e) => e.id !== id))
      showToast('Employee removed', 'danger')
    },
    [showToast]
  )

  const approveLeave = useCallback(
    (id) => {
      const leave = leaves.find((l) => l.id === id)
      setLeaves((prev) => prev.map((l) => (l.id === id ? { ...l, status: 'Approved' } : l)))
      if (leave) showToast(`${leave.employeeName}'s leave request was approved`, 'success')
    },
    [leaves, showToast]
  )

  const rejectLeave = useCallback(
    (id) => {
      const leave = leaves.find((l) => l.id === id)
      setLeaves((prev) => prev.map((l) => (l.id === id ? { ...l, status: 'Rejected' } : l)))
      if (leave) showToast(`${leave.employeeName}'s leave request was rejected`, 'danger')
    },
    [leaves, showToast]
  )

  const addLeaveRequest = useCallback(
    (request) => {
      const id = `lv-${Date.now()}`
      setLeaves((prev) => [
        {
          id,
          status: 'Pending',
          avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(
            currentUser.name
          )}&backgroundColor=f1edec`,
          employeeName: currentUser.name,
          role: currentUser.role,
          ...request
        },
        ...prev
      ])
      showToast('Leave request submitted for approval', 'success')
    },
    [showToast]
  )

  const value = {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    leaves,
    approveLeave,
    rejectLeave,
    addLeaveRequest,
    recentActivities,
    upcomingLeaves,
    headcountDistribution,
    dashboardStats,
    currentUser,
    toasts,
    showToast,
    dismissToast
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
