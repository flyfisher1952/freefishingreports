import { createSlice } from "@reduxjs/toolkit";

export const User = createSlice({
    name: "user",
    initialState: {
        username: null,
        email: null,
        country: null,
        postalCode: null,
        signedIn: false,
        lastSigninTimestamp: null,
    },
    reducers: {
        signin: (currentUser, newUser) => {
            if (newUser) {
                currentUser.username = newUser.username;
                currentUser.email = newUser.email;
                currentUser.country = newUser.country;
                currentUser.postalCode = newUser.postal_code;
                currentUser.signedIn = newUser.signedIn;
                currentUser.lastSigninTimestamp = newUser.lastSigninTimestamp;
            }
        },
        signout: (currentUser) => {
            currentUser.username = null;
            currentUser.email = null;
            currentUser.country = null;
            currentUser.postalCode = null;
            currentUser.signedIn = false;
            currentUser.lastSigninTimestamp = null;
        },
    },
});

export const { signin } = User.actions;
export default User.reducer;
