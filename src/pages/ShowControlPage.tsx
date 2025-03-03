import { useState, useEffect } from 'react'
import { Play } from 'lucide-react'

export default function ShowControlPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [showConsoleLogs, setShowConsoleLogs] = useState(false)

  useEffect(() => {
    const savedSetting = localStorage.getItem('showConsoleLogs')
    if (savedSetting) {
      setShowConsoleLogs(savedSetting === 'true')
    }
  }, [])

  const handleStartShow = () => {
    const action = isRunning ? 'Stopping' : 'Starting'
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${action} show...`])
    setIsRunning(prev => !prev)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white text-center">Automatic Show Control</h1>
        
        <div className="bg-black/30 p-8 rounded-lg border border-cosmos/10">
          <div className="text-center">
            <button
              onClick={handleStartShow}
              className="relative w-64 h-64 rounded-full bg-cosmos hover:bg-cosmos-light transition-colors group cursor-pointer"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className={`w-24 h-24 ${isRunning ? 'text-white' : 'text-white/80'} transition-colors`} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                {isRunning && (
                  <div className="absolute w-full h-full animate-ping rounded-full bg-cosmos/40"></div>
                )}
              </div>
            </button>

            {isRunning && (
              <div className="mt-8 text-center">
                <p className="text-gray-300">
                  Show is running... Press again to stop
                </p>
              </div>
            )}
          </div>
        </div>

        {showConsoleLogs && (
          <div className="mt-8 bg-black/30 p-4 rounded-lg border border-cosmos/10">
            <h2 className="text-xl font-bold mb-4 text-white">Console Logs</h2>
            <div className="h-48 overflow-y-auto bg-black/20 p-2 rounded">
              {logs.map((log, i) => (
                <div key={i} className="text-sm text-gray-300 font-mono">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
