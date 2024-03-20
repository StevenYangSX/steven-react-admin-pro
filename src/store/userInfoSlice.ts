import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  token:string | null
  value: number
}

const initialState: CounterState = {
  value: 0,
  token:localStorage.getItem('userToken') ??  null
}


export const userInfoSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    userLogin: (state ,action:PayloadAction<string>) =>{
      console.log("resucdre..",state)
      console.log("resucdre..",action)
      state.token = action.payload
    },
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount,userLogin } = userInfoSlice.actions

export default userInfoSlice.reducer