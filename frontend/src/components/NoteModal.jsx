import axios from 'axios'
import React, { useEffect, useState } from 'react'

function NoteModal({closeModal, addNote, currentNote, editNote}) {

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")

    useEffect(() => {
      if (currentNote) {
        setTitle(currentNote.title)
        setDesc(currentNote.desc)
      }
    }, [currentNote])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(currentNote) {
          await editNote(currentNote._id, title, desc)
        } else {
          await addNote(title, desc)
        }
    }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{currentNote? "Add New Note": "Update Note"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <textarea
            placeholder="Note Description"
            rows={4}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full mb-4 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-200"
          >
            Submit
          </button>
        </form>
        <button className='mt-4 text-red-500' onClick={closeModal}>Cancel</button>
      </div>
    </div>
  )
}

export default NoteModal
