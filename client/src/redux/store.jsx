import { configureStore } from '@reduxjs/toolkit';
import Mode from './slices/ModeSlice'
import MyProfile from './slices/MyProfile'
import Collaborate from './slices/Collaborate'
import AdminProfile from './slices/AdminProfile'

const store = configureStore({
    reducer:{
        Mode: Mode,
        Profile: MyProfile,
        AdminProfile: AdminProfile,
        Collaborate: Collaborate
    }
})

export default store;