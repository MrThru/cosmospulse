import { useState, useEffect } from 'react'
import DeviceCard from '../components/DeviceCard'
import DeviceForm from '../components/DeviceForm'
import EditDeviceModal from '../components/EditDeviceModal'
import { Plus, X } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import type { Channel } from '../components/ChannelConfig'

const DEVICE_IMAGE = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

interface Device {
  id: string
  name: string
  dmxAddress: string
  size: string
  preset: string
  deviceType: string
  image: string
  channels?: Channel[]
}

function generateDeviceId(preset: string) {
  const randomNumber = Math.floor(Math.random() * 900) + 100
  return preset === 'Custom' ? `OTH-${randomNumber}` : `COS-${randomNumber}`
}

async function sendDeviceToServer(device: Device) {
  try {
    const response = await fetch('http://localhost:1323/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        constructdevice: {
          id: device.id,
          type: device.deviceType,
          addstart: device.dmxAddress,
          addsize: device.size,
          channels: device.channels
        }
      })
    })
    
    if (!response.ok) {
      throw new Error('Failed to send device to server')
    }
  } catch (error) {
    console.error('Error sending device to server:', error)
  }
}

export default function DevicesPage() {
  const { language } = useLanguage()
  const [devices, setDevices] = useState<Device[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingDevice, setEditingDevice] = useState<Device | null>(null)
  const [deviceToRemove, setDeviceToRemove] = useState<string | null>(null)

  const translations = {
    en: {
      title: "DMX Devices",
      addDevice: "Add Device",
      addNewDevice: "Add New Device",
      confirmRemoval: "Confirm Removal",
      removeConfirmation: "Are you sure you want to remove this device?",
      cancel: "Cancel",
      remove: "Remove Device"
    },
    es: {
      title: "Dispositivos DMX",
      addDevice: "Agregar Dispositivo",
      addNewDevice: "Agregar Nuevo Dispositivo",
      confirmRemoval: "Confirmar Eliminación",
      removeConfirmation: "¿Está seguro de que desea eliminar este dispositivo?",
      cancel: "Cancelar",
      remove: "Eliminar Dispositivo"
    }
  }

  useEffect(() => {
    const storedDevices = localStorage.getItem('devices')
    if (storedDevices) {
      setDevices(JSON.parse(storedDevices))
    }
  }, [])

  const handleAddDevice = async (newDevice) => {
    const device = {
      ...newDevice,
      id: generateDeviceId(newDevice.preset),
      image: DEVICE_IMAGE,
      preset: newDevice.preset
    }
    
    const updatedDevices = [...devices, device]
    setDevices(updatedDevices)
    localStorage.setItem('devices', JSON.stringify(updatedDevices))
    
    await sendDeviceToServer(device)
    
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

  const t = translations[language]

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">{t.title}</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-cosmos text-white px-4 py-2 rounded-md hover:bg-cosmos-light transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {t.addDevice}
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-black/70 rounded-lg p-6 max-w-md w-full border border-cosmos/20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">{t.addNewDevice}</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
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
            <h2 className="text-xl font-bold text-white mb-4">{t.confirmRemoval}</h2>
            <p className="text-gray-300 mb-6">{t.removeConfirmation}</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeviceToRemove(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleRemoveDevice}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                {t.remove}
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
