import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SetfeeeBetsSelector } from '../features/GameSlices'
import { RxCross1 } from "react-icons/rx";
import { FaRegCircleDot } from "react-icons/fa6";
import { IoTicketOutline } from "react-icons/io5";

const FreeBets = () => {
    const dispatch = useDispatch()
    const FreebetsSelector = useSelector(state => state.freeBetsSelector)
   const [archive, setArchive] = useState(false)

    return (
        <div className={`fixed bg-[#212226] z-20 md:h-[60%] h-[60%] md:w-[30%] w-[90%] md:top-20 bottom-30 md:left-[35%] left-[5%] rounded-xl  ${FreebetsSelector ? "" : "hidden"}`}>
            <div className=' flex justify-between items-center text-white m-4'><span className='font-semibold font-sans'>FREE BETS MANAGEMENT</span>
                <span onClick={() => dispatch(SetfeeeBetsSelector(false))} className='rounded-full cursor-pointer flex bg-[#373E48] p-0.5 inset-shadow-[0.4px_0.4px_0.8px_white]'><RxCross1 className='p-0.5' /></span></div>
            <div className='w-full h-px bg-[#38393C]'></div>
            <div className='w-[96%] h-px bg-[#38393C] my-3 mx-auto'></div>
            <div className='text-white flex items-center ml-4'><span className='text-[#38CA07] mr-1'><FaRegCircleDot /></span>Play With Cash</div>
            <div className='w-[96%] h-px bg-[#38393C] my-3 mx-auto'></div>
            <div className='text-white flex justify-between items-center w-[90%] mt-4 font-sans text-sm m-auto'>{archive?<span>Archive</span>:<span>Active Free Bets</span>} <span onClick={()=> setArchive(!archive)} className='bg-[#373E48] px-1 rounded-sm inset-shadow-[0.5px_0.4px_1px_white] cursor-pointer'>{archive?"Back":"Archive"}</span></div>

            <div className='w-[60%] mx-auto mt-10 text-[#767B85] flex justify-center items-center'><IoTicketOutline className='size-30' /></div>
            <div className='w-[60%] mx-auto mt-2 text-[#767B85] flex justify-center items-center'>{archive?"No archive Free Bets. Yet!":"No active Free Bets. Yet!"}</div>
          
       </div>
    )
}

export default FreeBets