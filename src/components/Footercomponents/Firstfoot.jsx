import React, { useMemo, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addfixBet, toggleMenu, togglehowtoplay, changefixbettomin, changebetFix, changebetValue, fixBets } from '../../features/GameSlices'

import { useState, useEffect } from 'react'
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { BiSolidCoinStack } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { MdOutlineDone } from "react-icons/md";



const Firstfoot = () => {
    const betamount = useSelector(state => state.betamount)
    const soundSelector = useSelector(state => state.soundSelector)
    const autogameSelector = useSelector(state => state.autoGame)
    const [keyboard, setKeyboard] = useState(false)
    const [numkeys, setNumkeys] = useState([1.00, 2.00, 3.00, 4.00, 5.00, 6.00, 7.00, 8.00, 9.00, ".", 0.00, "delete"])
    const [fixedBetArray, setFixedBetArray] = useState([0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 1.20, 2.00, 4.00, 10.00, 20.00, 50.00, 100.00])
    const [togglefixedamt, setTogglefixedamt] = useState(false)
     const spinstate = useSelector(state => state.spinstate)
    const dispatch = useDispatch()


    const changevalue = (num) => {
        let minestapsound = "/sounds/keyboard-click.mp3"
        let audio = new Audio(minestapsound)
        if (soundSelector) {
            audio.play()
        }
        dispatch(changebetValue(num))
        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))
    }

    const closekeyboard = () => {
        setTogglefixedamt(false)
        setKeyboard(false)
        let minestapsound = "/sounds/select-click.mp3"
        let audio = new Audio(minestapsound)
        if (soundSelector) {
            audio.play()
        }
        dispatch(changebetFix(keyboard))
        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))
    }

    const openkeyboard = () => {
        setTogglefixedamt(false)
        setKeyboard(true)

        dispatch(changefixbettomin(keyboard))
        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))
    }
    const changefixedamt = (amount) => {
        let minestapsound = "/sounds/soft-click.mp3"
        let audio = new Audio(minestapsound)
        if (soundSelector) {
            audio.play()
        }
        dispatch(fixBets(amount))
        setTogglefixedamt(false)
        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))
    }
    const togglefixedbet = () => {
        let minestapsound = "/sounds/cool-click.mp3"
        let audio = new Audio(minestapsound)
        if (soundSelector) {
            audio.play()
        }
        setKeyboard(false)
        setTogglefixedamt(!togglefixedamt)
        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))
    }

    const addfixamount = () => {
        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))
        let minestapsound = "/sounds/cool-click.mp3"
        let audio = new Audio(minestapsound)
        if (soundSelector) {
            audio.play()
        }
        let newbetamount
        fixedBetArray.forEach((e, index) => {
            if (betamount >= e) {


                if (index <= 13) {
                    newbetamount = fixedBetArray[index + 1].toFixed(2)
                }

                if (newbetamount <= 100) {
                    dispatch(addfixBet(newbetamount))
                }
            }

        })
    }
    const subtractfixamount = () => {
        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))
        let minestapsound = "/sounds/cool-click.mp3"
        let audio = new Audio(minestapsound)
        if (soundSelector) {
            audio.play()
        }
        let newbetamount
        fixedBetArray.forEach((e, index) => {
            if (betamount >= e) {


                if (index > 0) {
                    newbetamount = fixedBetArray[index - 1].toFixed(2)

                }
                if (newbetamount >= 0.10) {
                    dispatch(addfixBet(newbetamount))
                }

            }

        })
    }


    return (
        <div className={`bg-[#194EAE] border-[1px] border-gray-800 md:w-1/4 w-9/10 md:h-7/10 h-1/3  rounded-full flex inset-shadow-[0px_0.6px_0px_#476EB4] shadow-[1px_1px_1px_rgb(0,0,0)] ${(autogameSelector || spinstate) ? "disable-div" : ""}`} >
            <div className={`h-50 w-60 bg-[#194EAE] rounded-2xl fixed md:bottom-22 bottom-30 md:left-70  ${keyboard ? "" : "hidden"} inset-shadow-[0.8px_0.6px_0px_#4566A3] shadow-[1px_1px_1px_rgb(0,0,0)]`}>
                <div className='m-2 h-9/12 pb-2 rounded-xl bg-[#194EAE] flex flex-wrap gap-x-1 gap-y-1  justify-center items-center'>
                    {numkeys.map((num, index) => {
                        return <span key={index} onClick={() => changevalue(num)} className='w-2/7 cursor-pointer h-1/4 rounded-md border-black flex border justify-center items-center text-white hover:bg-[#164498] bg-[#194EAE] inset-shadow-[0.8px_0.6px_0px_#4566A3] shadow-[1px_1px_1px_rgb(0,0,0)] active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150'>{(num == "delete") ? <FiDelete /> : `${num}`}</span>
                    })}
                </div>
                <div onClick={closekeyboard} className=' m-2 mx-4  h-1/7 cursor-pointer bg-[#0C2757] text-white rounded-2xl flex justify-center items-center active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150'><MdOutlineDone /></div>
            </div>
            <div className='flex justify-around items-center flex-col w-1/2 '>
                <div className='text-white  text-xs font-semibold font-sans'>Bet USD</div>
                <div onClick={openkeyboard} className='bg-[#113679] cursor-text overflow-hidden mb-0.5 border border-black w-8/10 md:h-6 h-4 rounded-full text-white flex justify-center items-center'>
                    {betamount}
                </div>
            </div>
            <div className={`md:w-1/4 w-9/10 h-90 rounded-xl bg-[#142C5A] fixed md:bottom-22 bottom-30 flex flex-col ${togglefixedamt ? "" : "hidden"}`}>
                <h1 className='text-white font-semibold text-center mx-auto my-2'>BET USD</h1>
                <div className='flex flex-wrap mx-5 h-10/12 gap-y-3 justify-between'>
                    {fixedBetArray.map((amount, index) => {
                        return <div key={index} onClick={() => changefixedamt(amount)} className={`w-4/9 cursor-pointer rounded-xl text-white flex justify-center items-center active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150 ${(amount == betamount) ? "bg-[#153D88]" : "bg-[#103881]"}`}>{amount.toFixed(2)}</div>
                    })}
                </div>
            </div>
            <div className='w-1/2 h-full  flex justify-center items-center gap-x-2'>
                <div onClick={subtractfixamount} className=' p-2 cursor-pointer  border border-gray-700  rounded-full text-white active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150 inset-shadow-[0.8px_0.6px_0px_#476EB4] shadow-[1px_1px_1px_rgb(0,0,0)]'><FaMinus /></div>
                <div onClick={togglefixedbet} className='p-2 cursor-pointer border border-gray-700 rounded-full text-white text-xl active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150 inset-shadow-[0.8px_0.6px_0px_#476EB4] shadow-[1px_1px_1px_rgb(0,0,0)]'><BiSolidCoinStack /></div>
                <div onClick={addfixamount} className=' p-2 cursor-pointer border border-gray-700 rounded-full text-white active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150  inset-shadow-[0.8px_0.6px_0px_#476EB4] shadow-[1px_1px_1px_rgb(0,0,0)]'><FaPlus /></div>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Firstfoot