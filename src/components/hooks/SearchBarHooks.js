/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const UseFetchCountries = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchCountries() {
        const response = await fetch(url);
        const json = await response.json();

        setData(json);
        setLoading(false);
    }

    useEffect(() => {
        fetchCountries();
    }, []);

    return [data, loading];
};

const UseFetchStates = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchStates() {
        const response = await fetch(url);
        const json = await response.json();

        setData(json);
        setLoading(false);
    }

    useEffect(() => {
        fetchStates();
    }, []);

    return [data, loading];
};

const UseFetchWaters = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchWaters() {
        const response = await fetch(url);
        const json = await response.json();

        setData(json);
        setLoading(false);
    }

    useEffect(() => {
        fetchWaters();
    }, []);

    return [data, loading];
};

const UseFetchSpots = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchSpots() {
        const response = await fetch(url);
        const json = await response.json();

        setData(json);
        setLoading(false);
    }

    useEffect(() => {
        fetchSpots();
    }, []);

    return [data, loading];
};

export { UseFetchCountries, UseFetchStates, UseFetchWaters, UseFetchSpots };
