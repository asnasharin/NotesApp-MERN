import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/ContextProvoder'

function Navbar({setQuery}) {
  const {user} = useAuth()
  const navigate = useNavigate()

  const onLogout =  () => {
    localStorage.removeItem("token")
    navigate("/signin")
  }
  return (
    <nav className="bg-teal-600 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        <div className="text-2xl font-bold mb-2 md:mb-0">
          <Link to="/">NotesApp</Link>
        </div>

        <div className="w-full md:w-1/3 mb-2 md:mb-0">
          <input
            type="text"
            placeholder="Search notes..."
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-3 py-1 rounded text-black"
          />
        </div>


        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="hidden md:inline">Hi, {user.name}</span>
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="bg-white text-teal-600 px-3 py-1 rounded hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-teal-600 px-3 py-1 rounded hover:bg-gray-100"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
