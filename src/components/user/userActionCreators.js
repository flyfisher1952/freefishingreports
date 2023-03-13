import * as userActionTypes from "./userActionTypes";

export const signin = (user) => {
    return {
        type: userActionTypes.SIGNIN,
        user,
    };
};

export const signout = (user) => {
    return {
        type: userActionTypes.SIGNOUT,
        user,
    };
};
