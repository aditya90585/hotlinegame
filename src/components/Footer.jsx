import React, { useMemo, useRef } from 'react'
import { store } from '../app/store.js'
import { useSelector, useDispatch } from 'react-redux'
import { betAmt, toggleStartAutoGameSelector, SetautoGameRound,toggleAutoGame, Setautogamingstate, SetroundLeft, SetstopGamestate, SetselectedCard, Setspinstate } from '../features/GameSlices.js'
import { useState, useEffect } from 'react'
import { CiPlay1 } from "react-icons/ci";
import { MdOutlineAutorenew } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import Firstfoot from './Footercomponents/Firstfoot.jsx'
import Betcomponent from './Footercomponents/Betcomponent.jsx'


const Footer = () => {
    const betamount = useSelector(state => state.betamount)
    const soundSelector = useSelector(state => state.soundSelector)
    const autogameSelector = useSelector(state => state.autoGame)
    const autoGameRoundsArray = useSelector(state => state.autoGameRoundsArray)
    const autoGameRound = useSelector(state => state.autoGameRound)
    const roundLeft = useSelector(state => state.roundLeft)
    const autogamingstate = useSelector(state => state.autogamingstate)
    const [disablefooter, setDisablefooter] = useState(false)
    const dispatch = useDispatch()
    const footerselector = useSelector(state => state.disablefooter)
    const StartAutoGameSelector = useSelector(state => state.startAutoGameSelector)
    const stopGamesstate = useSelector(state => state.stopGamestate)
    const roundLeftRef = useRef(roundLeft);
    const spinselector = useSelector(state => state.spinstate)
    const spinselectorref = useRef(spinselector)
    const selectedCard = useSelector(state => state.selectedCard)

    useEffect(() => {
        spinselectorref.current = spinselector
    }, [spinselector])

    useEffect(() => {
        roundLeftRef.current = roundLeft;
    }, [roundLeft]);

    const stopGamestateRef = useRef(stopGamesstate);

    useEffect(() => {
        stopGamestateRef.current = stopGamesstate;
    }, [stopGamesstate]);

    useEffect(() => {
        setDisablefooter(footerselector)
    }, [footerselector])

    const togglestartautoGame = () => {
        if ((spinselector == false)) {
            dispatch(toggleStartAutoGameSelector(!StartAutoGameSelector))
            dispatch(SetstopGamestate(false))
        }
    }

    const selectRounds = (rounds) => {
        dispatch(SetautoGameRound(rounds))
        dispatch(SetroundLeft(rounds))
    }



    let currentRound = useRef(0)

    const runRound = () => {
        if (stopGamestateRef.current) return;
        if (currentRound.current >= autoGameRound) {
            dispatch(toggleStartAutoGameSelector(false));
            dispatch(toggleAutoGame(false))
            dispatch(Setautogamingstate(false))
            dispatch(Setspinstate(false))
            currentRound.current = 0
            return;
        } else {
            dispatch(betAmt(Number(betamount)))
            dispatch(SetroundLeft(roundLeftRef.current - 1));
            dispatch(Setspinstate(true))
        }
    }
    useEffect(() => {
        if (spinselectorref.current == false && (autogamingstate)) {
            setTimeout(() => {
                currentRound.current = currentRound.current + 1
                runRound()
            }, 800);

        }
    }, [spinselector])

    const startAutoGame = () => {
        dispatch(toggleStartAutoGameSelector(!StartAutoGameSelector))
        dispatch(Setautogamingstate(true))
        dispatch(SetroundLeft(autoGameRound))
        roundLeftRef.current = autoGameRound

        // dispatch(toggleAutoGame(false))

        runRound()
    }

    const stopAutogame = () => {
        dispatch(SetstopGamestate(true))
        dispatch(toggleStartAutoGameSelector(false));
        dispatch(toggleAutoGame(false))
        dispatch(Setautogamingstate(false))
        dispatch(Setspinstate(false))
    }
    return (
        <footer className={`bg-radial-[at_50%_60%] from-[#0E367C] to-[#27386B] to-60%  w-full md:h-20 h-4/16 rounded-2xl flex md:flex-row flex-col-reverse gap-x-2 gap-y-2 justify-center  items-center md:static relative bottom-9 `}>
            <Firstfoot />
            <div className=' md:w-1/3 w-9/10 md:h-7/10 h-1/3 rounded-full flex  items-center' >

                {!autogamingstate ? <div onClick={togglestartautoGame} className={`w-15 cursor-pointer mr-5 h-full bg-[#0257C0] border-2 border-black shadow-md shadow-black rounded-full flex justify-center items-center text-slate-300 text-3xl aspect-square ${(spinselector) ? "disable-div" : ""}`}><MdOutlineAutorenew /></div>
                    : <div onClick={stopAutogame} className={`w-15 cursor-pointer mr-5 h-full bg-[#D2000F] border-2 border-black shadow-md shadow-black rounded-full flex justify-center items-center text-slate-300 text-3xl aspect-square font-sans ${(autogameSelector) ? "" : ""}`}>{roundLeft}</div>
                }
                <div className={`fixed flex  flex-col items-center bg-[#212226] z-20 md:h-[80%] h-[80%] md:w-[40%] w-[90%] md:top-9 bottom-30 md:left-[30%] left-[5%] rounded-xl  ${StartAutoGameSelector ? "" : "hidden"}`}>

                    <div className=' flex justify-between w-[90%] items-center text-white m-4'><span className='font-semibold font-sans'>AUTO PLAY</span>
                        <span onClick={() => dispatch(toggleStartAutoGameSelector(false))} className='rounded-full cursor-pointer flex bg-[#373E48] p-0.5 inset-shadow-[0.4px_0.4px_0.8px_white]'><RxCross1 className='p-0.5' /></span></div>

                    <div className='w-full h-px bg-[#38393C]'></div>
                    <div className='w-[90%]  h-30 flex items-center flex-col mt-6 bg-[#1A1B1E] rounded-xl'>
                        <h1 className='text-white text-xs m-2'>Bet color</h1>
                        <div className='w-[99%] h-[90%]   flex-wrap gap-x-2  flex justify-center'>

                            <div onClick={() => dispatch(SetselectedCard("red"))} className={` ${(selectedCard == "red") ? "bg-[#555961]" : "bg-[#393B3F]"} cursor-pointer w-[48%] h-[40%] rounded-sm flex justify-between items-center`}>
                                <div className='w-1/10 h-full flex justify-center items-center ml-1'>
                                    <span className={`${(selectedCard == "red") ? "bg-[#5BA100]" : "bg-[#6C6E71]"}  size-3 rounded-full flex`}></span>
                                </div>
                                <div className='w-9/10 flex justify-center items-center text-white mr-2'>Red X2</div>
                            </div>
                            <div onClick={() => dispatch(SetselectedCard("black"))} className={` ${(selectedCard == "black") ? "bg-[#555961]" : "bg-[#393B3F]"} cursor-pointer w-[48%] h-[40%] rounded-sm flex justify-between items-center`}>
                                <div className='w-1/10 h-full flex justify-center items-center ml-1'>
                                    <span className={`${(selectedCard == "black") ? "bg-[#5BA100]" : "bg-[#6C6E71]"}  size-3 rounded-full flex`}></span>
                                </div>
                                <div className='w-9/10 flex justify-center items-center text-white mr-2'>Black X2</div>
                            </div>
                            <div onClick={() => dispatch(SetselectedCard("fire"))} className={` ${(selectedCard == "fire") ? "bg-[#555961]" : "bg-[#393B3F]"} cursor-pointer w-[98%] h-[40%] rounded-sm flex justify-between items-center`}>
                                <div className='w-1/10 h-full flex justify-center items-center ml-1'>
                                    <span className={`${(selectedCard == "fire") ? "bg-[#5BA100]" : "bg-[#6C6E71]"}  size-3 rounded-full flex`}></span>
                                </div>
                                <div className='w-9/10 flex justify-center items-center text-white mr-2'>Hot X16</div>
                            </div>

                        </div>
                    </div>

                    <div className='w-[90%]  h-43 flex items-center flex-col my-6 bg-[#1A1B1E] rounded-xl'>
                        <h1 className='text-white text-xs m-2'>Number Of Rounds</h1>
                        <div className='w-[99%] h-[90%] mb-3  flex-wrap gap-x-2 gap-y-2 flex justify-center'>
                            {autoGameRoundsArray.map((rounds, index) => {
                                return <div key={rounds} onClick={() => selectRounds(rounds)} className={` ${(autoGameRound == rounds) ? "bg-[#555961]" : "bg-[#393B3F]"} cursor-pointer w-[48%] h-[30%] rounded-sm flex justify-between items-center`}>
                                    <div className='w-1/10 h-full flex justify-center items-center ml-1'>
                                        <span className={`${(autoGameRound == rounds) ? "bg-[#5BA100]" : "bg-[#6C6E71]"}  size-3 rounded-full flex`}></span>
                                    </div>
                                    <div className='w-9/10 flex justify-center items-center text-white mr-2'>{rounds}</div>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className='text-center text-white'></div>
                    <div className='text-center text-white mx-5 mt-2'></div>
                    <div className='w-full h-px bg-[#38393C] absolute bottom-17'></div>
                    <div onClick={startAutoGame} className={` ${autogameSelector ? "" : ""} flex absolute bottom-3 cursor-pointer border-2 border-black inset-shadow-[0.4px_0.6px_0px_#94dcf7] shadow-[1px_1px_8px_rgb(0,0,0)] items-center justify-between w-9/10 bg-radial-[at_50%_60%] from-[#5CA003] to-[#327A00] to-60% h-12 rounded-2xl active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150`}><span className='text-white font-bold w-full  flex justify-center'>START AUTO</span></div>
                </div>
                {<Betcomponent />}
            </div>

        </footer>
    )
}

export default Footer