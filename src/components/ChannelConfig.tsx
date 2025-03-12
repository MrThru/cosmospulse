import { useState } from 'react'
import { Plus, X } from 'lucide-react'

export interface Channel {
  number: number
  function: string
}

interface ChannelConfigProps {
  deviceType: string
  channels: Channel[]
  onChange: (channels: Channel[]) => void
  onClose: () => void
}

const DEVICE_TYPE_FUNCTIONS = {
  'Moving Head RGB': [
    'Yaw Control',
    'Pitch Control',
    'Red',
    'Green',
    'Blue',
    'White',
    'RGB Mode',
    'RGBW Mode',
    'Brightness'
  ],
  'Static RGB': [
    'Red',
    'Green',
    'Blue',
    'White',
    'Brightness'
  ],
  'Generic': [
    'Yaw Control',
    'Pitch Control',
    'Brightness'
  ]
}

export default function ChannelConfig({ deviceType, channels, onChange, onClose }: ChannelConfigProps) {
  const [localChannels, setLocalChannels] = useState<Channel[]>(channels)
  const availableFunctions = DEVICE_TYPE_FUNCTIONS[deviceType] || DEVICE_TYPE_FUNCTIONS['Generic']

  const addChannel = () => {
    const newChannel: Channel = {
      number: localChannels.length + 1,
      function: availableFunctions[0]
    }
    setLocalChannels([...localChannels, newChannel])
  }

  const removeChannel = (index: number) => {
    const updatedChannels = localChannels.filter((_, i) => i !== index)
    setLocalChannels(updatedChannels)
  }

  const updateChannelFunction = (index: number, newFunction: string) => {
    const updatedChannels = localChannels.map((channel, i) => 
      i === index ? { ...channel, function: newFunction } : channel
    )
    setLocalChannels(updatedChannels)
  }

  const handleSave = () => {
    onChange(localChannels)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-black/70 rounded-lg p-6 max-w-md w-full border border-cosmos/20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Configure {deviceType} Channels</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="max-h-[400px] overflow-y-auto mb-4">
          {localChannels.map((channel, index) => (
            <div key={index} className="flex items-center gap-4 mb-2 bg-black/20 p-3 rounded-md">
              <span className="text-white">Channel {channel.number}</span>
              <select
                value={channel.function}
                onChange={(e) => updateChannelFunction(index, e.target.value)}
                className="flex-1 rounded-md bg-black/20 border border-cosmos/10 text-white focus:border-cosmos focus:ring-cosmos"
              >
                {availableFunctions.map((func) => (
                  <option key={func} value={func}>{func}</option>
                ))}
              </select>
              <button
                onClick={() => removeChannel(index)}
                className="text-red-500 hover:text-red-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addChannel}
          className="w-full mb-4 bg-cosmos/20 text-white py-2 px-4 rounded-md hover:bg-cosmos/30 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Channel
        </button>

        <button
          onClick={handleSave}
          className="w-full bg-cosmos text-white py-2 px-4 rounded-md hover:bg-cosmos-light transition-colors"
        >
          Save Configuration
        </button>
      </div>
    </div>
  )
}
