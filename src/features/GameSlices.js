import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalAmt: 3000,
  disablefooter: false,
  disablemain: true,
  revealed: [],
  betamount: "10.00",
  minesCount: 3,
  cashOutamount: 0,
  multiplier: 1.00,
  boxes: [],
  navcashout: true,
  cashoutNotification: null,
  flipTrigger: false,
  menuSelector: false,
  soundSelector: true,
  howtoplay: false,
  autoGame: false,
  selectAutoBoxes: [],
  startAutoGameSelector: false,
  autoGameRoundsArray: [3, 10, 25, 100, 200, 500],
  autoGameRound: 3,
  betState: false,
  autorevealState: false,
  autogamingstate: false,
  roundLeft: 3,
  stopGamestate: false,
  freeBetsSelector: false,
  betHistorySelector: false,
  gameLimitsSelector: false,
  gameRulesSelector: false,
  GamesSelector:false, 


  Riskmode:false,
  spinstate:false,
  result1state:"",
  result2state:"",
  selectedCard:"red",
}

export const GameSlices = createSlice({
  name: "hotline",
  initialState,
  reducers: {
    betAmt: (state, action) => {
      state.totalAmt = state.totalAmt - action.payload
    },
    cashOutAmt: (state, action) => {

    },
    togglemain: (state, action) => {
      state.disablemain = action.payload
    },
    togglefooter: (state, action) => {
      state.disablefooter = action.payload
    },
    revealedFalse: (state, action) => {
      const falsearray = Array(5 * 5).fill(false)
      state.revealed = falsearray
    },
    revealedOne: (state, action) => {
      const newRevealed = state.revealed
      newRevealed[action.payload] = true
      state.revealed = newRevealed

    },
    revealAll: (state, action) => {
      const revealall = Array(5 * 5).fill(true)
      state.revealed = revealall

    },
    changebetValue: (state, action) => {
      if (action.payload == ".") {
        if (!state.betamount.includes(".")) {
          state.betamount = state.betamount + action.payload
        }
      }
      else if (action.payload == "delete") {
        state.betamount = state.betamount.slice(0, -1)
      } else {
        state.betamount = state.betamount + action.payload.toString()
      }
    },
    changebetFix: (state, action) => {
      if (state.betamount >= 100 && action.payload == true) {
        state.betamount = "100"
      } else if (state.betamount <= 0 && action.payload == true) {
        state.betamount = "0.10"
      } else if (state.betamount == "." && action.payload == true) {
        state.betamount = "0.10"
      } else if (state.betamount == NaN && action.payload == true) {
        state.betamount = "0.10"
      }

      if (state.betamount.includes(".")) {
        const [intPart, decimalPart] = state.betamount.split(".");
        if (decimalPart && decimalPart.length > 2) {
          state.betamount = `${intPart}.${decimalPart.slice(0, 2)}`;
        }
      }


    },
    changefixbettomin: (state, action) => {
      if (action.payload == false) {
        state.betamount = ""
      }
    },
    fixBets: (state, action) => {
      state.betamount = action.payload.toFixed(2).toString()
    },
    changeMines: (state, action) => {
      state.minesCount = action.payload
    },
    cashOutbetamount: (state, action) => {
      state.totalAmt = state.totalAmt + action.payload

    },
    setMultiplier: (state, action) => {
      state.multiplier = action.payload;
    },
    setcashOutamount: (state, action) => {
      state.cashOutamount = Number(state.betamount) * action.payload
    },
    boxesSet: (state, action) => {
      state.boxes = action.payload
    },
    addfixBet: (state, action) => {
      state.betamount = action.payload
    },
    setNavcashout: (state, action) => {
      state.navcashout = !state.navcashout
    },
    setCashoutNotification: (state, action) => {
      state.cashoutNotification = action.payload;
    },
    clearCashoutNotification: (state) => {
      state.cashoutNotification = null;
    },
    triggerFlip(state) {
      state.flipTrigger = true;
    },
    resetFlip(state) {
      state.flipTrigger = false;
    },
    toggleMenu: (state, action) => {
      state.menuSelector = action.payload
    },
    toggleSound: (state, action) => {
      state.soundSelector = action.payload
    },
    togglehowtoplay: (state, action) => {
      state.howtoplay = action.payload
    },
    toggleAutoGame: (state, action) => {
      state.autoGame = action.payload
    },
    SetselectAutoBoxes: (state, action) => {
      const falsearray = Array(5 * 5).fill(false)
      state.selectAutoBoxes = falsearray
    },
    selectAutoOne: (state, action) => {
      const newSelect = state.selectAutoBoxes
      let safeClickCountauto = state.selectAutoBoxes.filter(v => v === true).length;
      if (25 - state.minesCount > safeClickCountauto) {
        newSelect[action.payload] = !newSelect[action.payload]
        state.selectAutoBoxes = newSelect
      } else {
        newSelect[action.payload] = false
        state.selectAutoBoxes = newSelect
      }


    },
    toggleStartAutoGameSelector: (state, action) => {
      state.startAutoGameSelector = action.payload
    },
    SetautoGameRound: (state, action) => {
      state.autoGameRound = action.payload
    },
    SetbetState: (state, action) => {
      state.betState = action.payload
    },
    SetautorevealState: (state, action) => {
      state.autorevealState = action.payload
    },
    Setautogamingstate: (state, action) => {
      state.autogamingstate = action.payload
    },
    SetroundLeft: (state, action) => {
      state.roundLeft = action.payload
    },
    SetstopGamestate: (state, action) => {
      state.stopGamestate = action.payload
    },
    SetfeeeBetsSelector: (state, action) => {
      state.freeBetsSelector = action.payload
    },
    SetBethistorySelector: (state, action) => {
      state.betHistorySelector = action.payload
    },
    SetGameLimitsSelector: (state, action) => {
      state.gameLimitsSelector = action.payload
    },
    SetGamerulesSelector: (state, action) => {
      state.gameRulesSelector = action.payload
    },
    SetGamesSelector : (state,action) =>{
      state.GamesSelector = action.payload
    },
    SetRiskmode:(state,action) =>{
      state.Riskmode = action.payload
    },
    Setspinstate:(state,action)=>{
      state.spinstate = action.payload
    },
    Setresult1state:(state,action)=>{
      state.result1state = action.payload
    },
    Setresult2state:(state,action)=>{
      state.result2state = action.payload
    },
    SetselectedCard:(state,action)=>{
      state.selectedCard = action.payload
    }

  }
})


export const {Setresult1state,SetselectedCard,Setresult2state,SetfeeeBetsSelector,Setspinstate,SetRiskmode,SetGamesSelector,SetGameLimitsSelector, SetGamerulesSelector, SetBethistorySelector, toggleAutoGame, SetstopGamestate, SetroundLeft, Setautogamingstate, SetautorevealState, SetbetState, SetautoGameRound, toggleStartAutoGameSelector, selectAutoOne, SetselectAutoBoxes, togglehowtoplay, toggleSound, boxesSet, triggerFlip, toggleMenu, resetFlip, setNavcashout, changefixbettomin, clearCashoutNotification, setCashoutNotification, addfixBet, setMultiplier, setcashOutamount, cashOutbetamount, changeMines, fixBets, betAmt, cashOutAmt, togglemain, togglefooter, revealedFalse, revealedOne, revealAll, changebetValue, changebetFix } = GameSlices.actions

export const GameReducers = GameSlices.reducer