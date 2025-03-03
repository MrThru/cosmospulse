import { useState, useEffect } from 'react'

export default function SettingsPage() {
  const [showConsoleLogs, setShowConsoleLogs] = useState(false)

  useEffect(() => {
    const savedSetting = localStorage.getItem('showConsoleLogs')
    if (savedSetting) {
      setShowConsoleLogs(savedSetting === 'true')
    }
  }, [])

  const handleToggle = () => {
    const newValue = !showConsoleLogs
    setShowConsoleLogs(newValue)
    localStorage.setItem('showConsoleLogs', newValue.toString())
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-white">Settings</h1>
      <div className="bg-black/30 p-6 rounded-lg border border-cosmos/10">
        <p className="text-gray-300">Configure your CosmosHub application settings here.</p>
        
        <div className="mt-6 pt-6 border-t border-cosmos/10">
          <h2 className="text-xl font-bold mb-4 text-white">Advanced Features</h2>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-300">Show Console Logs</h3>
              <p className="text-sm text-gray-400">Display server communication logs in Show Control</p>
            </div>
            <button
              onClick={handleToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showConsoleLogs ? 'bg-cosmos' : 'bg-gray-700'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showConsoleLogs ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-cosmos/10">
          <p className="text-sm text-gray-400">CosmosHub v1.0.0</p>
        </div>
      </div>
    </div>
  )
}
