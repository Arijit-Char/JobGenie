import { configureStore } from "@reduxjs/toolkit";
import { Getuser, Login, Logout, Register, ResumeUpload } from "./reducers/user";

const store = configureStore({
    reducer: {
        register: Register,
        login: Login,
        logout: Logout,
        getuser: Getuser,
        resumeupload: ResumeUpload,
    },
});

export default store;