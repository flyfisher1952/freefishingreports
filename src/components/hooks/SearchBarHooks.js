/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const UseFetchCountries = (url) => {
    const [data, setData] = useState([]);

    async function fetchCountries() {
        const response = await fetch(url);
        const json = await response.json();

        setData(json);
    }

    useEffect(() => {
        fetchCountries();
    }, []);

    return data;
};

const UseFetchStates = (url) => {
    const [data, setData] = useState([]);

    async function fetchStates() {
        const response = await fetch(url);
        const json = await response.json();

        setData(json);
    }

    useEffect(() => {
        fetchStates();
    }, []);

    return data;
};

const UseFetchWaters = (url, state_id) => {
    const [data, setData] = useState([]);

    async function fetchWaters() {
        const response = await fetch(state_id ? url + "/" + state_id : url);
        const json = await response.json();

        setData(json);
    }

    useEffect(() => {
        fetchWaters();
    }, []);

    return data;
};

const UseFetchSpots = (url) => {
    const [data, setData] = useState([]);

    async function fetchSpots() {
        const response = await fetch(url);
        const json = await response.json();

        console.log("---> UseFetchSpots > fetchSpots: " + JSON.stringify(json));

        setData(json);
    }

    useEffect(() => {
        fetchSpots();
    }, []);

    return data;
};

export { UseFetchCountries, UseFetchStates, UseFetchWaters, UseFetchSpots };
