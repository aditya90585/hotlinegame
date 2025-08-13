import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Setresult1state, Setspinstate, togglehowtoplay, toggleMenu, setCashoutNotification, clearCashoutNotification, betAmt, togglemain, togglefooter, setcashOutamount, cashOutbetamount } from "../../features/GameSlices";


export default function HotlineDOMTailwind() {
  const SPACING = 10;
  const COPIES = 8;

  const dispatch = useDispatch()
  const spinselector = useSelector(state => state.spinstate)
  const spinselectorref = useRef(spinselector)
  const RiskModeselector = useSelector(state => state.Riskmode)
  const soundSelector = useSelector(state => state.soundSelector)
  const selectedCard = useSelector(state => state.selectedCard)
  const betamount = useSelector(state => state.betamount)
  const StartAutoGameSelector = useSelector(state => state.startAutoGameSelector)

  useEffect(() => {
    spinselectorref.current = spinselector
  }, [spinselector])


  const cashOut = (finalResult) => {
    if (RiskModeselector === false) {
      if (finalResult == selectedCard) {

        dispatch(togglehowtoplay(false))
        dispatch(toggleMenu(false))
        let currentmultiplier
        if (finalResult == "fire") {
          currentmultiplier = 16
        } else {
          currentmultiplier = 2
        }
        const payout = parseFloat(betamount) * currentmultiplier;
        if (payout > 0) {


          dispatch(cashOutbetamount(payout))
          dispatch(togglefooter(false));
          dispatch(togglemain(true));
          dispatch(setCashoutNotification(payout))
          dispatch(Setspinstate(false))


          let minestapsound = "/sounds/success-alert.mp3"
          let audio = new Audio(minestapsound)
          if (soundSelector) {
            audio.play()
          }
          setTimeout(() => {
            dispatch(clearCashoutNotification())
          }, 2000);

        }
      }
      else {
        dispatch(Setspinstate(false))
        let minestapsound = "/sounds/lose.mp3"
        let audio = new Audio(minestapsound)
        if (soundSelector) {
          audio.play()
        }
      }
    }
  }




  const cards = [
    "red", "black", "red", "black", "red", "black",
    "red", "black", "fire", "red", "black",
    "red", "black", "red", "black", "red", "black",
  ];

  const containerRef = useRef(null);

  const [containerWidth, setContainerWidth] = useState(930);
  const [cardWidth, setCardWidth] = useState(100);
  const [position, setPosition] = useState(0); // px scrolled
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const positionRef = useRef(0);
  const speedRef = useRef(0);
  const rafRef = useRef(null);

  // Measure container and compute responsive cardWidth
  useEffect(() => {
    function measure() {
      const el = containerRef.current;
      const width = el ? el.clientWidth : Math.min(window.innerWidth * 0.9, 930);
      setContainerWidth(width);
      // keep ~5 cards visible, cap at 100px
      setCardWidth(Math.min(Math.max((width / 5) - SPACING, 48), 100));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Derived values
  const TOTAL_WIDTH = cardWidth + SPACING;
  const repeatedCount = cards.length * COPIES;
  const stripWidth = TOTAL_WIDTH * repeatedCount; // total pixel width of the repeated strip




  // Helpers
  const normalizePosition = (p) => {
    // keep p in [0, stripWidth)
    if (!isFinite(stripWidth) || stripWidth === 0) return 0;
    let x = p % stripWidth;
    if (x < 0) x += stripWidth;
    return x;
  };

  // Animation loop
  const animate = () => {
    // advance
    let p = positionRef.current + speedRef.current;
    p = normalizePosition(p);
    positionRef.current = p;
    setPosition(p);

    // decay speed
    speedRef.current *= 0.97; // adjust decay for feel (0.97 = slower decel)
    // stop condition
    if (speedRef.current > 0.6) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      // Snap to nearest card center
      cancelAnimationFrame(rafRef.current);
      setIsSpinning(false);

      const center = containerWidth / 2;
      // compute which card index (in repeated strip) is closest to center:
      // k = round((position + center - cardCenterOffset) / TOTAL_WIDTH)
      // cardCenterOffset = cardWidth/2
      const raw = (positionRef.current + center - cardWidth / 2) / TOTAL_WIDTH;
      const k = Math.round(raw); // index in repeated strip
      // align position so that that card's center == container center:
      const alignedPos = k * TOTAL_WIDTH + cardWidth / 2 - center;
      positionRef.current = normalizePosition(alignedPos);
      setPosition(positionRef.current);

      // Map k to original card index:
      // k % cards.length gives which original card type it is
      const idxOriginal = ((k % cards.length) + cards.length) % cards.length;
      const finalResult = cards[idxOriginal];
      setResult(finalResult);
      dispatch(Setresult1state(finalResult))
      cashOut(finalResult)
      // you can call your payout logic here
      // e.g. handlePayout(finalResult)
    }
  };

  // Start spin
  const startSpin = () => {

    if (spinselectorref.current==false) return;
    // choose random start in strip
    // positionRef.current = Math.random() * stripWidth;
    positionRef.current = 0
    setPosition(positionRef.current);
    // choose random initial speed (for variety)
    speedRef.current = 55 + Math.random() * 40; // px per frame approx
    setResult(null);
    setIsSpinning(true);
    rafRef.current = requestAnimationFrame(animate);

  };

  useEffect(() => {
    console.log("running1")
    if (spinselectorref.current === true) {
      console.log("running2")
      if (RiskModeselector === false) {
        setTimeout(() => {
          startSpin()
        }, 500);
      } else {
        if (StartAutoGameSelector) {
              startSpin()
        } else {
          startSpin()
        }

      }

    }
  }, [spinselector])


  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Build repeated strip array
  const repeated = [];
  for (let i = 0; i < COPIES; i++) {
    for (let j = 0; j < cards.length; j++) {
      repeated.push({ type: cards[j], key: `${i}-${j}` });
    }
  }

  // transform value: we show the strip shifted left by `position` px
  // note: using the normalized position ensures it never drifts to huge numbers
  const transformX = -position;

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg"
        style={{ width: "90vw", maxWidth: 930, height: 120 }}
      >
        {/* strip */}
        <div
          className="flex items-center"
          style={{
            transform: `translateX(${transformX}px)`,
            transition: isSpinning ? "none" : "transform 160ms ease-out",
            willChange: "transform",
          }}
        >
          {repeated.map((c, i) => {
            const bg =
              c.type === "fire"
                ? "radial-gradient(circle, #F79511, #F7C20E)"
                : c.type === "red"
                  ? "linear-gradient(#E30835,#E81152)"
                  : "linear-gradient(#0A2036,#0C263B)";
            const border = c.type === "fire"
              ? "#F79511"
              : c.type === "red"
                ? "#FE415F"
                : "#133A58";
            const circleCOlor = c.type === "fire"
              ? "red"
              : c.type === "red"
                ? "linear-gradient(#FC3758,#FD3E5D)"
                : "linear-gradient(#173B5E,#243E72)";
            return (
              <div
                key={c.key + "-" + i}
                className="flex-shrink-0 rounded-md border-5 flex items-center justify-center text-white font-semibold select-none"
                style={{
                  width: cardWidth,
                  height: 120,
                  marginRight: SPACING,
                  background: bg,
                  borderColor: border,
                }}
              >
                {(c.type !== "fire") ? <div style={{
                  background: circleCOlor,
                }} className={`h-7 w-7 rounded-full`}></div>
                  : <div><img className='w-10' src="/images/fire.svg" alt="" /></div>
                }
              </div>
            );
          })}
        </div>

        {/* center line  */}
        {/* <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex items-center pointer-events-none">
          <div className="w-1 h-full bg-yellow-300" />
        </div> */}
      </div>

      {/* controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={startSpin}
          className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md shadow"
        >
          Spin
        </button>
        <button
          
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
        >
          Stop (test)
        </button>
        <div className="text-sm text-slate-400">
          {isSpinning ? "Spinning..." : result ? `Result: ${result.toUpperCase()}` : "Ready"}
        </div>
      </div>
    </div>
  );
}

