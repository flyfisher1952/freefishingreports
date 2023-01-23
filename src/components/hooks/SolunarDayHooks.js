import { useState, useEffect } from "react";
import $ from "jquery";

const UsefetchSolunarDay = (url) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchSolunarDay = () => {
        const data = $('#links').load(url);

        setData(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchSolunarDay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [data, loading];
};

export { UsefetchSolunarDay };
