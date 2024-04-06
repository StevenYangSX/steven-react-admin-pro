import { SysterUserInfo } from '@/types/systemDataTypes'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils'

export interface CounterState {
  token:string | null
  value: number,
  userInfo: SysterUserInfo | null,
  expiredTime:number | null,
  menuList: Array<any> | null
}
const getUserInfoFromLocalStorage = () =>{
  let temp = localStorage.getItem('userInfo');
  if(temp) {
    return JSON.parse(temp);
  } else {
    return null
  }
}

const getMenuListFromLocalStorage = () =>{
  let temp = localStorage.getItem('menuList');
  if(temp) {
    return JSON.parse(temp);
  } else {
    return null
  }
}

const initialState: CounterState = {
  value: 0,
  token:localStorage.getItem('userToken') ??  null,
  userInfo:  getUserInfoFromLocalStorage(),
  expiredTime:null,
  menuList: getMenuListFromLocalStorage(),
}


export const userInfoSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    userLogin: (state ,action:PayloadAction<any>) =>{
      let userInfoWithAccess = action.payload.user;
      userInfoWithAccess.access = action.payload.uniqueAuth;
      state.token = action.payload.token
      state.userInfo =  userInfoWithAccess
    },
    userLogout:(state,action)=>{
      state = initialState;
      state.token = null;
      state.userInfo = null
    },
    
    systemMenuUpdate: (state, action: PayloadAction<any>) => {
      state.menuList= action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const {  userLogin ,systemMenuUpdate } = userInfoSlice.actions

export default userInfoSlice.reducer