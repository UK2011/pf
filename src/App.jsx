import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Button from '@mui/material/Button'

function App() {

  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleExpand = (e) => {
    setIsNavOpen(!isNavOpen)


  }


  return (
    <>
      <Button onClick={handleExpand} className='expand-btn' variant="contained">+</Button>

      {isNavOpen && (<Navbar />)}
      <Hero />





    </>
  )
}

export default App
