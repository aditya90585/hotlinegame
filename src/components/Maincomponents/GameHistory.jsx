import React, { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { togglehowtoplay, toggleMenu, changeMines, SetselectAutoBoxes } from '../../features/GameSlices'
import { FaChevronDown } from "react-icons/fa";

const GameHistory = () => {
    const dispatch = useDispatch()
    const multiplier = useSelector(state => state.multiplier);
    const mainselector = useSelector(state => state.disablemain)
    const autogameSelector = useSelector(state => state.autoGame)
    const footerselector = useSelector(state => state.disablefooter)
    const soundSelector = useSelector(state => state.soundSelector)
    const minesCount = useSelector(state => state.minesCount)
    const revealed = useSelector(state => state.revealed)
    const [togglemine, setTogglemine] = useState(true)
    const [totalmines, setTotalmines] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])


    const safeClickCount = useMemo(() => {
        return revealed.filter(v => v === true).length;
    }, [revealed]);

    const togglemineselector = () => {

        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))
        let minestapsound = "/sounds/minestap.mp3"
        let audio = new Audio(minestapsound)
        if (soundSelector) {
            audio.play()
        }
        setTogglemine(!togglemine)

    }


    const changemines = (mines) => {

        dispatch(changeMines(mines))
        let minestapsound = "/sounds/minestap.mp3"
        let audio = new Audio(minestapsound)
        if (soundSelector) {
            audio.play()
        }
        setTogglemine(true)
        if (autogameSelector) {
            dispatch(SetselectAutoBoxes())
        }

    }


    return (
        <div className={`flex flex-col md:w-[70%] w-9/10 mt-2 ${((autogameSelector && footerselector) || !mainselector || autogameSelector) ? "disable-main" : ""}`}>

            <div className=' bg-[#213F83] h-6 rounded-2xl flex justify-between items-center'>
                 </div>
        </div>
    )
}

export default GameHistory