import { useState, useEffect } from 'react'

export default function SettingsPage() {
  const [showConsoleLogs, setShowConsoleLogs] = useState(false)
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const savedSetting = localStorage.getItem('showConsoleLogs')
    const savedLanguage = localStorage.getItem('language') || 'en'
    if (savedSetting) {
      setShowConsoleLogs(savedSetting === 'true')
    }
    setLanguage(savedLanguage)
  }, [])

  const handleToggle = () => {
    const newValue = !showConsoleLogs
    setShowConsoleLogs(newValue)
    localStorage.setItem('showConsoleLogs', newValue.toString())
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
    window.location.reload() // Refresh to apply translations
  }

  const translations = {
    en: {
      settings: 'Settings',
      configure: 'Configure your CosmosHub application settings here.',
      account: 'Account',
      signIn: 'Sign In',
      createAccount: 'Create Account',
      advanced: 'Advanced Features',
      consoleLogs: 'Show Console Logs',
      consoleDesc: 'Display server communication logs in Show Control',
      version: 'CosmosHub v1.0.0'
    },
    es: {
      settings: 'Configuración',
      configure: 'Configure los ajustes de su aplicación CosmosHub aquí.',
      account: 'Cuenta',
      signIn: 'Iniciar Sesión',
      createAccount: 'Crear Cuenta',
      advanced: 'Características Avanzadas',
      consoleLogs: 'Mostrar Registros de Consola',
      consoleDesc: 'Mostrar registros de comunicación del servidor en Control de Show',
      version: 'CosmosHub v1.0.0'
    }
  }

  const t = translations[language as keyof typeof translations]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-white">{t.settings}</h1>
      <div className="bg-black/30 p-6 rounded-lg border border-cosmos/10">
        <p className="text-gray-300">{t.configure}</p>
        
        <div className="mt-6 pt-6 border-t border-cosmos/10">
          <h2 className="text-xl font-bold mb-4 text-white">{t.account}</h2>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-cosmos/50 hover:bg-cosmos/70 rounded-md transition-colors"
            >
              {t.signIn}
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-cosmos hover:bg-cosmos-light rounded-md transition-colors"
            >
              {t.createAccount}
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-cosmos/10">
          <h2 className="text-xl font-bold mb-4 text-white">{t.advanced}</h2>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-300">{t.consoleLogs}</h3>
              <p className="text-sm text-gray-400">{t.consoleDesc}</p>
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

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300">Language</label>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="mt-1 block w-full rounded-md bg-black/20 border border-cosmos/10 text-white focus:border-cosmos focus:ring-cosmos"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-cosmos/10">
          <p className="text-sm text-gray-400">{t.version}</p>
        </div>
      </div>
    </div>
  )
}
