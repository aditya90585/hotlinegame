import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SetBethistorySelector, SetGameLimitsSelector, SetGamerulesSelector, SetGamesSelector, SetfeeeBetsSelector, toggleMenu, toggleSound, togglehowtoplay } from '../features/GameSlices';
import { setNavcashout } from '../features/GameSlices'
import { RiMenu3Fill } from "react-icons/ri";
import { BsQuestionCircle } from "react-icons/bs";
import { FaVolumeHigh } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { CiStar } from "react-icons/ci";
import { MdOutlineHistory } from "react-icons/md";
import { LuGamepad } from "react-icons/lu";
import { LuClipboardList } from "react-icons/lu";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import FreeBets from './FreeBets';
import Gamelimits from './Gamelimits';
import Gamerules from './Gamerules';
import Gamesselector from './Gamesselector';
import Bethistory from './Bethistory';
import Howtoplay from './Howtoplay';


const Navbar = () => {
  const cashoutAmount = useSelector(state => state.cashOutamount)
  const menuSelector = useSelector(state => state.menuSelector)
  const soundSelector = useSelector(state => state.soundSelector)
  const howtoplaySelector = useSelector(state => state.howtoplay)
  const FreebetsSelector = useSelector(state => state.freeBetsSelector)
  const GamelimitsSelector = useSelector(state => state.gameLimitsSelector)
  const GamerulesSelector = useSelector(state => state.gameRulesSelector)
  const GamesSelector = useSelector(state => state.GamesSelector)
  const betHistorySelector = useSelector(state => state.betHistorySelector)
  const dispatch = useDispatch()
  const cashoutNotification = useSelector(state => state.cashoutNotification);


  const totalAmt = useSelector(state =>
    state.totalAmt
  )
  const togglehowplay = () => {
    dispatch(togglehowtoplay(!howtoplaySelector))
    dispatch(toggleMenu(false))
    dispatch(SetfeeeBetsSelector(false))
    dispatch(SetGameLimitsSelector(false))
    dispatch(SetGamerulesSelector(false))
    dispatch(SetGamesSelector(false))
    dispatch(SetBethistorySelector(false))
  }
  const togglenavmenu = () => {
    dispatch(toggleMenu(!menuSelector))
    dispatch(togglehowtoplay(false))
    dispatch(SetfeeeBetsSelector(false))
    dispatch(SetGameLimitsSelector(false))
    dispatch(SetGamerulesSelector(false))
    dispatch(SetGamesSelector(false))
    dispatch(SetBethistorySelector(false))
  }
  const toggleFreebets = () => {
    dispatch(SetfeeeBetsSelector(!FreebetsSelector))
    dispatch(toggleMenu(false))
  }
  const toggleBethistory = () => {
    dispatch(SetBethistorySelector(!betHistorySelector))
    dispatch(toggleMenu(false))
  }
  const toggleGameLimits = () => {
    dispatch(SetGameLimitsSelector(!GamelimitsSelector))
    dispatch(toggleMenu(false))
  }

  const toggleGamerules = () => {
    dispatch(SetGamerulesSelector(!GamerulesSelector))
    dispatch(toggleMenu(false))
  }
  const toggleGamesselector = () => {
    dispatch(SetGamesSelector(!GamesSelector))
    dispatch(toggleMenu(false))
    dispatch(togglehowtoplay(false))
    dispatch(SetfeeeBetsSelector(false))
    dispatch(SetGameLimitsSelector(false))
    dispatch(SetGamerulesSelector(false))
    dispatch(SetBethistorySelector(false))
  }
  return (

    <nav className='md:bg-[#1B3774] md:w-full w-[99%] h-8 rounded-2xl flex justify-between items-center md:static absolute bottom-0'>
      <div className='flex w-1/3'>

        <div onClick={toggleGamesselector} className='bg-[#174EB0] cursor-pointer rounded-xl md:w-35 w-60 h-6 ml-1 text-white flex justify-center items-center active:translate-x-0.2 active:translate-y-0.5  transition-transform duration-150 inset-shadow-[0.8px_0.6px_0px_#4566A3] shadow-[1px_1px_1px_rgb(0,0,0)]' >
          <span className='w-8/10 flex justify-center items-center ml-3'> HOTLINE</span>  <FaChevronDown className='w-2/10 text-xs mr-2' />
        </div>
        <div onClick={togglehowplay} className={`h-6 md:ml-4 ml-1 cursor-pointer md:w-35 w-8 p-1 bg-orange-400 rounded-xl flex items-center justify-between aspect-square `}><BsQuestionCircle className='size-5' /><span className='md:flex hidden mr-5 text-sm'>How To Play</span></div>
      </div>
      <Howtoplay />
      <FreeBets />
      <Bethistory />
      <Gamelimits />
      <Gamerules />
      <Gamesselector />
      <div className='font-bold  md:w-1/3 hidden mb-2 md:flex justify-center items-center '>
        <span className='bg-orange-400 px-3 text-white  rounded-b-xl md:flex hidden'>Fun Mode</span>
      </div>
      <div className='flex md:w-1/3 w-2/3 justify-between  items-center '>
        <div className='bg-green-500 text-white rounded-xl md:px-5 px-1 ml-8'>{(cashoutNotification != null) ? <span className={`${cashoutNotification ? "" : "hidden"}`}>+ {cashoutNotification.toFixed(2)}</span> : ""}</div>
        <div className='text-white mr-1 md:mr-3 flex items-center justify-between'>{totalAmt.toFixed(2)} USD   
          <span onClick={togglenavmenu} className='bg-[#174EB0] cursor-pointer rounded-full p-1 shadow-[0px_0px_5px_black] ml-2'><RiMenu3Fill className='size-4' /></span></div>
        <div className={`fixed bg-[#212226] h-96 w-80 md:top-9 md:right-2 bottom-9 flex items-center flex-col  right-2 rounded-2xl z-20  ${menuSelector ? "" : "hidden"}`}>
          <h1 className='text-white ml-4 mt-2'>demo_user1</h1>
          <div className='flex w-[96%] bg-[#1A1B1E] rounded-xl justify-between items-center p-2'><span className='flex items-center text-white'><FaVolumeHigh className='ml-2 mr-4' /> Sound</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={(() => dispatch(toggleSound(!soundSelector)))}
                checked={soundSelector}
              />
              <div className="w-11 h-6 bg-gray-200  rounded-full  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#5BA100]"></div>

            </label>
          </div>

          <div className='flex w-[96%] bg-[#323235] rounded-xl mt-2 flex-col gap-y-[1px]'>
            <div onClick={toggleFreebets} className='bg-[#1A1B1E] w-full cursor-pointer text-white rounded-t-xl py-2 px-4 flex items-center'><span className='mr-1'><CiStar className='size-5' /></span>Free Bets</div>
            <div onClick={toggleBethistory} className='bg-[#1A1B1E] w-full cursor-pointer text-white py-2 px-4 flex items-center'><span className='mr-1'><MdOutlineHistory className='size-5' /></span>Bet History</div>
            <div onClick={toggleGameLimits} className='bg-[#1A1B1E] w-full cursor-pointer text-white  py-2 px-4 flex items-center'><span className='mr-1'><LuGamepad className='size-5' /></span>Game Limits</div>
            <div onClick={togglehowplay} className='bg-[#1A1B1E] w-full cursor-pointer text-white py-2 px-4 flex items-center'><span className='mr-1'><BsQuestionCircle className='size-5' /></span>How To Play</div>
            <div onClick={toggleGamerules} className='bg-[#1A1B1E] w-full cursor-pointer text-white rounded-b-xl py-2 px-4 flex items-center'><span className='mr-1'><LuClipboardList className='size-5' /></span>Game Rules</div>
            {/* <div className='bg-[#1A1B1E] w-full cursor-pointer text-white rounded-b-xl py-2 px-4 flex items-center'><span className='mr-1'><FaBalanceScaleLeft className='size-5' /></span>Probably Fair Setting</div> */}

          </div>
        </div>
      </div>
    </nav>

  )
}

export default Navbar