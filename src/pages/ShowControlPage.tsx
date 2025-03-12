import { useState, useEffect } from 'react'
import { Play, Download } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function ShowControlPage() {
  const { language } = useLanguage()
  const [isRunning, setIsRunning] = useState(() => {
    const saved = localStorage.getItem('showRunningState')
    return saved === 'true'
  })
  
  const [logs, setLogs] = useState<string[]>(() => {
    const saved = localStorage.getItem('showLogs')
    return saved ? JSON.parse(saved) : []
  })
  
  const [showConsoleLogs, setShowConsoleLogs] = useState(() => {
    const saved = localStorage.getItem('showConsoleLogs')
    return saved === 'true'
  })

  const translations = {
    en: {
      title: "Automatic Show Control",
      showRunning: "Show is running... Press again to stop",
      consoleLogs: "Console Logs",
      downloadLogs: "Download Logs",
      starting: "Starting",
      stopping: "Stopping",
      show: "show"
    },
    es: {
      title: "Control Automático del Show",
      showRunning: "Show en ejecución... Presione nuevamente para detener",
      consoleLogs: "Registros de Consola",
      downloadLogs: "Descargar Registros",
      starting: "Iniciando",
      stopping: "Deteniendo",
      show: "show"
    }
  }

  const t = translations[language]

  useEffect(() => {
    localStorage.setItem('showRunningState', isRunning.toString())
  }, [isRunning])

  useEffect(() => {
    localStorage.setItem('showLogs', JSON.stringify(logs))
  }, [logs])

  useEffect(() => {
    localStorage.setItem('showConsoleLogs', showConsoleLogs.toString())
  }, [showConsoleLogs])

  const handleStartShow = () => {
    const action = isRunning ? t.stopping : t.starting
    const newLogs = [...logs, `${new Date().toLocaleTimeString()}: ${action} ${t.show}...`]
    setLogs(newLogs)
    setIsRunning(prev => !prev)
  }

  const handleDownloadLogs = () => {
    const blob = new Blob([logs.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `cosmospulse-logs-${new Date().toISOString()}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white text-center">{t.title}</h1>
        
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
                  {t.showRunning}
                </p>
              </div>
            )}
          </div>
        </div>

        {showConsoleLogs && (
          <div className="mt-8 bg-black/30 p-4 rounded-lg border border-cosmos/10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">{t.consoleLogs}</h2>
              <button
                onClick={handleDownloadLogs}
                className="flex items-center gap-2 bg-cosmos/50 hover:bg-cosmos/70 text-white px-3 py-1.5 rounded-md transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>{t.downloadLogs}</span>
              </button>
            </div>
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
