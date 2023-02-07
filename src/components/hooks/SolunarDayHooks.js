import { useState, useEffect } from "react";
import axios from "axios";
import * as cheerio from "cheerio";

const UsefetchSolunarDay = (url) => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    function padTo2Digits(num) {
        return num.toString().padStart(2, "0");
    }

    function formatDate(date) {
        let dateString = [padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate()), date.getFullYear().toString().substring(2)].join("/");

        return dateString;
    }

    // Async function which scrapes the data
    async function fetchSolunarDay() {
        try {
            setIsLoading(true);

            const today = formatDate(new Date());
            const { data } = await axios.get(url);

            console.log("---> got page: " + data);

            const $ = cheerio.load(data);
            const dayCell = $("div.panel h4:contains('" + today + "')");

            console.log("---> got DIV: " + dayCell);

            setData(dayCell.parent().parent());
            setIsLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        console.log("---> fetching Solunar Day page ");
        fetchSolunarDay();
        console.log("---> fetched Solunar Day page ");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [data, isLoading];
};

export { UsefetchSolunarDay };
