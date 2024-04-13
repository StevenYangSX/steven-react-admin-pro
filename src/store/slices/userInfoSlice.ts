
import { UserInfoState } from '@/types/systemStateTypes';
import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit'
import { deleteLocalStorageData, getDataFromLocalStorageByName } from '@/utils/localStorageManager';
import type { PayloadAction } from '@reduxjs/toolkit'
import { getSystemMenusApi } from '@/api/systemMenu';


const initialState: UserInfoState = {
  token:localStorage.getItem('userToken') ??  null,
  userInfo:  getDataFromLocalStorageByName('userInfo'),
  expiredTime:null,
  menuList:  getDataFromLocalStorageByName('menuList')
}


export const fetchSystemMenuList = createAsyncThunk('user/getSystemMenu', async () => {
  const response = await getSystemMenusApi();
  return response.data
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
    },
    userLogout:(state)=>{
      state.token = null;
      state.userInfo = null,
      state.expiredTime = null,
      state.menuList = null,
      deleteLocalStorageData();
    },
    
    systemMenuUpdate: (state, action: PayloadAction<any>) => {
      state.menuList= action.payload
    },
  },
  extraReducers(builder) {
    builder
    // .addCase(fetchServerStatus.pending, (state) =>{
    //     state.httpStatus = HttpStatus.Loading 
    // })
    .addCase(fetchSystemMenuList.fulfilled, (state,action) =>{
       console.log("that is here....",state)
       console.log("that is here....",action)
       state.menuList = action.payload;
    })
    // .addCase(fetchServerStatus.rejected, (state, action) =>{
    //     state.httpStatus = HttpStatus.Failed,
    //     state.error = action.error
    // })
}

})

// Action creators are generated for each case reducer function
export const {  userLogin ,systemMenuUpdate,userLogout } = userInfoSlice.actions

export default userInfoSlice.reducer