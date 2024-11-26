import { createSlice } from "@reduxjs/toolkit";

const Collaborate = createSlice({
    name: "Collaborate",
    initialState: [],
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        },
        removeUser: (state, action) => {
            return state.filter((collaborator) => collaborator.id !== action.payload.id);
        },
        updateUser: (state, action) => {
            return state.map((collaborator) => {
                if (collaborator.id === action.payload.id) {
                    return {
                        ...collaborator,
                        ...action.payload,
                    };
                }
                return collaborator;
            });
        }
    },
});

export const { addUser, removeUser, updateUser } = Collaborate.actions;
export default Collaborate.reducer;