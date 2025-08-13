import React, { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SetRiskmode } from '../features/GameSlices'
import Mainboxes from './Maincomponents/Mainboxes'
import GameHistory from './Maincomponents/GameHistory'


const Main = () => {
  const autogamingstate = useSelector(state => state.autogamingstate)
  const RiskModeselector = useSelector(state => state.Riskmode)
  const spinstate = useSelector(state => state.spinstate)
  const dispatch = useDispatch()
  const Riskmodefunction = () => {
    dispatch(SetRiskmode(!RiskModeselector))
  }

  return (
    <main className={`flex flex-col justify-between items-center md:h-8/10 h-8/12  `}>
      <GameHistory />
      <Mainboxes />
      <div className='flex md:w-[98%] w-full h-8 justify-center items-center mt-3 mb-2 space-x-1'>
        <div className={`${(spinstate || autogamingstate) ? "disable-div" : ""} w-70 h-8 bg-[#093680] cursor-pointer rounded-2xl flex justify-between items-center text-white font-semibold font-sans `}>
          <span className='w-[2/10] ml-3'><img className='w-6' src="/images/speedometer.png" alt="" /></span>

          <span className='flex items-center w-8/10'>
            <label className="relative inline-flex items-center cursor-pointer mr-1">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={Riskmodefunction}
                checked={RiskModeselector}
              />
              <div className="w-7 h-4 bg-[#4373B0]  rounded-full  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-[#5BA100]"></div>

            </label>
            HIGH RISK MODE
          </span>
        </div>
      </div>
    </main>
  )
}

export default Main