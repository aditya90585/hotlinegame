import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RxCross1 } from "react-icons/rx";
import { SetGameLimitsSelector } from '../features/GameSlices';
const Gamelimits = () => {
    const dispatch = useDispatch()
    const GamelimitsSelector = useSelector(state => state.gameLimitsSelector)

    return (
        <div className={`fixed bg-[#212226] z-20 md:h-[42%] h-[42%] md:w-[30%] w-[90%] md:top-20 bottom-30 md:left-[35%] left-[5%] rounded-xl  ${GamelimitsSelector ? "" : "hidden"}`}>
            <div className=' flex justify-between items-center text-white m-4'><span className='font-semibold font-sans'>GAME LIMITS</span>
                <span onClick={() => dispatch(SetGameLimitsSelector(false))} className='rounded-full cursor-pointer flex bg-[#373E48] p-0.5 inset-shadow-[0.4px_0.4px_0.8px_white]'><RxCross1 className='p-0.5' /></span></div>
            <div className='w-full h-px bg-[#38393C]'></div>

            <div className='text-[#8B8B8C] mt-2 ml-4'>Game limits are managed by operator. Current game limits for this game are below</div>
            <div className='mx-4 mt-5 flex justify-center gap-y-px flex-col'>
                <div className='flex justify-between items-center bg-[#1A1B1E] p-2 rounded-md w-full '><span className='text-[#A8A8A8] text-sm'>Maximum bet USD:</span><span className='bg-[#575C68] px-2 py-0.5 text-sm  rounded-xl text-white'>100.00</span></div>
                
                 <div className='flex justify-between items-center bg-[#1A1B1E] p-2 rounded-md w-full '><span className='text-[#A8A8A8] text-sm'>Minimum bet USD:</span><span className='bg-[#575C68] px-2 py-0.5 text-sm  rounded-xl text-white'>0.10</span></div>

                <div className='flex justify-between items-center bg-[#1A1B1E] p-2 rounded-md w-full '><span className='text-[#A8A8A8] text-sm'>Maximum win for one bet USD:</span><span className='bg-[#575C68] px-2 py-0.5 text-sm  rounded-xl text-white'>10,000.00</span></div>


            </div>

        </div>
    )
}

export default Gamelimits