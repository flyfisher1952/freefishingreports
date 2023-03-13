import { createSlice } from "@reduxjs/toolkit";

export const CurrentSearch = createSlice({
    name: "search",
    initialState: {
        country: null,
        state: null,
        water: null,
        spot: null,
    },
    reducers: {
        update: (currentSearch, newSearch) => {
            if (newSearch) {
                currentSearch.country = newSearch.country;
                currentSearch.state = newSearch.state;
                currentSearch.water = newSearch.water;
                currentSearch.spot = newSearch.spot;
            }
        },
        clear: (currentSearch) => {
            if (currentSearch) {
                currentSearch.country = null;
                currentSearch.state = null;
                currentSearch.water = null;
                currentSearch.spot = null;
            }
        },
    },
});

export const { update, clear } = CurrentSearch.actions;
export default CurrentSearch.reducer;
