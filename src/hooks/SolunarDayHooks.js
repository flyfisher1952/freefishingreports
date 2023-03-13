import { useState, useEffect } from "react";

const UsefetchSolunarDay = (url) => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    async function fetchSolunarDay() {
        try {
            setIsLoading(true);

            const response = await fetch(url);

            setData(response.data);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchSolunarDay();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [data, isLoading];
};

export { UsefetchSolunarDay };
