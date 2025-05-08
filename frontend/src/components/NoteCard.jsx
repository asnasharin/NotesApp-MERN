import React from 'react'

function NoteCard({ note, onEdit, onDelete }) {
  const { _id, title, desc, createdAt } = note

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between min-h-[220px] max-h-[240px]">
      <div className="overflow-y-auto max-h-[130px]">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">{title}</h2>
        <p className="text-gray-700 text-sm">{desc}</p>
      </div>

      <div className="text-xs text-gray-400 mt-2">
        {new Date(createdAt).toLocaleDateString()} • {new Date(createdAt).toLocaleTimeString()}
      </div>

      <div className="flex justify-between mt-3">
        <button
          onClick={() => onEdit(note)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(_id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default NoteCard
