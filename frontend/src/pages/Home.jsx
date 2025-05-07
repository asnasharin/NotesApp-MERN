import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NoteModal from '../components/NoteModal'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import NoteCard from '../components/NoteCard'

function Home() {
  const [isModalOpen, setModalOpen] = useState()
  const [notes, setNotes] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/note")
        setNotes(data.notes)
      } catch (error) {
        console.log(error)
      }
    }
    fetchNotes()
  }, [])

  const closeModal = () => {
    setModalOpen(false)
  }

  const handleEditNote = () => {

  }

  const handleDeleteNote = () => {

  }

  const addNote = async (title, desc) => {
    try {
        const response = await axios.post(
          'http://localhost:5000/api/note/add',
            { title, desc}, 
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
              }
            }
        )
        if (response.data.success) {
            navigate("/")
            closeModal()
        }
    } catch (error) {
        console.log(error)
    }
}



  return (
    <div className='bg-gray-100 min-h-screen'>
    <Navbar />

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {notes.map(note => (
        <NoteCard 
          key={note._id}
          note={note}
          onDelete={handleDeleteNote}
          onEdit={handleEditNote}
        />
      ))}
    </div>
    <button 
    className='fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full'
    onClick={() => setModalOpen(true)}
    >
      +
    </button>
    {isModalOpen && <NoteModal 
    closeModal={closeModal}
    addNote = {addNote}
    />}
    </div>
  )
}

export default Home