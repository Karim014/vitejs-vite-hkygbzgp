import { useState } from 'react'
import Layout from '../components/Layout.jsx'
import NewContractModal from '../modals/NewContractModal.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function Placeholder({ title, icon, description, showContractAction }) {
  const [contractOpen, setContractOpen] = useState(false)
  const { showToast } = useApp()

  return (
    <Layout title={title}>
      <div className="bg-card border border-border rounded-card p-16 flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-5xl text-secondary mb-4">{icon}</span>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-secondary text-sm max-w-md mb-6">{description}</p>
        {showContractAction ? (
          <button
            onClick={() => setContractOpen(true)}
            className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            New Contract
          </button>
        ) : (
          <button
            onClick={() => showToast('This section is under construction', 'warning')}
            className="px-5 py-2.5 border border-border text-sm font-semibold rounded-lg hover:bg-background transition-colors"
          >
            Notify Me When Ready
          </button>
        )}
      </div>
      <NewContractModal open={contractOpen} onClose={() => setContractOpen(false)} />
    </Layout>
  )
}
