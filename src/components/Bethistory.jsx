import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { RxCross1 } from "react-icons/rx";
import { SetBethistorySelector } from '../features/GameSlices';


const Bethistory = () => {
    const betHistorySelector = useSelector(state =>state.betHistorySelector)
    const dispatch = useDispatch()
  return (
    <div className={`fixed bg-[#212226] z-20 md:h-full h-[98%] md:w-[96%] w-[96%] top-1 md:left-[2%] left-[2%] rounded-xl overflow-y-scroll ${betHistorySelector? "" : "hidden"}`}>
    <div className=' flex justify-between items-center text-white m-4'><span className='font-semibold font-sans'>BET HISTORY</span>
                   <span onClick={() => dispatch(SetBethistorySelector(false))} className='rounded-full cursor-pointer flex bg-[#373E48] p-0.5 inset-shadow-[0.4px_0.4px_0.8px_white]'><RxCross1 className='p-0.5' /></span></div>
               <div className='w-full h-px bg-[#38393C]'></div>
            <div className='ml-4 text-[#9B9B9B]'>no data found</div>
    </div>
  )
}

export default Bethistory