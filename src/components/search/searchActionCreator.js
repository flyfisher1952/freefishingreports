import * as seachActionTypes from "./searchActionTypes";

export const clear = (search) => {
    return {
        type: seachActionTypes.CLEAR,
        search,
    };
};

export const update = (search) => {
    return {
        type: seachActionTypes.UPDATE,
        search,
    };
};
