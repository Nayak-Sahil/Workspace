import { createSlice } from "@reduxjs/toolkit";

const AdminProfile = createSlice({
    name: "AdminProfile",
    initialState: [],
    reducers: {
        setAdmin: (state, action) => {
            return action.payload;
        }
    },
})

export const { setAdmin } = AdminProfile.actions;
export default AdminProfile.reducer;