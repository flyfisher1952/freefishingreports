import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "./components/user/userSlice";

export default configureStore(
    {
        reducer: {
            user: userReducer,
        },
    },
    applyMiddleware(thunk)
);
