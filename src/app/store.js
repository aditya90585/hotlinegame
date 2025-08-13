import { configureStore } from "@reduxjs/toolkit";

import { GameReducers } from "../features/GameSlices";
export const store = configureStore({
       reducer:GameReducers
})