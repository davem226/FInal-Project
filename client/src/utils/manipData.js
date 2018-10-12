import API from "./api";

export default class ManipData {
    getData = uid => {
        API.getArticles(uid)
            .then(res => {
                return this.processData(res.data);
            })
            .catch(err => console.log(err));
    };
    processData = data => {
        const processedData = [];
        const dummyCols = this.dummyCode(data, "source");
        for (let row of data) {
            const datum = {};
            datum.choice = row.choice === "yes" ? 1 : 0;
            for (let i in dummyCols) {
                datum[`source_${dummyCols[i]}`] = row.source === dummyCols[i] ? 1 : 0;
            }
            // console.log(datum);
            processedData.push(datum);
        }
        console.log(processedData);
        return processedData;
    };
    dummyCode = (data, columnToDummy) => {
        let dummyCols = [];
        for (let row of data) {
            if (!dummyCols.includes(row[columnToDummy])) {
                dummyCols = dummyCols.concat(row[columnToDummy]);
            }
        }
        return dummyCols;
    }
}