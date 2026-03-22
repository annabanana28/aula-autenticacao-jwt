import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import PHome from './pages/PHome/PHome'
import PPessoa from './pages/PPessoas/PPessoas'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PHome/>}/>
          <Route path='/pessoas' element={<PPessoa/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
