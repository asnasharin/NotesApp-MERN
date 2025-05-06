import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/signup'
import { BrowserRouter, Routes, Route} from "react-router-dom"

function App() {


  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/signin" element={<Login />}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App
