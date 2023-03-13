import { useState, useEffect } from "react";

const UseFetchBlogs = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchBlogs() {
        const response = await fetch(url);
        const json = await response.json();

        setData(json);
        setLoading(false);
    }

    useEffect(() => {
        fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [data, loading];
};

export { UseFetchBlogs };
