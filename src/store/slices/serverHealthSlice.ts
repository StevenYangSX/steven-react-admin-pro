/*
An async thunk slice example for checking server status
*/


import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import { ServerHealthState,HttpStatus } from "@/types/systemStateTypes";
import { serverHealthCheckApi } from "@/api/apiTest";

const initialState:ServerHealthState = {
    serverRunning: false,
    httpStatus: HttpStatus.Idle,
    error:null
}

export const fetchServerStatus = createAsyncThunk('serverStatus/serverStatusCheck', async () => {
    const response = await serverHealthCheckApi();
    return response.data
  })



const serverHealthSlice = createSlice({
    name:"serverStatus",
    initialState,
    reducers:{
        
    },
    extraReducers(builder) {
        builder
        .addCase(fetchServerStatus.pending, (state) =>{
            state.httpStatus = HttpStatus.Loading 
        })
        .addCase(fetchServerStatus.fulfilled, (state) =>{
            state.httpStatus = HttpStatus.Success
            state.serverRunning = true;
        })
        .addCase(fetchServerStatus.rejected, (state, action) =>{
            state.httpStatus = HttpStatus.Failed,
            state.error = action.error
        })
    }
})

// export const {checkServerStatsu} = serverHealthSlice.actions;
export default serverHealthSlice.reducer;