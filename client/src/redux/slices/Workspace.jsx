import { createSlice } from "@reduxjs/toolkit";

const Workspace = createSlice({
    name: "workspace",
    initialState: "",
    reducers: {
        saveWorkspace: (state, action) => {
            return action.payload;
        },
        resetWorkspace: (state) => {
            return "";
        }
    },
})

export const { saveWorkspace, resetWorkspace } = Workspace.actions;
export default Workspace.reducer;