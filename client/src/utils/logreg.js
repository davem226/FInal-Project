import API from "./api";

export default class LogReg {
    // Get articles data from db
    getData = uid => {
        API.getArticles(uid)
            .then(res => {
                return this.processData(res.data);
            })
            .catch(err => console.log(err));
    };
    // Make data analyzable
    processData = data => {
        // Run sentiment analyses (Microsoft Azure)
        const sentimentTitle = this.sentimentAnalysis(data, "title");
        const sentimentPreview = this.sentimentAnalysis(data, "preview");

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
    sentimentAnalysis = (data, column) =>{
        const documents = data.map(row => {
            return { language: "en", id: row.id, text: row[column] };
        });
        API.sentiment({ documents })
            .then(data => {
                return data.map(row => {
                    return { id: row.id, score: row.score };
                });
            }).catch(err => console.log(err));
    };
    dummyCode = (data, columnToDummy) => {
        let dummyCols = [];
        // Create array of all categories in a categorical data column
        for (let row of data) {
            if (!dummyCols.includes(row[columnToDummy])) {
                dummyCols = dummyCols.concat(row[columnToDummy]);
            }
        }
        return dummyCols;
    }
}