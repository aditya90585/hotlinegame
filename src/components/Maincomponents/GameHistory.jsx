import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { togglehowtoplay, toggleMenu, changeMines, SetselectAutoBoxes, SetgameHistoryarray } from '../../features/GameSlices'
import { FaChevronDown } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";




const GameHistory = () => {
    const mainselector = useSelector(state => state.disablemain)
    const autogameSelector = useSelector(state => state.autoGame)
    const footerselector = useSelector(state => state.disablefooter)
    const spinselector = useSelector(state => state.spinstate)
    const spinselectorref = useRef(spinselector)
    const result1state = useSelector(state => state.result1state)
    const result2state = useSelector(state => state.result2state)
    const result1stateref = useRef(result1state)
    const result2stateref = useRef(result2state)
    // const gameHistoryarray = useSelector(state=> state.gameHistoryarray)
    const [gameHistoryarrayref, setGameHistoryarrayref] = useState([])
    const RiskModeselector = useSelector(state => state.Riskmode)

    const [hidehistory, setHidehistory] = useState(true)


    useEffect(() => {

        result1stateref.current = result1state
        if (RiskModeselector == false) {
            if (result1stateref.current != null) {
                setGameHistoryarrayref((prev) => [result1stateref.current, ...prev])
            }
        }

    }, [result1state])

    useEffect(() => {
        result2stateref.current = result2state
        // result1stateref.current = result1state
        setTimeout(() => {
            if (RiskModeselector == true) {
                if (result1stateref.current != null && result2stateref.current != null) {
                    setGameHistoryarrayref((prev) => [[result1stateref.current, result2stateref.current], ...prev])
                }
            }
        }, 500);
    }, [result2state])






    return (
        <div className={`flex h-6 md:w-[70%] bg-[#213F83] rounded-2xl w-9/10 mt-2 ${((autogameSelector && footerselector) || !mainselector || autogameSelector) ? "disable-main" : ""}`}>

            <div className={`  ${hidehistory ? "bg-[#213F83] h-6 relative rounded-l-2xl w-[95%] flex items-center  overflow-hidden" : "bg-[#194EAE] flex h-fit min-h-12 gap-y-1 fixed z-10 rounded-2xl md:w-[70%] w-[89%] flex-wrap items-center"} `}>
                <div className={`text-white ml-4 w-full ${hidehistory ? "hidden" : ""}`}>Last Results</div>
                {gameHistoryarrayref.map((result) => {

                    if (typeof result == "string") {
                        const bg =
                            result === "fire"
                                ? "bg-[#F87A06]"
                                : result === "red"
                                    ? "bg-[#F22143]"
                                    : "bg-[#0A1F34]";
                        return <span className={`flex justify-center items-center bg-[#112C60] mx-1  gap-x-0.5 rounded-full`}>
                            <span className={`${bg} h-5 w-5 rounded-full`}></span>
                        </span>


                    }
                    else if (typeof result != "string" && result != null) {
                        const bg1 =
                            result[0] === "fire"
                                ? "bg-[#F87A06]"
                                : result[0] === "red"
                                    ? "bg-[#F22143]"
                                    : "bg-[#0A1F34]";
                        const bg2 =
                            result[1] === "fire"
                                ? "bg-[#F87A06]"
                                : result[1] === "red"
                                    ? "bg-[#F22143]"
                                    : "bg-[#0A1F34]";


                        return <span className={`flex justify-center items-center bg-[#112C60] mx-1 h-6 w-11 gap-x-0.5 rounded-full`}>
                            <span className={`${bg1} h-5 w-5 rounded-full`}></span>
                            <span className={`${bg2} h-5 w-5 rounded-full`}></span>
                        </span>
                    }
                })}
            </div>
            <div className={` bg-[#1F3F83] h-6  rounded-r-2xl flex items-center ${hidehistory ? "md:w-[5%] w-[20%] bg-[#1F3F83]" : "absolute left-[81%] md:w-[4%] w-[15%] z-20 bg-[#194EAE]"} `}>
                <div onClick={() => setHidehistory(!hidehistory)} className='bg-[#194EAE] w-[92%] rounded-2xl p-2 cursor-pointer h-5 text-white flex justify-between items-center active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150 inset-shadow-[0.8px_0.6px_0px_#4566A3] shadow-[1px_1px_1px_rgb(0,0,0)]' >
                    <FaClockRotateLeft className='text-xs ' />  <FaChevronDown className='text-xs' />
                </div>
            </div>
        </div>
    )
}

export default GameHistory