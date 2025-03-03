import { Pencil, Trash2 } from 'lucide-react'

interface DeviceCardProps {
  id: string
  name: string
  image: string
  onEdit: () => void
  onRemove: () => void
}

export default function DeviceCard({ id, name, image, onEdit, onRemove }: DeviceCardProps) {
  return (
    <div className="bg-black/30 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-cosmos/10">
      <img 
        src={image} 
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-white">{name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">ID: {id}</span>
          <div className="flex gap-2">
            <button 
              onClick={onEdit}
              className="p-2 rounded-full hover:bg-black/20 transition-colors"
            >
              <Pencil className="w-5 h-5 text-cosmos" />
            </button>
            <button 
              onClick={onRemove}
              className="p-2 rounded-full hover:bg-black/20 transition-colors"
            >
              <Trash2 className="w-5 h-5 text-red-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
