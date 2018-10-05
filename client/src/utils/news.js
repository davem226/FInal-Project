import axios from "axios";

export default {
    get: (topic) => {
        const base = "https://newsapi.org/v2/everything?",
            startDate = new Date().toISOString().split("T")[0],
            sortMethod = "publishedAt",
            apikey = "015517ca3219495abb53a616c4124e82";

        const url = `${base}q=${topic}&from=${startDate}&sortBy=${sortMethod}&apiKey=${apikey}`;
        return axios.get(url);
    }
}