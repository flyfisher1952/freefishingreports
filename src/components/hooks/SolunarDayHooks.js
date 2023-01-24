import { useState, useEffect } from "react";
// import $ from "jquery";

const UsefetchSolunarDay = (url) => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchSolunarDay = () => {
        // const data = $('#links').load(url);

        // setData(data);
        setData(<h5>Solunar Day TBD</h5>);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchSolunarDay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [data, isLoading];
};

export { UsefetchSolunarDay };
