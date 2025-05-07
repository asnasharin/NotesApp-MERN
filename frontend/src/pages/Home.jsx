import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import NoteModal from '../components/NoteModal'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [isModalOpen, setModalOpen] = useState()
  const navigate = useNavigate()

  const closeModal = () => {
    setModalOpen(false)
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