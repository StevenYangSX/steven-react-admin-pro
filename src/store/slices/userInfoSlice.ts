
import { UserInfoState } from '@/types/systemStateTypes';
import { createSlice } from '@reduxjs/toolkit'
import { getDataFromLocalStorageByName } from '@/utils/localStorageManager';
import type { PayloadAction } from '@reduxjs/toolkit'



const initialState: UserInfoState = {
  token:localStorage.getItem('userToken') ??  null,
  userInfo:  getDataFromLocalStorageByName('userInfo'),
  expiredTime:null,
  menuList:  getDataFromLocalStorageByName('menuList')
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
export const {  userLogin ,systemMenuUpdate,userLogout } = userInfoSlice.actions

export default userInfoSlice.reducer