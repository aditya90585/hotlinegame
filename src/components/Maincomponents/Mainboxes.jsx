import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import HotlineCanvas from "./HotlineCanvas"
import HotlineCanvas2 from "./HotlineCanvas2"

const Mainboxes = () => {
    const RiskModeselector = useSelector(state => state.Riskmode)
    return (
        <div className={`md:h-100 h-96 relative bg-[#2B3F79] rounded-2xl flex flex-col justify-center md:gap-x-1 gap-x-1 items-center`}>
            <div className="absolute top-0  w-0 h-0 border-l-16 border-l-transparent border-r-16 border-r-transparent border-t-16 border-t-[#B8C5DD]"></div>
            <HotlineCanvas />
            {RiskModeselector ? <HotlineCanvas2 /> : ""}
            <div className="absolute bottom-0 rotate-180 w-0 h-0 border-l-16 border-l-transparent border-r-16 border-r-transparent border-t-16 border-t-[#B8C5DD]"></div>
        </div>
    )
}

export default Mainboxes