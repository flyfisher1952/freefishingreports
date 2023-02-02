/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export function fetchCountries(url) {
    return new Promise((resolve) => {
        async function fetchCountries() {
            const response = await fetch(url);
            const json = await response.json();

            resolve(json);
        }

        useEffect(() => {
            fetchCountries();
        }, []);
    });
}
