import { LayoutDashboard, Eye, Plug, Stars, Zap, Timer } from 'lucide-react'
import { useEffect, useState } from 'react'

const translations = {
  en: {
    welcome: 'Welcome to CosmosPulse',
    description: 'The ultimate DMX control software for professional lighting setups.',
    features: 'Features',
    intuitiveControl: 'Intuitive Control',
    intuitiveDesc: 'Easily manage complex DMX setups with our user-friendly interface.',
    realtimeMonitoring: 'Real-time Monitoring',
    monitoringDesc: 'Track your lighting status and make adjustments on the fly.',
    seamlessIntegration: 'Seamless Integration',
    integrationDesc: 'Works perfectly with your existing DMX hardware and software.',
    comingSoon: 'Coming Soon',
    showAutomation: 'Show Automation',
    showAutomationDesc: 'Create and schedule automated lighting shows.',
    effectLibrary: 'Effect Library',
    effectLibraryDesc: 'Access a growing library of pre-built lighting effects.',
    remoteControl: 'Remote Control',
    remoteControlDesc: 'Control your lighting setup from anywhere.'
  },
  es: {
    welcome: 'Bienvenido a CosmosPulse',
    description: 'El software de control DMX definitivo para configuraciones de iluminación profesional.',
    features: 'Características',
    intuitiveControl: 'Control Intuitivo',
    intuitiveDesc: 'Administre configuraciones DMX complejas con nuestra interfaz fácil de usar.',
    realtimeMonitoring: 'Monitoreo en Tiempo Real',
    monitoringDesc: 'Siga el estado de su iluminación y haga ajustes sobre la marcha.',
    seamlessIntegration: 'Integración Perfecta',
    integrationDesc: 'Funciona perfectamente con su hardware y software DMX existente.',
    comingSoon: 'Próximamente',
    showAutomation: 'Automatización de Shows',
    showAutomationDesc: 'Cree y programe shows de iluminación automatizados.',
    effectLibrary: 'Biblioteca de Efectos',
    effectLibraryDesc: 'Acceda a una biblioteca creciente de efectos de iluminación prediseñados.',
    remoteControl: 'Control Remoto',
    remoteControlDesc: 'Controle su configuración de iluminación desde cualquier lugar.'
  }
}

export default function HomePage() {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en'
    setLanguage(savedLanguage)
  }, [])

  const t = translations[language as keyof typeof translations]

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-cosmos/20 to-black/40 p-8 border border-cosmos/10">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white bg-clip-text text-transparent bg-gradient-to-r from-cosmos to-purple-500">
            {t.welcome}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">{t.description}</p>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM4QjVDRjYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMEYwRkYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNMTAwIDAgQzE1NSAwIDIwMCA0NSAyMDAgMTAwIEMyMDAgMTU1IDE1NSAyMDAgMTAwIDIwMCBDNDUgMjAwIDAgMTU1IDAgMTAwIEMwIDQ1IDQ1IDAgMTAwIDAiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=')] bg-no-repeat bg-cover" />
      </div>

      {/* Features Grid */}
      <div className="p-6 bg-black/30 rounded-xl border border-cosmos/10">
        <h2 className="text-2xl font-semibold text-white mb-6">{t.features}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-black/20 rounded-lg border border-cosmos/5 hover:border-cosmos/20 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <LayoutDashboard className="w-8 h-8 text-cosmos" />
              <h3 className="text-lg font-medium text-white">{t.intuitiveControl}</h3>
            </div>
            <p className="text-gray-300">{t.intuitiveDesc}</p>
          </div>
          <div className="p-6 bg-black/20 rounded-lg border border-cosmos/5 hover:border-cosmos/20 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-8 h-8 text-cosmos" />
              <h3 className="text-lg font-medium text-white">{t.realtimeMonitoring}</h3>
            </div>
            <p className="text-gray-300">{t.monitoringDesc}</p>
          </div>
          <div className="p-6 bg-black/20 rounded-lg border border-cosmos/5 hover:border-cosmos/20 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <Plug className="w-8 h-8 text-cosmos" />
              <h3 className="text-lg font-medium text-white">{t.seamlessIntegration}</h3>
            </div>
            <p className="text-gray-300">{t.integrationDesc}</p>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="p-6 bg-gradient-to-br from-purple-900/20 to-cosmos/5 rounded-xl border border-cosmos/10">
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
          <Stars className="w-6 h-6 text-cosmos" />
          {t.comingSoon}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-black/40 rounded-lg border border-cosmos/5">
            <div className="flex items-center gap-2 mb-3">
              <Timer className="w-6 h-6 text-cosmos" />
              <h3 className="text-lg font-medium text-white">{t.showAutomation}</h3>
            </div>
            <p className="text-gray-400">{t.showAutomationDesc}</p>
          </div>
          <div className="p-4 bg-black/40 rounded-lg border border-cosmos/5">
            <div className="flex items-center gap-2 mb-3">
              <Stars className="w-6 h-6 text-cosmos" />
              <h3 className="text-lg font-medium text-white">{t.effectLibrary}</h3>
            </div>
            <p className="text-gray-400">{t.effectLibraryDesc}</p>
          </div>
          <div className="p-4 bg-black/40 rounded-lg border border-cosmos/5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-6 h-6 text-cosmos" />
              <h3 className="text-lg font-medium text-white">{t.remoteControl}</h3>
            </div>
            <p className="text-gray-400">{t.remoteControlDesc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
