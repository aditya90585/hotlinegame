import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PiBombFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";

const Gamesselector = () => {
  const GamesSelector = useSelector(state => state.GamesSelector)
  const dispatch = useDispatch()
  return (
    <div className={`fixed bg-[#212226] h-70 w-90 md:top-9 md:left-2 bottom-9 flex items-center flex-col  left-2 rounded-2xl z-20  ${GamesSelector ? "" : "hidden"}`}>
      <div className='flex w-full h-full m-auto flex-wrap'>
        <div className='w-1/4 h-1/3 flex justify-center items-center'><FaStar className='text-[#FEF4E0] h-[60%] w-[60%] drop-shadow-[6px_5px_4px_#F78513]' /></div>
        <div className='w-1/4 h-1/3 flex justify-center items-center'><FaStar className='text-[#FEF4E0] h-[60%] w-[60%] drop-shadow-[6px_5px_4px_#F78513]' /></div>
        <div className='w-1/4 h-1/3 flex justify-center items-center'><FaStar className='text-[#FEF4E0] h-[60%] w-[60%] drop-shadow-[6px_5px_4px_#F78513]' /></div>
        <div className='w-1/4 h-1/3 flex justify-center items-center'><FaStar className='text-[#FEF4E0] h-[60%] w-[60%] drop-shadow-[6px_5px_4px_#F78513]' /></div>
        <div className='w-1/4 h-1/3 flex justify-center items-center'><FaStar className='text-[#FEF4E0] h-[60%] w-[60%] drop-shadow-[6px_5px_4px_#F78513]' /></div>
        <div className='w-1/4 h-1/3 flex justify-center items-center'><FaStar className='text-[#FEF4E0] h-[60%] w-[60%] drop-shadow-[6px_5px_4px_#F78513]' /></div>
        <div className='w-1/4 h-1/3 flex justify-center items-center'><FaStar className='text-[#FEF4E0] h-[60%] w-[60%] drop-shadow-[6px_5px_4px_#F78513]' /></div>
        <div className='w-1/4 h-1/3 flex justify-center items-center'><FaStar className='text-[#FEF4E0] h-[60%] w-[60%] drop-shadow-[6px_5px_4px_#F78513]' /></div>
        <div className='w-1/4 h-1/3 flex justify-center items-center'><FaStar className='text-[#FEF4E0] h-[60%] w-[60%] drop-shadow-[6px_5px_4px_#F78513]' /></div>


      </div>
    </div>
  )
}

export default Gamesselector
