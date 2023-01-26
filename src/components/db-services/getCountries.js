/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export function getCountries(url) {
    return new Promise((resolve) => {
        async function fetchCountries() {
            const response = await fetch(url);
            const json = await response.json();

            console.log();
            console.log("---> fetched %d countries", json.length);
            resolve(json);
        }

        useEffect(() => {
            fetchCountries();
        }, []);
    });
}
