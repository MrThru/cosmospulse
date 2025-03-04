import { useState, useEffect } from 'react'
import DeviceCard from '../components/DeviceCard'
import DeviceForm from '../components/DeviceForm'
import EditDeviceModal from '../components/EditDeviceModal'
import { Plus } from 'lucide-react'

const DEVICE_IMAGE = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

function generateDeviceId(preset: string) {
  const randomNumber = Math.floor(Math.random() * 900) + 100
  return preset === 'Custom' ? `OTH-${randomNumber}` : `COS-${randomNumber}`
}

export default function DevicesPage() {
  const [devices, setDevices] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingDevice, setEditingDevice] = useState(null)
  const [deviceToRemove, setDeviceToRemove] = useState(null)

  useEffect(() => {
    const storedDevices = localStorage.getItem('devices')
    if (storedDevices) {
      setDevices(JSON.parse(storedDevices))
    }
  }, [])

  const handleAddDevice = (newDevice) => {
    const updatedDevices = [...devices, {
      ...newDevice,
      id: generateDeviceId(newDevice.preset),
      image: DEVICE_IMAGE,
      preset: newDevice.preset
    }]
    setDevices(updatedDevices)
    localStorage.setItem('devices', JSON.stringify(updatedDevices))
    setShowForm(false)
  }

  const handleEditDevice = (updatedDevice) => {
    const updatedDevices = devices.map(d => 
      d.id === updatedDevice.id ? { ...updatedDevice } : d
    )
    setDevices(updatedDevices)
    localStorage.setItem('devices', JSON.stringify(updatedDevices))
    setEditingDevice(null)
  }

  const handleRemoveDevice = () => {
    const updatedDevices = devices.filter(d => d.id !== deviceToRemove)
    setDevices(updatedDevices)
    localStorage.setItem('devices', JSON.stringify(updatedDevices))
    localStorage.removeItem(`channelValues-${deviceToRemove}`)
    setDeviceToRemove(null)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">DMX Devices</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-cosmos text-white px-4 py-2 rounded-md hover:bg-cosmos-light transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Device
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-black/70 rounded-lg p-6 max-w-md w-full border border-cosmos/20">
            <DeviceForm onSubmit={handleAddDevice} />
          </div>
        </div>
      )}

      {editingDevice && (
        <EditDeviceModal
          device={editingDevice}
          onSave={handleEditDevice}
          onClose={() => setEditingDevice(null)}
        />
      )}

      {deviceToRemove && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-black/70 rounded-lg p-6 max-w-md w-full border border-cosmos/20">
            <h2 className="text-xl font-bold text-white mb-4">Confirm Removal</h2>
            <p className="text-gray-300 mb-6">Are you sure you want to remove this device?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeviceToRemove(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveDevice}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Remove Device
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => (
          <DeviceCard
            key={device.id}
            id={device.id}
            name={device.name}
            image={DEVICE_IMAGE}
            onEdit={() => setEditingDevice(device)}
            onRemove={() => setDeviceToRemove(device.id)}
          />
        ))}
      </div>
    </div>
  )
}
