import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Main from './components/Main'
import Footer from './components/Footer'
import { useSelector, useDispatch } from 'react-redux'

function App() {
  const menuSelector = useSelector(state => state.menuSelector)
  const soundSelector = useSelector(state => state.soundSelector)
  const howtoplaySelector = useSelector(state => state.howtoplay)
  const dispatch = useDispatch()
  useEffect(() => {
    const setScreenHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setScreenHeight();

    window.addEventListener('resize', setScreenHeight);

    return () => {
      window.removeEventListener('resize', setScreenHeight);
    };
  }, []);



  return (
    <div className="min-h-screen-safe h-screen-safe w-screen  bg-black m-0 p-0 flex justify-center items-center">

      <div className='border-amber-500 relative min-h-screen-safe h-screen-safe bg-radial-[at_50%_80%] to-[#3B5097] from-[#084DBA] to-70% border-2 rounded-2xl w-screen flex justify-between flex-col'>

        <Navbar />
        <Main />
        <Footer />
      </div>

    </div>
  )
}

export default App
