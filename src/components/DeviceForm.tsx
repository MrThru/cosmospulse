import { useState, useEffect } from 'react'

interface DeviceFormProps {
  initialData?: {
    name: string
    dmxAddress: string
    size: string
    preset?: string
  }
  onSubmit: (data: {
    name: string
    dmxAddress: string
    size: string
    preset: string
  }) => void
}

const PRESET_CONFIG = {
  Nebula: {
    dmxAddress: '1',
    size: '24'
  },
  Galaxy: {
    dmxAddress: '25',
    size: '32'
  },
  Custom: {
    dmxAddress: '',
    size: ''
  }
}

export default function DeviceForm({ initialData, onSubmit }: DeviceFormProps) {
  const [name, setName] = useState(initialData?.name || '')
  const [dmxAddress, setDmxAddress] = useState(initialData?.dmxAddress || '')
  const [size, setSize] = useState(initialData?.size || '')
  const [preset, setPreset] = useState(initialData?.preset || 'Custom')
  const [isCustom, setIsCustom] = useState(preset === 'Custom')

  useEffect(() => {
    if (preset !== 'Custom') {
      setDmxAddress(PRESET_CONFIG[preset].dmxAddress)
      setSize(PRESET_CONFIG[preset].size)
    }
    setIsCustom(preset === 'Custom')
  }, [preset])

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ name, dmxAddress, size, preset })
      }}
      className="space-y-4"
    >
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
          className={`mt-1 block w-full rounded-md bg-black/20 border border-cosmos/10 text-white focus:border-cosmos focus:ring-cosmos ${
            !isCustom ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          required
          disabled={!isCustom}
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

      <button
        type="submit"
        className="w-full bg-cosmos text-white py-2 px-4 rounded-md hover:bg-cosmos-light transition-colors"
      >
        Save Device
      </button>
    </form>
  )
}
