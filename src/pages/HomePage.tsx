import { LayoutDashboard, Eye, Plug } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-white">Welcome to CosmosPulse</h1>
      <p className="text-gray-300">
        The ultimate DMX control software for professional lighting setups.
      </p>
      <div className="mt-8 p-6 bg-black/30 rounded-lg border border-cosmos/10">
        <h2 className="text-xl font-semibold text-white mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-black/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <LayoutDashboard className="w-6 h-6 text-cosmos" />
              <h3 className="text-lg font-medium text-white">Intuitive Control</h3>
            </div>
            <p className="text-gray-300">Easily manage complex DMX setups with our user-friendly interface.</p>
          </div>
          <div className="p-4 bg-black/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-6 h-6 text-cosmos" />
              <h3 className="text-lg font-medium text-white">Real-time Monitoring</h3>
            </div>
            <p className="text-gray-300">Track your lighting status and make adjustments on the fly.</p>
          </div>
          <div className="p-4 bg-black/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Plug className="w-6 h-6 text-cosmos" />
              <h3 className="text-lg font-medium text-white">Seamless Integration</h3>
            </div>
            <p className="text-gray-300">Works perfectly with your existing DMX hardware and software.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
