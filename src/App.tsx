import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DevicesPage from './pages/DevicesPage'
import SettingsPage from './pages/SettingsPage'
import ShowControlPage from './pages/ShowControlPage'
import ManualControlPage from './pages/ManualControlPage'
import { Home, Settings, Disc, Play, Sliders } from 'lucide-react'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black cosmos-gradient from-cosmos via-cosmos-dark to-black select-none">
        <nav className="bg-black/50 backdrop-blur-md border-b border-cosmos/20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link to="/" className="text-xl font-bold text-white">
                  <span className="bg-gradient-to-r from-cosmos to-cyan-500 bg-clip-text text-transparent">
                    CosmosPulse
                  </span>
                </Link>
                <span className="ml-2 text-sm text-gray-400">by CosmosFX</span>
                <span className="ml-2 px-2 py-1 text-xs font-medium text-cosmos bg-cosmos/10 rounded-full border border-cosmos/20">
                  Alpha-Testing
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    className="flex items-center px-3 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <Home className="w-5 h-5 mr-2" />
                    Home
                  </Link>
                  <Link
                    to="/devices"
                    className="flex items-center px-3 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <Disc className="w-5 h-5 mr-2" />
                    Devices
                  </Link>
                  <Link
                    to="/show-control"
                    className="flex items-center px-3 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Show Control
                  </Link>
                  <Link
                    to="/manual-control"
                    className="flex items-center px-3 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <Sliders className="w-5 h-5 mr-2" />
                    Manual Control
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-3 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <Settings className="w-5 h-5 mr-2" />
                    Settings
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-2 ml-4">
                    <button
                      className="px-4 py-2 text-sm font-medium text-white bg-cosmos/50 hover:bg-cosmos/70 rounded-md transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      className="px-4 py-2 text-sm font-medium text-white bg-cosmos hover:bg-cosmos-light rounded-md transition-colors"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/devices" element={<DevicesPage />} />
            <Route path="/show-control" element={<ShowControlPage />} />
            <Route path="/manual-control" element={<ManualControlPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
