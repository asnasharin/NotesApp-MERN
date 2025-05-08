import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NoteModal from '../components/NoteModal'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import NoteCard from '../components/NoteCard'

function Home() {
  const [isModalOpen, setModalOpen] = useState()
  const [notes, setNotes] = useState([])
  const [currentNote, setcurrentNote] = useState(null)
  const navigate = useNavigate()


  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/note")
      setNotes(data.notes)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const closeModal = () => {
    setcurrentNote(null)
    setModalOpen(false)
  }

  const handleEditNote = (node) => {
    setcurrentNote(node)
    setModalOpen(true)
  }

  const handleDeleteNote = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/note/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
  
      if (response.data.success) {
        setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete note", error);
    }
  };
  

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

const editNote = async (id, title, desc) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/note/edit/${id}`,
        {  title, desc}, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
    )
    if (response.data.success) {
        fetchNotes()
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
    currentNote= {currentNote}
    editNote={editNote}
    />}
    </div>
  )
}

export default Home