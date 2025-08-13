import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { togglehowtoplay, toggleMenu, betAmt, Setspinstate, SetselectedCard } from '../../features/GameSlices';

const Betcomponent = () => {
    const dispatch = useDispatch()
    const autogameSelector = useSelector(state => state.autoGame)
    const [keyboard, setKeyboard] = useState(false)
    const betamount = useSelector(state => state.betamount)
    const soundSelector = useSelector(state => state.soundSelector)
    const [togglefixedamt, setTogglefixedamt] = useState(false)
    const spinstate = useSelector(state => state.spinstate)
    const RiskModeselector = useSelector(state => state.Riskmode)
    const totalAmt = useSelector(state => state.totalAmt)

    const bet = (e) => {
        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))
        if (keyboard == false && Number(betamount) > 0 && autogameSelector == false && Number(totalAmt) > 0 && Number(betamount) > 0 && Number(betamount) <= 100) {
            let minestapsound = "/sounds/bet-click.mp3"
            let audio = new Audio(minestapsound)
            if (soundSelector) {
                audio.play()
            }
            dispatch(betAmt(Number(betamount)))
            setTogglefixedamt(false)
        }
    }


    const SpinRed = () => {
        dispatch(Setspinstate(true))
        dispatch(SetselectedCard("red"))
        bet()
    }
    const SpinFire = () => {
        dispatch(Setspinstate(true))
        dispatch(SetselectedCard("fire"))
        bet()
    }
    const SpinBlack = () => {
        dispatch(Setspinstate(true))
        dispatch(SetselectedCard("black"))
        bet()
    }

    return (
        <div className={` flex items-center justify-between w-9/10 h-full gap-x-3 ${(autogameSelector == false) ? (spinstate) ? "disable-div" : "" : ""}`}>
            <span onClick={SpinRed} className='flex flex-col items-center justify-center text-sm font-semibold text-white h-full w-1/3 cursor-pointer border-2 border-black inset-shadow-[0.4px_0.6px_0px_#C63033] shadow-[1px_1px_8px_rgb(0,0,0)]  bg-radial-[at_50%_60%] from-[#DF000F] to-[#C1000D] to-60% rounded-2xl active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150'>
                <span>RED</span>
                <span>{RiskModeselector ? 4 : 2}X</span>
            </span>
            <span onClick={SpinFire} className='flex flex-col items-center justify-center text-sm font-semibold text-white h-full w-1/3 cursor-pointer border-2 border-black inset-shadow-[0.4px_0.6px_0px_#D09C4E] shadow-[1px_1px_8px_rgb(0,0,0)]  bg-radial-[at_50%_60%] from-[#D39947] to-[#C4872E] to-60% rounded-2xl active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150'>
                <span> <img className='w-5' src="/images/fire.svg" alt="" /></span>
                <span>{RiskModeselector ? 32 : 16}X</span>
            </span>
            <span onClick={SpinBlack} className='flex flex-col items-center justify-center text-sm font-semibold text-white h-full w-1/3 cursor-pointer border-2 border-black inset-shadow-[0.4px_0.6px_0px_#333029] shadow-[1px_1px_8px_rgb(0,0,0)]  bg-radial-[at_50%_60%] from-[#100F0F] to-[#0C0B09] to-60% rounded-2xl active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150'>
                <span>BLACK</span>
                <span>{RiskModeselector ? 4 : 2}X</span>
            </span>
        </div>
    )
}

export default Betcomponent