import { createSlice } from "@reduxjs/toolkit";

const MyProfile = createSlice({
    name: 'myProfile',
    initialState: {},
    reducers: {
        setProfile: (state, action) => {
            return action.payload;
        },
        removeProfile: (state) => {
            return {};
        }
    }
});

export const {setProfile, removeProfile} = MyProfile.actions;
export default MyProfile.reducer;