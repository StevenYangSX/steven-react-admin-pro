

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IconSelectionState } from "@/types/systemStateTypes";

const initialState:IconSelectionState = {
  iconName:""
}

const iconSelectionSlice = createSlice({
    name:"iconSelection",
    initialState,
    reducers:{
        selectIcon: (state ,action:PayloadAction<any>) =>{
            state.iconName = action.payload
          },    
    },
})

export const {selectIcon} = iconSelectionSlice.actions;
export default iconSelectionSlice.reducer;