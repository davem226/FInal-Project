import axios from "axios";

export default {
    get: (topic) => {
        const base = "https://newsapi.org/v2/everything?",
            startDate = new Date().toISOString().split("T")[0],
            sortMethod = "publishedAt",
            apikey = "015517ca3219495abb53a616c4124e82";

        const url = `${base}q=${topic}&from=${startDate}&sortBy=${sortMethod}&apiKey=${apikey}`;
        return axios.get(url);
    },
    sentiment: ({ documents }) => {
        const url = "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment";
        const headers = {
            "Ocp-Apim-Subscription-Key": "9403072deb864d1591293a7e16df70d1"
        };
        return axios.post(url, { documents }, { headers: headers });
    }
}