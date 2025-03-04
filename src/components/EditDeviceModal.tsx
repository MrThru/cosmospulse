import { useState } from 'react'
import DeviceForm from './DeviceForm'

interface EditDeviceModalProps {
  device: {
    id: string
    name: string
    dmxAddress: string
    size: string
    preset: string
  }
  onSave: (data: {
    id: string
    name: string
    dmxAddress: string
    size: string
    preset: string
  }) => void
  onClose: () => void
}

export default function EditDeviceModal({ device, onSave, onClose }: EditDeviceModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-black/70 rounded-lg p-6 max-w-md w-full border border-cosmos/20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Edit Device</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            &times;
          </button>
        </div>
        <DeviceForm 
          initialData={device}
          onSubmit={(data) => {
            onSave({
              ...data,
              id: device.id // Ensure we keep the same ID
            })
            onClose()
          }}
        />
      </div>
    </div>
  )
}
