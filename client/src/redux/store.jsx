import { configureStore } from '@reduxjs/toolkit';
import Mode from './slices/ModeSlice'

const store = configureStore({
    reducer:{
        Mode: Mode,
    }
})

export default store;