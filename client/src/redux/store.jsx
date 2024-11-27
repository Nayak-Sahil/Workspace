import { configureStore } from '@reduxjs/toolkit';
import Mode from './slices/ModeSlice'
import MyProfile from './slices/MyProfile'
import Collaborate from './slices/Collaborate'
import AdminProfile from './slices/AdminProfile'
import Workspace from './slices/Workspace'

const store = configureStore({
    reducer:{
        Mode: Mode,
        Profile: MyProfile,
        AdminProfile: AdminProfile,
        Collaborate: Collaborate,
        Workspace: Workspace
    }
})

export default store;