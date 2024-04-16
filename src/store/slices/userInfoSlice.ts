
import { HttpStatus, UserInfoState } from '@/types/systemStateTypes';
import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import { deleteLocalStorageData, getDataFromLocalStorageByName  ,deleteLocalStorageByName} from '@/utils/localStorageManager';
import type { PayloadAction } from '@reduxjs/toolkit'
import { getSystemMenusApi } from '@/api/systemMenu';
import { getUserAuthorizationApi } from '@/api/systemUser';
import { getUserAccessListRequestType } from '@/types/requestDataTypes';
import { RootState } from '..';

const initialState: UserInfoState = {
  token:localStorage.getItem('userToken') ??  null,
  userInfo:  getDataFromLocalStorageByName('userInfo'),
  expiredTime:null,
  menuList:  getDataFromLocalStorageByName('menuList'),
  httpStatus:HttpStatus.Idle,
  error:null
}

const allEmptyState: UserInfoState = {
  token:null,
  userInfo: null,
  expiredTime:null,
  menuList:null,
  httpStatus:HttpStatus.Idle,
  error:null
}


export const fetchSystemMenuList = createAsyncThunk('user/getSystemMenu', async () => {
  const response = await getSystemMenusApi();
  return response.data
})


export const fetchUserAccessList = createAsyncThunk<string[],any,{state:RootState}>('user/getUserAccessList',async (payload:any, thunkAPI) =>{
  console.log("check payload in ",payload)
  const state:RootState = thunkAPI.getState();
  const requestBody:getUserAccessListRequestType = {userId:state.userInfoReducer.userInfo?.userId}
  const response = await getUserAuthorizationApi(requestBody) 
  return response.data;
})

 
export const userInfoSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state ,action:PayloadAction<any>) =>{
      let userInfoWithAccess = action.payload.user;
      userInfoWithAccess.access = action.payload.uniqueAuth;
      state.token = action.payload.token
      state.userInfo =  userInfoWithAccess
      state.error = null
      state.httpStatus = HttpStatus.Idle

    },
    userLogout:(state)=>{
      state.token = null;
      state.userInfo = null
      state.expiredTime = null
      state.menuList = null
      state.error = null
      state.httpStatus = HttpStatus.Idle
      deleteLocalStorageData();
    },
    
    systemMenuUpdate: (state, action: PayloadAction<any>) => {
      state.menuList= action.payload
    },
    catchAuthorizationError:(state) =>{
      state.token = null;
      state.userInfo = null
      state.expiredTime = null
      state.menuList = null
      state.error = null
      state.httpStatus = HttpStatus.Idle
      deleteLocalStorageData();
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchSystemMenuList.pending, (state) =>{
        state.httpStatus = HttpStatus.Loading 
    })
    .addCase(fetchSystemMenuList.fulfilled, (state,action) =>{
       state.menuList = action.payload;
       state.httpStatus = HttpStatus.Idle
    })
    .addCase(fetchSystemMenuList.rejected, (state, action) =>{
        state.httpStatus = HttpStatus.Idle
        state.error = action.error;
        // console.log("check action...",action);
    })
    .addCase(fetchUserAccessList.fulfilled, (state,action) =>{
      console.log("get respoinse...",action);
      if(state.userInfo) {
        state.userInfo.access = action.payload;
      } 
    })
}

})

// Action creators are generated for each case reducer function
export const {  userLogin ,systemMenuUpdate,userLogout,catchAuthorizationError } = userInfoSlice.actions

/*
 Selectors
*/
// Define a selector to access the menuList state property
export const selectUserName = (state: RootState): string | undefined => state.userInfoReducer.userInfo?.username;


export default userInfoSlice.reducer