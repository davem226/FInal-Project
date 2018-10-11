import API from "./api";

export default {
    getArticles: uid => {
        API.getArticles(uid)
            .then(res => processData(res))
            .catch(err => console.log(err));
    },
    processData: data => {
        const dummyCols = [];
        for (let row of data) {
            if (!dummyCols.includes(row.source)) {
                dummyCols = dummyCols.concat(row.source);
            }
        }

        return processedData;
    },
    dummyCode: (data, [columnToDummy]) => {
        for (let category of array) {

        }
    }
}