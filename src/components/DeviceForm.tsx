import { useState, useEffect } from 'react'
import ChannelConfig, { Channel } from './ChannelConfig'

interface DeviceFormProps {
  initialData?: {
    name: string
    dmxAddress: string
    size: string
    preset?: string
    deviceType?: string
    channels?: Channel[]
  }
  onSubmit: (data: {
    name: string
    dmxAddress: string
    size: string
    preset: string
    deviceType: string
    channels: Channel[]
  }) => void
}

const PRESET_CONFIG = {
  Nebula: {
    size: '8',
    deviceType: 'Moving Head RGB'
  },
  Galaxy: {
    size: '32',
    deviceType: 'Moving Head RGB'
  },
  Custom: {
    size: '',
    deviceType: 'Generic'
  }
}

const DEVICE_TYPES = [
  'Moving Head RGB',
  'Static RGB',
  'Generic'
]

export default function DeviceForm({ initialData, onSubmit }: DeviceFormProps) {
  const [name, setName] = useState(initialData?.name || '')
  const [dmxAddress, setDmxAddress] = useState(initialData?.dmxAddress || '')
  const [size, setSize] = useState(initialData?.size || '')
  const [preset, setPreset] = useState(initialData?.preset || 'Custom')
  const [deviceType, setDeviceType] = useState(initialData?.deviceType || 'Generic')
  const [isCustom, setIsCustom] = useState(preset === 'Custom')
  const [showChannelConfig, setShowChannelConfig] = useState(false)
  const [channels, setChannels] = useState<Channel[]>(initialData?.channels || [])

  useEffect(() => {
    if (preset !== 'Custom') {
      setSize(PRESET_CONFIG[preset].size)
      setDeviceType(PRESET_CONFIG[preset].deviceType)
    }
    setIsCustom(preset === 'Custom')
  }, [preset])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, dmxAddress, size, preset, deviceType, channels })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Device Preset</label>
          <select
            value={preset}
            onChange={(e) => setPreset(e.target.value)}
            className="mt-1 block w-full rounded-md bg-black/20 border border-cosmos/10 text-white focus:border-cosmos focus:ring-cosmos"
          >
            <option value="Nebula">Nebula</option>
            <option value="Galaxy">Galaxy</option>
            <option value="Custom">Custom</option>
          </select>
        </div>

        {isCustom && (
          <div>
            <label className="block text-sm font-medium text-gray-300">Device Type</label>
            <select
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              className="mt-1 block w-full rounded-md bg-black/20 border border-cosmos/10 text-white focus:border-cosmos focus:ring-cosmos"
            >
              {DEVICE_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300">Device Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md bg-black/20 border border-cosmos/10 text-white focus:border-cosmos focus:ring-cosmos"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">DMX Starting Address</label>
          <input
            type="number"
            value={dmxAddress}
            onChange={(e) => setDmxAddress(e.target.value)}
            className="mt-1 block w-full rounded-md bg-black/20 border border-cosmos/10 text-white focus:border-cosmos focus:ring-cosmos"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Size (in channels)</label>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className={`mt-1 block w-full rounded-md bg-black/20 border border-cosmos/10 text-white focus:border-cosmos focus:ring-cosmos ${
              !isCustom ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            required
            disabled={!isCustom}
          />
        </div>

        {isCustom && (
          <button
            type="button"
            onClick={() => setShowChannelConfig(true)}
            className="w-full bg-cosmos/20 text-white py-2 px-4 rounded-md hover:bg-cosmos/30 transition-colors"
          >
            Add Channels ({channels.length} configured)
          </button>
        )}

        <button
          type="submit"
          className="w-full bg-cosmos text-white py-2 px-4 rounded-md hover:bg-cosmos-light transition-colors"
        >
          Save Device
        </button>
      </form>

      {showChannelConfig && (
        <ChannelConfig
          deviceType={deviceType}
          channels={channels}
          onChange={setChannels}
          onClose={() => setShowChannelConfig(false)}
        />
      )}
    </>
  )
}
