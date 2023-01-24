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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [data, loading];
};

export { UseFetchCountries, UseFetchStates, UseFetchWaters, UseFetchSpots };
