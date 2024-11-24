import { createSlice } from "@reduxjs/toolkit";


const ModeSlice = createSlice({
    name: 'mode',
    initialState: {
        mode: 'Editor',
        isEditable: true,
    },
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
            if(action.payload === `Editor` || action.payload === `Admin`){
                state.isEditable = true;
            }else{
                state.isEditable = false;
            }
        }
    }
})

export const {setMode} = ModeSlice.actions;

export default ModeSlice.reducer;