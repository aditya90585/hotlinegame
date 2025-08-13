import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RxCross1 } from "react-icons/rx";
import { SetGamerulesSelector } from '../features/GameSlices';

const Gamerules = () => {
    const dispatch = useDispatch()
    const GamerulesSelector = useSelector(state => state.gameRulesSelector)
    return (
        <div className={`fixed bg-[#212226] z-20 md:h-full h-[98%] md:w-[96%] w-[96%] top-1 md:left-[2%] left-[2%] rounded-xl overflow-y-scroll  ${GamerulesSelector ? "" : "hidden"}`}>
            <div className=' flex justify-between items-center text-white m-4'><span className='font-semibold font-sans'>GAME RULES</span>
                <span onClick={() => dispatch(SetGamerulesSelector(false))} className='rounded-full cursor-pointer flex bg-[#373E48] p-0.5 inset-shadow-[0.4px_0.4px_0.8px_white]'><RxCross1 className='p-0.5' /></span></div>
            <div className='w-full h-px bg-[#38393C]'></div>
            <h1 className='font-semibold mt-4 text-2xl text-center text-white'>HOTLINE</h1>

            <ul className='text-[#9B9B9B] w-[88%] mx-auto mt-3 flex flex-col gap-y-2'>
                <li>- In Hotline, player can bet on Red, Black or Hot segment of the line. He wins if he guesses outcome; </li>
                <li>- Player can increase overall multipliers and game risk by activating “High risk mode”; </li>
                <li>- Outcomes of previous rounds are appearing in the “Last results” section. </li>
            </ul>
            <div className='w-[96%] mx-auto my-4 h-px bg-[#38393C]'></div>

            <h1 className='ml-6 text-white'>GAME INTERFACE</h1>

            <ul className='text-[#9B9B9B] w-[88%] mx-auto mt-3 flex flex-col gap-y-2'>
                <li>- Bets can be made from the bet panel, by selecting predefined bet amounts, or entering your own. Click (-) and (+) buttons to move between bet options; </li>
                <li>- Player balance shows available funds to play; </li>
                <li>- Sound can be turned off and back on from game menu; </li>
                <li>- Bet history can be accessed from game menu; </li>
                <li>- Game information and rules can be accessed from game menu; </li>
                <li>- Provably Fair settings can be accessed from game menu; </li>
            </ul>

            <div className='w-[96%] mx-auto my-4 h-px bg-[#38393C]'></div>
            <h1 className='ml-6 text-white'>AUTO GAME</h1>
            <ul className='text-[#9B9B9B] w-[88%] mx-auto mt-3 flex flex-col gap-y-2'>
                <h6 className='mb-2'> Note: this feature might be unavailable in some casinos. </h6>
                <li>- Auto Play is activated by pressing the “Auto Game” button.</li>
                <li>- In the Auto Play panel, the “Stop if cash decreases by” option stops Auto Play, if the balance is decreased by the selected amount. </li>
                <li>- In the Auto Play panel, the “Stop if single win exceeds” option stops Auto Play, if a single win exceeds the selected amount. </li>
                <li>- In the Auto Play panel, the “Stop if cash increases by” option stops Auto Play, if the balance is increased by the selected amount. </li>
                <li>- After start, remaining number of rounds is displayed on the counter. The player can stop Auto Play at any time, by clicking the counter. </li>
            </ul>

            <div className='w-[96%] mx-auto my-4 h-px bg-[#38393C]'></div>
            <h1 className='ml-6 text-white'>ADDITIONAL INFORMATION</h1>
            <ul className='text-[#9B9B9B] w-[88%] mx-auto mt-3 mb-5 flex flex-col gap-y-2'>
                <li>- In the event of a malfunction of the gaming hardware/software, all affected game bets and payouts are rendered void and all affected bets are refunded. </li>
                <li>- If the internet connection is interrupted when the bet is active, the game will auto cash out with the current multiplier, and the winning amount will be added to your balance. </li>
            </ul>

        </div>
    )
}

export default Gamerules