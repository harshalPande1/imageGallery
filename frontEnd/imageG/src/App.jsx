import { useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Protected from './Protected'
import Gallery from './components/Gallery';
function App() {
  const [count, setCount] = useState()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          <Route element={<Protected />}>
            <Route path='/' element={<Gallery />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
