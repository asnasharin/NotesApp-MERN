 import axios from 'axios'
import React, { createContext, useContext, useEffect, useState} from 'react'

 const authContext = createContext()
 
 function ContextProvoder({children}) {
    const [user, setUser] = useState(null)

    const login = (user) => {
      setUser(user)
    }

    useEffect(() => {
      const verifyUser = async () => {
        try {
          const res = await axios.get('http://localhost:5000/api/auth/verify', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
          if (res.data.success) {
            setUser(res.data.user)
          } else {
            setUser(null)
          }
        } catch (error) {
          console.log(error)
        }
      }
      verifyUser()
    }, [])

   return (
     <authContext.Provider value={{user, login}}>
        {children}
     </authContext.Provider>
   )
 }
 
 export const useAuth = () => useContext(authContext)
 export default ContextProvoder