import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface Device {
  id: string
  name: string
  size: string
  dmxAddress: string
  preset: string
}

export default function ManualControlPage() {
  const [devices, setDevices] = useState<Device[]>([])
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [channelValues, setChannelValues] = useState<number[]>([])

  useEffect(() => {
    const storedDevices = localStorage.getItem('devices')
    if (storedDevices) {
      const parsedDevices = JSON.parse(storedDevices)
      setDevices(parsedDevices)

      const storedSelectedDeviceId = localStorage.getItem('selectedDeviceId')
      if (storedSelectedDeviceId) {
        const device = parsedDevices.find((d: Device) => d.id === storedSelectedDeviceId)
        if (device) {
          setSelectedDevice(device)
          const storedValues = localStorage.getItem(`channelValues-${device.id}`)
          setChannelValues(
            storedValues ? JSON.parse(storedValues) : new Array(parseInt(device.size)).fill(0)
          )
        }
      }
    }
  }, [])

  const handleDeviceSelect = (device: Device) => {
    setSelectedDevice(device)
    const storedValues = localStorage.getItem(`channelValues-${device.id}`)
    const newValues = storedValues
      ? JSON.parse(storedValues)
      : new Array(parseInt(device.size)).fill(0)
    setChannelValues(newValues)
    localStorage.setItem('selectedDeviceId', device.id)
  }

  const handleChannelChange = (index: number, value: number) => {
    const newValues = [...channelValues]
    newValues[index] = value
    setChannelValues(newValues)
    if (selectedDevice) {
      localStorage.setItem(`channelValues-${selectedDevice.id}`, JSON.stringify(newValues))
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white text-center">Manual Device Control</h1>

        <div className="bg-black/30 p-6 rounded-lg border border-cosmos/10 mb-8">
          <div className="relative">
            <select
              className="w-full px-4 py-2.5 bg-black/50 text-white rounded-lg appearance-none border border-cosmos/20 focus:border-cosmos focus:outline-none"
              value={selectedDevice?.id || ''}
              onChange={(e) => {
                const device = devices.find(d => d.id === e.target.value)
                if (device) handleDeviceSelect(device)
              }}
            >
              <option value="">Select a device...</option>
              {devices.map(device => (
                <option key={device.id} value={device.id}>
                  {device.name} ({device.id})
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cosmos w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {selectedDevice && (
          <div className="bg-black/30 p-6 rounded-lg border border-cosmos/10">
            <h2 className="text-xl font-bold mb-6 text-white">
              Channel Controls for {selectedDevice.name}
            </h2>
            <div className="space-y-6">
              {channelValues.map((value, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Channel {index + 1}</span>
                    <span>{value}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={value}
                    onChange={(e) => handleChannelChange(index, parseInt(e.target.value))}
                    className="w-full h-2 bg-black/50 rounded-lg appearance-none cursor-pointer accent-cosmos"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
