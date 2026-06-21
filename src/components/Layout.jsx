import { useState } from 'react'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'
import ToastContainer from './Toast.jsx'
import NewLeaveRequestModal from '../modals/NewLeaveRequestModal.jsx'

export default function Layout({ title, children }) {
  const [requestOpen, setRequestOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <Sidebar />
      <Topbar title={title} onNewRequest={() => setRequestOpen(true)} />
      <main className="pt-topbar pl-sidebar min-h-screen">
        <div className="max-w-[1200px] mx-auto p-8">{children}</div>
      </main>

      <NewLeaveRequestModal open={requestOpen} onClose={() => setRequestOpen(false)} />
      <ToastContainer />
    </div>
  )
}
